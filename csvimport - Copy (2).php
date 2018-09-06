<?php
/*
	Plugin Name: CSVデータ管理 plugin
	Description: Generate posts from CSV file
	Author: 
	Version: 0.1
*/

// Make sure we don't expose any info if called directly
if ( !function_exists( 'add_action' ) ) {
	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
	exit;
}

// add action to admin menu
add_action('admin_menu', 'csv_import_plugin_setup_menu');

// plugin setup menu
function csv_import_plugin_setup_menu(){
	// Call csv_import_process function when $_POST data exist and form action is post-csvimport-save
	// otherwise call csv_import_init instead
	$action_lst = array('post-csvimport-product', 'post-csvexport-product');
	if ( isset($_POST['action']) && in_array($_POST['action'], $action_lst) ){
		// switch action
		switch ($_POST['action']){
			case 'post-csvimport-product':
				add_menu_page( 'CSVデータ管理 page', 'CSVデータ管理', 'manage_options', 'csv-import', 'csv_import_process' );
				break;
			case 'post-csvexport-product':
				export_product();
				break;
			default:
				break;
		}
		
	}else{
		add_menu_page( 'CSVデータ管理 page', 'CSVデータ管理', 'manage_options', 'csv-import', 'csv_import_init' );
	}
}
 
// Render CSVデータ管理 form
function csv_import_init(){
	 
?>
	<div class="csv-import-product-box">
		<h2 class="title"><?php _e('投稿データCSV管理') ?></h2>
		<form name="post" action="" method="post" enctype="multipart/form-data" id="csv-product-import" class="initial-form hide-if-no-js">
			<label><b>CSVファイル: </b><input type="file" name="csv-import-file" /></label>
			<p class="submit">
				<input type="hidden" name="action" id="csvimport-product-action" value="post-csvimport-product" />
				<input type="hidden" name="post_type" value="post" />
				<?php wp_nonce_field( 'import-post' ); ?>
				<?php submit_button( __( 'インポート' ), 'primary', 'save', false, array( 'id' => 'import-product' , 'onclick' => 'return confirm("処理を実行していいですか？");') ); ?>
				<br class="clear" />
			</p>
	
		</form>
	</div>
	<hr/>
	<div class="csv-export-product-box">
		<form name="post" action="" method="post" enctype="multipart/form-data" id="csv-product-export" class="initial-form hide-if-no-js">
			<p class="submit">
				<input type="hidden" name="action" id="csvexport-product-action" value="post-csvexport-product" />
				<input type="hidden" name="post_type" value="post" />
				<?php wp_nonce_field( 'export-post' ); ?>
				<?php submit_button( __( 'エクスポート' ), 'primary large', 'save', false, array( 'id' => 'export-product', 'onclick' => 'return confirm("処理を実行していいですか？");' ) ); ?>
				<br class="clear" />
			</p>
		</form>
	</div>
	
<?php
}


/**
 * Process CSVデータ管理ing
 * @throws ErrorException
 */
function csv_import_process(){
	$action = $_POST['action'];
	$csv_error_msg = '';
	$img_error_msg = '';
?>
	<div class="csv-import-box">
		<h3 class="title"><?php _e('CSVインポート') ?></h3>
		<!-- <p><?php _e('Importing, please wait!') ?></p> -->
<?php
		// Check current user has edit_posts permission or not
		if ( ! current_user_can( 'edit_posts' ) ) {
			echo "<p>{_e('Permission denied.')}</p>";
		}
		
		// Validation input file before import
		$csv_valid = file_validation('CSV file', 'csv-import-file','csv', $csv_error_msg);
		// Read file validation
		if ($csv_valid){
			// Read file and parse csv data to array
			$read = csv_to_array ('', $_FILES['csv-import-file']['tmp_name'], $objPost, true, true);
			// Could not open the file
			if ( !$read ) {
				$csv_valid = false;
				$csv_error_msg = 'CSV file can not be read.';
			}
		}
		// show csv file error message
		if ( !empty($csv_error_msg) ){
			?><div class="error"><?php _e($csv_error_msg) ?></div><?php 
		}
		// show image zip file error message
		if ( !empty($img_error_msg) ){
			?><div class="error"><?php _e($img_error_msg) ?></div><?php
		}
		
		if ( $csv_valid ){
			// switch action
			switch ($action){
				case 'post-csvimport-product':
					import_product($objPost);
					break;
				default:
					break;
			}// end switch
		}
?>
		<p><?php _e('処理完了') ?></p>
		<a class="button button-primary" href="<?php menu_page_url('csv-import'); ?>"><?php _e( 'Back' ); ?></a>
	</div>

<?php
}

/**
 * Import product
 * @param array $objPost
 * @param string $zip_file
 * @return boolean
 */
function import_product($objPost = NULL){
	// check valid file param
	if ( empty($objPost) ){
	?><p><?php _e('Invalid CSV file input. Please try again.') ?></p><?php
		return false;
	}
	// clear temp folder before extract
	$files = glob(plugin_dir_path( __FILE__ ).'tmp/image/*'); // get all file names
	foreach($files as $file){ // iterate files
		if(is_file($file))
			unlink($file); // delete file
	}
	// extract zip file
	$img_dir = plugin_dir_path( __FILE__ ).'tmp/image/';
	$zip = new ZipArchive;

	// _e('Filename: '.$_FILES['csv-import-file']['name']);
	
	try{
		// =====================
		// Import START
		// =====================
		// Set excution time to unlimit
		set_time_limit(0);
		// Set language
		mb_language("japanese");
		// Set file encoding
		mb_internal_encoding("SJIS-win");
		// get default comment and ping status
		$comment_status = get_option( 'default_comment_status' );
		$ping_status = get_option( 'default_ping_status' );
		
		// row count
		$row_cnt = 0;
		// imported row count
		$imp_cnt = 0;
		// fail imported row count
		$fail_cnt = 0;
		// first row
		$first = true;
		// line in csv
		$line_cnt = 1;

		//  Read CSV file by row
		foreach ($objPost as $row){
			try{

				// pass header row
				if ($first){
					$first = false;
					continue;
				}
				
				// count reading row
				$row_cnt++;
				$line_cnt++;

				$prod_id = isset($row[0]) ? esc_html(trim($row[0])) : '';
				$prod_title = esc_html(trim($row[1]));
				$prod_category = esc_html(trim($row[2]));
				$prod_area = isset($row[3]) ? esc_html(trim($row[3])) : '';
				$prod_jobtype = isset($row[4]) ? esc_html(trim($row[4])) : '';
				$prod_kind = esc_html(trim($row[5]));
				$prod_jobstatus = isset($row[6]) ? esc_html(trim($row[6])) : '';
				$prod_opening = esc_html(trim($row[7]));
				$prod_copy = isset($row[8]) ? esc_html(trim($row[8])) : '';
				$prod_address = isset($row[9]) ? esc_html(trim($row[9])) : '';
				$prod_access = isset($row[10]) ? esc_html(trim($row[10])) : '';
				$prod_capacity = isset($row[11]) ? esc_html(trim($row[11])) : '';
				$prod_day = isset($row[12]) ? esc_html(trim($row[12])) : '';
				$prod_time = isset($row[13]) ? esc_html(trim($row[13])) : '';
				$prod_extime = isset($row[14]) ? esc_html(trim($row[14])) : '';
				$prod_tel = isset($row[15]) ? esc_html(trim($row[15])) : '';
				$prod_map = isset($row[16]) ? esc_url(trim($row[16])) : '';

				$prod_Job1 = esc_html(trim($row[17]));
				$prod_Job1_terms = isset($row[18]) ? esc_html(trim($row[18])) : '';
				$prod_Job1_salary = isset($row[19]) ? esc_html(trim($row[19])) : '';
				$prod_Job1_welfare = isset($row[20]) ? esc_html(trim($row[20])) : '';

				$prod_Job2 = esc_html(trim($row[21]));
				$prod_Job2_terms = isset($row[22]) ? esc_html(trim($row[22])) : '';
				$prod_Job2_salary = isset($row[23]) ? esc_html(trim($row[23])) : '';
				$prod_Job2_welfare = isset($row[24]) ? esc_html(trim($row[24])) : '';

				$prod_Job3 = esc_html(trim($row[25]));
				$prod_Job3_terms = isset($row[26]) ? esc_html(trim($row[26])) : '';
				$prod_Job3_salary = isset($row[27]) ? esc_html(trim($row[27])) : '';
				$prod_Job3_welfare = isset($row[28]) ? esc_html(trim($row[28])) : '';

				$prod_Job4 = esc_html(trim($row[29]));
				$prod_Job4_terms = isset($row[30]) ? esc_html(trim($row[30])) : '';
				$prod_Job4_salary = isset($row[31]) ? esc_html(trim($row[31])) : '';
				$prod_Job4_welfare = isset($row[32]) ? esc_html(trim($row[32])) : '';

				$prod_Job5 = esc_html(trim($row[33]));
				$prod_Job5_terms = isset($row[34]) ? esc_html(trim($row[34])) : '';
				$prod_Job5_salary = isset($row[35]) ? esc_html(trim($row[35])) : '';
				$prod_Job5_welfare = isset($row[36]) ? esc_html(trim($row[36])) : '';

				$prod_Job6 = esc_html(trim($row[37]));
				$prod_Job6_terms = isset($row[38]) ? esc_html(trim($row[38])) : '';
				$prod_Job6_salary = isset($row[39]) ? esc_html(trim($row[39])) : '';
				$prod_Job6_welfare = isset($row[40]) ? esc_html(trim($row[40])) : '';

				// $prod_img_slider01 = isset($row[41]) ? trim($row[41]) : '';
				// $prod_img_slider02 = isset($row[42]) ? trim($row[42]) : '';
				// $prod_img_slider03 = isset($row[43]) ? trim($row[43]) : '';
				// $prod_img_slider04 = isset($row[44]) ? trim($row[44]) : '';
				// $prod_img_slider05 = isset($row[45]) ? trim($row[45]) : '';

				$display_flag = isset($row[46]) ? esc_html(trim($row[46])) : '';
				$display_password = isset($row[47]) ? esc_html(trim($row[47])) : '';
				$display_date = isset($row[48]) ? esc_html(trim($row[48])) : '';


				$checkResultAll = '';

				/* Check fields TRUE/FALSE */
				$fieldTF_ar = array();
				$fieldTF_ar["オープニング"] = $prod_opening;
				$fieldTF_ar["【保育士】の情報表示"] = $prod_Job1;
				$fieldTF_ar["【保育スタッフ】の情報表示"] = $prod_Job2;
				$fieldTF_ar["【看護師】の情報表示"] = $prod_Job3;
				$fieldTF_ar["【栄養士】の情報表示"] = $prod_Job4;
				$fieldTF_ar["【調理スタッフ】の情報表示"] = $prod_Job5;
				$fieldTF_ar["【保育園事務】の情報表示"] = $prod_Job6;

				$checkTF_ar = array('0','1');
				$firstTF = true;
				foreach ($fieldTF_ar as $key => $value) {
					if($firstTF == true){ $signTF = ''; }else{ $signTF = '、'; }
				  if (in_array($value, $checkTF_ar)) {
				    //nothing
					}else{
						$checkResultAll .= $signTF.$key;
						$firstTF = false;
					}
				}

				if($checkResultAll != ''){ $commaFields = '、'; }else{ $commaFields = ''; }

				/* Check JobType exists */
				$checkJobType_ar = array('保育士', '保育スタッフ', '看護師', '栄養士', '調理スタッフ', '保育園事務');
				if(!empty($prod_jobtype)){
					$checkJobType_exp = explode(",", $prod_jobtype);
					$resultJobType = '';
					$firstJobType = true;
					for($i=0; $i<sizeof($checkJobType_exp); $i++){
						if($firstJobType == true){ $signJobType = ''; }else{ $signJobType = '、'; }
					  if (in_array($checkJobType_exp[$i], $checkJobType_ar)) {
					    //nothing
						}else{
							$resultJobType .= $signJobType.$checkJobType_exp[$i];
							$firstJobType = false;
						}
					}
				}
				if($resultJobType != ''){
					$checkResultAll .= $commaFields.'募集職種';
				}

				/* Check Kind exists */
				$checkKind_ar = array('認可', '認証', '公設民営', '事業所内', '小規模保育', '学童・児童館', 'その他');
				$resultKind = '';
				if (in_array($prod_kind, $checkKind_ar)) {
			    //nothing
				}else{
					$resultKind = $prod_kind;
				}
				if($resultKind != ''){
					$checkResultAll .= $commaFields.'分類';
				}

				/* Check JobStatus exists */
				$checkJobStatus_ar = array('正社員', '契約社員', 'パート・アルバイト');
				if(!empty($prod_jobstatus)){
					$checkJobStatus_exp = explode(",", $prod_jobstatus);
					$resultJobStatus = '';
					$firstJobStatus = true;
					for($i=0; $i<sizeof($checkJobStatus_exp); $i++){
						if($firstJobStatus == true){ $signJobStatus = ''; }else{ $signJobStatus = '、'; }
					  if (in_array($checkJobStatus_exp[$i], $checkJobStatus_ar)) {
					    //nothing
						}else{
							$resultJobStatus .= $signJobStatus.$checkJobStatus_exp[$i];
							$firstJobStatus = false;
						}
					}
				}
				if($resultJobStatus != ''){
					$checkResultAll .= $commaFields.'雇用形態';
				}



				$checkStatusField_ar = array('0','1','2','3');
				if (in_array($display_flag, $checkStatusField_ar)) {
			    //nothing
				}else{
					$checkResultAll .= $commaFields.'Status';					
				}

				$checkCategories_ar = array('採用情報','23区北部（豊島区、北区、板橋区）','23区南部（品川区、目黒区、大田区、世田谷区）','23区東部（台東区、墨田区、江東区、荒川区、足立区、葛飾区、江戸川区）','23区西部（中野区、杉並区、練馬区）','その他都道府県','名古屋地区','東京市部','都心部（千代田区、中央区、港区、新宿区、文京区、渋谷区）','関西地区','首都圏その他');
				if (in_array($prod_category, $checkCategories_ar)) {
			    //nothing
				}else{
					$checkResultAll .= $commaFields.'Category';
				}

				/* Check Fields error for each row */
				if($checkResultAll != ''){
					$fail_cnt++;
					echo "<p>"._e("Line $line_cnt: Failed - Error fields: $checkResultAll")."</p>";
					continue;
				}

				/* Start Insert Post */
				$prod_jobtype_ar = get_field_key_acf('JobType', 1);
				// $prod_jobtype_ar = array('保育士' => 'job1', '保育スタッフ' => 'job2', '看護師' => 'job3', '栄養士' => 'job4', '調理スタッフ' => 'job5', '保育園事務' => 'job6');
				$prod_jobtype_str = '';
				if(!empty($prod_jobtype)){
					$prod_jobtype_str = array();
					$prod_jobtype_exp = explode(",", $prod_jobtype);
					for($i=0; $i<sizeof($prod_jobtype_exp); $i++){
						// array_push($prod_jobtype_str,$prod_jobtype_ar[$prod_jobtype_exp[$i]]);
						foreach($prod_jobtype_ar as $key => $value){
							if($value == $prod_jobtype_exp[$i]){
								array_push($prod_jobtype_str,$key);
							}
						}
					}
				}

				// $prod_kind_ar = array('認可' => 'kind01', '認証' => 'kind02', '公設民営' => 'kind03', '事業所内' => 'kind04', '小規模保育' => 'kind05', '学童・児童館' => 'kind06', 'その他' => 'kind10');
				// $prod_kind_str = $prod_kind_ar[$prod_kind];
				$prod_kind_ar = get_field_key_acf('Kind', 1);
				foreach($prod_kind_ar as $key => $value){
					if($value == $prod_kind){
						$prod_kind_str = $key;
					}
				}


				// $prod_jobstatus_ar = array('正社員' => 'status1', '契約社員' => 'status2', 'パート・アルバイト' => 'status3');
				$prod_jobstatus_ar = get_field_key_acf('JobStatus', 1);
				$prod_jobstatus_str = '';
				if(!empty($prod_jobstatus)){
					$prod_jobstatus_str = array();
					$prod_jobstatus_exp = explode(",", $prod_jobstatus);
					for($i=0; $i<sizeof($prod_jobstatus_exp); $i++){
						// array_push($prod_jobstatus_str,$prod_jobstatus_ar[$prod_jobstatus_exp[$i]]);
						foreach($prod_jobstatus_ar as $key => $value){
							if($value == $prod_jobstatus_exp[$i]){
								array_push($prod_jobstatus_str,$key);
							}
						}
					}
				}

				// set default post_status
				$post_status = 'draft';
				if ( $display_flag == '1'){
					$post_status = 'publish';
				}else{
					if ( $display_flag == '2'){
						$post_status = 'pending';
					}else{
						$post_status = 'private';
					}
				}

				$area_key = get_field_key_acf('Area', 0);
				$jobtype_key = get_field_key_acf('JobType', 0);
				$kind_key = get_field_key_acf('Kind', 0);
				$jobstatus_key = get_field_key_acf('JobStatus', 0);
				$opening_key = get_field_key_acf('Opening', 0);
				$copy_key = get_field_key_acf('Copy', 0);
				$address_key = get_field_key_acf('Address', 0);
				$access_key = get_field_key_acf('Access', 0);
				$capacity_key = get_field_key_acf('Capacity', 0);
				$day_key = get_field_key_acf('Day', 0);
				$time_key = get_field_key_acf('Time', 0);
				$extime_key = get_field_key_acf('ExTime', 0);
				$tel_key = get_field_key_acf('Tel', 0);
				$map_key = get_field_key_acf('Map', 0);
				$prod_Job1_key = get_field_key_acf_adv('Job1');
				$prod_Job2_key = get_field_key_acf_adv('Job2');
				$prod_Job3_key = get_field_key_acf_adv('Job3');
				$prod_Job4_key = get_field_key_acf_adv('Job4');
				$prod_Job5_key = get_field_key_acf_adv('Job5');
				$prod_Job6_key = get_field_key_acf_adv('Job6');

				$notify_str = '';
				$display_date_fm = date("Y-m-d H:i:s", strtotime($display_date));

				if(!empty($prod_id)){
					
					// update post
					$post = array(
						'ID' => (int)$prod_id,
						'post_title' => $prod_title,
						'post_status' => $post_status,
						'post_type' => 'post',
						'post_password' => $display_password,
						'post_date' => $display_date_fm
					);
					$post_id = wp_update_post( $post, true );

					if (is_wp_error($post_id)) {
						echo '<p>Line '.$line_cnt.': Update Failed - Error: '.$post_id->get_error_message().'</p>';
						continue;
					}

					$notify_str = "<p>"._e("Line $line_cnt: Update Success!!")."</p>";

				}else{
					
					// insert post
					$post = array(
						'post_title' => $prod_title,
						'post_status' => $post_status,
						'post_type' => 'post',
						'post_password' => $display_password,
						'post_date' => $display_date_fm
					);
					$post_id = wp_insert_post( $post, true );

					if (is_wp_error($post_id)) {
						echo '<p>Line '.$line_cnt.': Insert Failed - Error: '.$post_id->get_error_message().'</p>';
						continue;
					}

					$notify_str = "<p>"._e("Line $line_cnt: Success, post_id: $post_id")."</p>";
				}

				// add post meta
				// update_post_meta($post_id, 'Area', $prod_area); // 地域
				update_field( $area_key, $prod_area, $post_id );
				// update_post_meta($post_id, 'JobType', $prod_jobtype_str); // 募集職種
				update_field( $jobtype_key, $prod_jobtype_str, $post_id );
				// update_post_meta($post_id, 'Kind', $prod_kind_str); // 分類
				update_field( $kind_key, $prod_kind_str, $post_id );
				// update_post_meta($post_id, 'JobStatus', $prod_jobstatus_str); // 雇用形態
				update_field( $jobstatus_key, $prod_jobstatus_str, $post_id );
				// update_post_meta($post_id, 'Opening', $prod_opening); // オープニング
				update_field( $opening_key, $prod_opening, $post_id );
				// update_post_meta($post_id, 'Copy', $prod_copy); // 施設キャッチコピー
				update_field( $copy_key, $prod_copy, $post_id );
				// update_post_meta($post_id, 'Address', $prod_address); // 住所
				update_field( $address_key, $prod_address, $post_id );
				// update_post_meta($post_id, 'Access', $prod_access); // アクセス
				update_field( $access_key, $prod_access, $post_id );
				// update_post_meta($post_id, 'Capacity', $prod_capacity); // 定員
				update_field( $capacity_key, $prod_capacity, $post_id );
				// update_post_meta($post_id, 'Day', $prod_day); // 開園日
				update_field( $day_key, $prod_day, $post_id );
				// update_post_meta($post_id, 'Time', $prod_time); // 基本時間
				update_field( $time_key, $prod_time, $post_id );
				// update_post_meta($post_id, 'ExTime', $prod_extime); // 延長時間
				update_field( $extime_key, $prod_extime, $post_id );
				// update_post_meta($post_id, 'Tel', $prod_tel); // 電話番号
				update_field( $tel_key, $prod_tel, $post_id );
				// update_post_meta($post_id, 'Map', $prod_map); // 地図URL
				update_field( $map_key, $prod_map, $post_id );
				
				update_field( $prod_Job1_key, (int)$prod_Job1, $post_id );
				update_field( $prod_Job2_key, (int)$prod_Job2, $post_id );
				update_field( $prod_Job3_key, (int)$prod_Job3, $post_id );
				update_field( $prod_Job4_key, (int)$prod_Job4, $post_id );
				update_field( $prod_Job5_key, (int)$prod_Job5, $post_id );
				update_field( $prod_Job6_key, (int)$prod_Job6, $post_id );
                                
				// add Job post meta
				for($i=1; $i<=6; $i++){
					// update_post_meta($post_id, 'Job'.$i, output_str_null(${'prod_Job'.$i}));
					// update_field( 'Job'.$i, (int)${'prod_Job'.$i}, $post_id );
					// update_post_meta($post_id, 'Job'.$i.'_terms', output_str_null(${'prod_Job'.$i.'_terms'}));
					${'prod_Job'.$i.'_terms_key'} = get_field_key_acf('Job'.$i.'_terms', 0);
					update_field( ${'prod_Job'.$i.'_terms_key'}, ${'prod_Job'.$i.'_terms'}, $post_id );
					// update_post_meta($post_id, 'Job'.$i.'_salary', output_str_null(${'prod_Job'.$i.'_salary'}));
					${'prod_Job'.$i.'_salary_key'} = get_field_key_acf('Job'.$i.'_salary', 0);
					update_field( ${'prod_Job'.$i.'_salary_key'}, ${'prod_Job'.$i.'_salary'}, $post_id );
					// update_post_meta($post_id, 'Job'.$i.'_welfare', output_str_null(${'prod_Job'.$i.'_welfare'}));
					${'prod_Job'.$i.'_welfare_key'} = get_field_key_acf('Job'.$i.'_welfare', 0);
					update_field( ${'prod_Job'.$i.'_welfare_key'}, ${'prod_Job'.$i.'_welfare'}, $post_id );					
				}

				// search for category by name
				$wp_category = term_exists( $prod_category, 'category' );
				if (!$wp_category) {
					// insert new category
					$wp_category = wp_insert_term( $prod_category, 'category', array( 'description'=> ''));
				}

				// set term relationship
				wp_set_object_terms( $post_id, (int)$wp_category['term_id'], 'category' );

				echo $notify_str;
				
			}catch (Exception $e){
				
				$fail_cnt++;
				echo '<div class="error">'._e("Line $line_cnt: Failed")."</div>";
				continue;
			}
		 }
		 // =====================
		 // Import END ==========
		 // =====================
		
	}catch (Exception $e){
		?><div class="error"><?php _e($e->getMessage()) ?></div><?php 
	}
	?></div><?php 
	// clear temp folder after import
	$files = glob(plugin_dir_path( __FILE__ ).'tmp/image/*'); // get all file names
	foreach($files as $file){ // iterate files
		if(is_file($file))
			unlink($file); // delete file
	}
}// end import_product function

// get field key of a field name
function get_field_key_acf_adv($field_name) {
    global $wpdb;
    $length = strlen($field_name);
    $sql = "
    SELECT `meta_key`
    FROM {$wpdb->postmeta}
    WHERE `meta_key` LIKE 'field_%' AND `meta_value` LIKE '%\"name\";s:$length:\"$field_name\";%';
    ";
    return $wpdb->get_var($sql);
}

function get_field_key_acf($field_name, $key_get) {
	
  global $wpdb;
  $values_array = $wpdb->get_results( $wpdb->prepare("SELECT meta_value FROM $wpdb->postmeta WHERE meta_key LIKE '%s'", 'field_%') );

  foreach ( $values_array as $value ) {
    if (strpos($value->meta_value, $field_name) !== false) {
      $obj_value = unserialize($value->meta_value);
      if($key_get == 0){
        $output = $obj_value['key'];
      }else{
        $output = $obj_value['choices'];
      }
    }
  }

  return $output;
}

function output_str_null($str){
	return empty($str) ? '0' : $str;
}

/**
 * Export product
 */
function export_product(){
	try{
		ini_set('max_execution_time', 0);

		// set CSV header
		$title = array(
				csv_charset("ID"),
				csv_charset("Title"),
				csv_charset("Category"),
				csv_charset("地域"),
				csv_charset("募集職種"),
				csv_charset("分類"),
				csv_charset("雇用形態"),
				csv_charset("オープニング"),
				csv_charset("施設キャッチコピー"),
				csv_charset("住所"),
				csv_charset("アクセス"),
				csv_charset("定員"),
				csv_charset("開園日"),
				csv_charset("基本時間"),
				csv_charset("延長時間"),
				csv_charset("電話番号"),
				csv_charset("地図URL"),
				csv_charset("【保育士】の情報表示"),
				csv_charset("【保育士】募集条件"),
				csv_charset("【保育士】給与"),
				csv_charset("【保育士】福利厚生"),
				csv_charset("【保育スタッフ】の情報表示"),
				csv_charset("【保育スタッフ】募集条件"),
				csv_charset("【保育スタッフ】給与"),
				csv_charset("【保育スタッフ】福利厚生"),
				csv_charset("【看護師】の情報表示"),
				csv_charset("【看護師】募集条件"),
				csv_charset("【看護師】給与"),
				csv_charset("【看護師】福利厚生"),
				csv_charset("【栄養士】の情報表示"),
				csv_charset("【栄養士】募集条件"),
				csv_charset("【栄養士】給与"),
				csv_charset("【栄養士】福利厚生"),
				csv_charset("【調理スタッフ】の情報表示"),
				csv_charset("【調理スタッフ】募集条件"),
				csv_charset("【調理スタッフ】給与"),
				csv_charset("【調理スタッフ】福利厚生"),
				csv_charset("【保育園事務】の情報表示"),
				csv_charset("【保育園事務】募集条件"),
				csv_charset("【保育園事務】給与"),
				csv_charset("【保育園事務】福利厚生"),
				csv_charset("施設画像1"),
				csv_charset("施設画像2"),
				csv_charset("施設画像3"),
				csv_charset("施設画像4"),
				csv_charset("施設画像5"),
				csv_charset("Status"),
				csv_charset("Post Password"),
				csv_charset("Publish Date")
		);

		// prepare buffer
		$buffer = fopen('php://temp/maxmemory:'. (5*1024*1024), 'r+');
		// add header to buffer
		fputcsv($buffer, $title, ',', '"');

		// prepare argument
		$args = array(
				'posts_per_page'   => -1,
				'offset'           => 0,
				'orderby'          => 'date',
				'order'            => 'DESC',
				'post_type'        => 'post',
				'post_status' => array('publish', 'pending', 'draft', 'private')
		);
		$posts_array = get_posts( $args );
		$no = 1;
		foreach ($posts_array as $post){
			$ojb = array();
			// get product id
			$prod_id = $post->ID;

			// get post meta
			$meta = get_post_meta( $prod_id );

			// set No column
			$ojb['prod_id'] = csv_charset($prod_id);

			// set Title post
			$ojb['prod_title'] = csv_charset($post->post_title);

			// set Category post
			$category = wp_get_object_terms( $prod_id, 'category' );
			$ojb['prod_category'] = isset($category[0]->name) ? csv_charset($category[0]->name) : '';

			// set 地域 post
			$ojb['prod_area'] = check_isset_meta($meta,'Area');

			// set 募集職種 post
			$prod_jobtype_ar = array('保育士','保育スタッフ', '看護師', '栄養士', '調理スタッフ', '保育園事務');
			// $field_key = get_field_key_acf('JobType', 1);
			$prod_jobtype = check_isset_meta($meta,'JobType');
			$ojb['prod_job_type'] = ''; $prod_jobtype_fn = ''; $first = true;
			if(!empty($prod_jobtype)){
				for($i=1; $i<=sizeof($prod_jobtype_ar); $i++){
					if (strpos($prod_jobtype, 'job'.$i) !== false) {
						if($first !== true){ $pjt_com = ','; }else{ $pjt_com = ''; }
				    $prod_jobtype_fn .= csv_charset($pjt_com.$prod_jobtype_ar[$i-1]);
				    $first = false;
					}
				}
				$ojb['prod_job_type'] = $prod_jobtype_fn;
			}

			// set 分類 post
			$prod_kind_ar = array('kind01' => '認可','kind02' => '認証', 'kind03' => '公設民営', 'kind04' => '事業所内', 'kind05' => '小規模保育', 'kind06' => '学童・児童館', 'kind10' => 'その他');
			$prod_kind = $meta['Kind'][0];
			$ojb['prod_kind'] = csv_charset($prod_kind_ar[$prod_kind]);

			// set 雇用形態 post
			$prod_jobstatus_ar = array('正社員','契約社員', 'パート・アルバイト');
			$prod_jobstatus = check_isset_meta($meta,'JobStatus');
			$ojb['prod_job_status'] = ''; $prod_jobstatus_fn = ''; $first = true;
			if(!empty($prod_jobstatus)){
				for($i=1; $i<=sizeof($prod_jobstatus_ar); $i++){
					if (strpos($prod_jobstatus, 'status'.$i) !== false) {
						if($first !== true){ $pjs_com = ','; }else{ $pjs_com = ''; }
				    $prod_jobstatus_fn .= csv_charset($pjs_com.$prod_jobstatus_ar[$i-1]);
				    $first = false;
					}
				}
				$ojb['prod_job_status'] = $prod_jobstatus_fn;
			}

			// set オープニング post
			$ojb['prod_opening'] = isset($meta['Opening'][0]) || $meta['Opening'][0] != '' ? csv_charset($meta['Opening'][0]) : csv_charset('0'); //check_isset_meta($meta,'Opening');

			// set 施設キャッチコピー post
			$ojb['prod_copy'] = check_isset_meta($meta,'Copy');

			// set 住所 post
			$ojb['prod_address'] = check_isset_meta($meta,'Address');

			// set アクセス post
			$ojb['prod_access'] = check_isset_meta($meta,'Access');

			// set 定員 post
			$ojb['prod_capacity'] = check_isset_meta($meta,'Capacity');

			// set 開園日 post
			$ojb['prod_day'] = check_isset_meta($meta,'Day');

			// set 基本時間 post
			$ojb['prod_time'] = check_isset_meta($meta,'Time');

			// set 延長時間 post
			$ojb['prod_ex_time'] = check_isset_meta($meta,'ExTime');

			// set 電話番号 post
			$ojb['prod_tel'] = check_isset_meta($meta,'Tel');

			// set 地図URL post
			$ojb['prod_map'] = check_isset_meta($meta,'Map');

			// set Job, Job_terms, Job_salary, Job_welfare (1,2,3,4) post
			for($i=1; $i<=6; $i++){
				$ojb['prod_job'.$i] = isset($meta['Job'.$i][0]) || $meta['Job'.$i][0] != '' ? csv_charset($meta['Job'.$i][0]) : csv_charset('0');
				$ojb['prod_job'.$i.'_terms'] = check_isset_meta($meta,'Job'.$i.'_terms');
				$ojb['prod_job'.$i.'_salary'] = check_isset_meta($meta,'Job'.$i.'_salary');
				$ojb['prod_job'.$i.'_welfare'] = check_isset_meta($meta,'Job'.$i.'_welfare');
			}

			// set 施設画像1,2,3,4,5 post
			for($i=1; $i<=5; $i++){
				$ojb['prod_img_slider0'.$i] = '';
				$img_path = '';
				$img_slider = check_isset_meta($meta,'img_slider0'.$i);
				if (!empty($img_slider)){
					$img_path = get_attached_file( $img_slider );
					$ojb['prod_img_slider0'.$i] = csv_charset(basename( $img_path ));
					// $files_to_zip[] = realpath($img_path);
				}
			}

			// get display flag / 一覧に表示
			$ojb['display_flg'] = csv_charset('0');
			if ( $post->post_status == 'publish'){
				$ojb['display_flg'] = csv_charset('1');
			}else{
				if ( $post->post_status == 'pending'){
					$ojb['display_flg'] = csv_charset('2');
				}else{
					$ojb['display_flg'] = csv_charset('3');
				}
			}

			$ojb['prod_password'] = csv_charset($post->post_password);

			$prodPudDate = $post->post_date;
			$ojb['prod_publish_date'] = csv_charset($prodPudDate);
			
			// add to csv
			fputcsv($buffer, $ojb, ',', '"');
			
			$no++;
		}

		// rewind the position of a file pointer
		rewind($buffer);
		// set temp file name
		$tempfile_name = plugin_dir_path( __FILE__ ).'/tmp/product.csv';
		$tempfile = fopen($tempfile_name, 'w+');
		// write content to temp file
		fwrite($tempfile,stream_get_contents($buffer));
		fclose($tempfile); // close the file
		// add csv file to zip
		$files_to_zip[] = $tempfile_name;

		// zip files and output
		if (count($files_to_zip)>0){
			$result = create_zip($files_to_zip,'product_export_'.date('YmdHis').'.zip');
			// remove temp file
			if (file_exists($tempfile_name))
				unlink($tempfile_name);
			if (!$result){
				Header("Content-Type: text/html; charset=utf-8");
				echo "<script>alert('No file to export');history.back();</script>";
			}
		} else {
			// remove temp file
			if (file_exists($tempfile_name))
				unlink($tempfile_name);
			Header("Content-Type: text/html; charset=utf-8");
			echo "<script>alert('No file to export');history.back();</script>";
		}

		exit;
	}catch (Exception $e){
		echo "<script>alert('Please try again later.');history.back();</script>";
	}
}

function check_isset_meta($meta, $key){
	return isset($meta[$key][0]) ? csv_charset($meta[$key][0]) : '';
}

/**
 * search attachment by name
 * @param string $path
 * @return boolean|attachment id
 */
function search_attachment_by_name($path=''){
	try{
		// get file name without file extension
		$filename = pathinfo($path, PATHINFO_FILENAME);
		// check valid file name
		if (empty($filename)){
			return false;
		}
		// set search argument
		$args = array("post_type" => "attachment", "s" => $filename);
		$query = get_posts( $args );
		// get first match
		if ( isset($query[0]->ID) ){
			return $query[0]->ID;
		}
	}catch (Exception $e){
		return false;
	}
	
	return false;
}

/**
 * upload image as an attachment
 * @param string $attachment_name
 * @param integer $post_parent_id
 * @return boolean|Ambigous <number, WP_Error>
 */
function upload_attachment($src_filename='', $post_parent_id = 0){
	try {
		// check file exist
		if (!file_exists($src_filename)){
			return false;
		}
		
		// get upload dir
		$uploads = wp_upload_dir();
		
		// get destination name
		$dest_file_name = get_dest_file_name($src_filename, $uploads['path']);
		
		// $filename should be the path to a file in the upload directory.
		$filename = $uploads['path'].'/'.basename( $dest_file_name );
		// move file to upload dir
		if (!copy($src_filename, $filename)) {
			return false;
		}

		// Check the type of file. We'll use this as the 'post_mime_type'.
		$filetype = wp_check_filetype( basename( $filename ), null );
		
		// Get the path to the upload directory.
		$wp_upload_dir = wp_upload_dir();
		
		// Prepare an array of post data for the attachment.
		$attachment = array(
				'guid'           => $wp_upload_dir['url'] . '/' . basename( $filename ),
				'post_mime_type' => $filetype['type'],
				'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $filename ) ),
				'post_content'   => '',
				'post_status'    => 'inherit'
		);
		
		// Insert the attachment.
		$attach_id = wp_insert_attachment( $attachment, $filename, $post_parent_id );
		
		// Make sure that this file is included, as wp_generate_attachment_metadata() depends on it.
		require_once( ABSPATH . 'wp-admin/includes/image.php' );
		// Generate the metadata for the attachment, and update the database record.
		$attach_data = wp_generate_attachment_metadata( $attach_id, $filename );
		wp_update_attachment_metadata( $attach_id, $attach_data );
		
		// return attachment ID
		return $attach_id;
		
	}catch (Exception $e){
		return false;
	}
	return false;
}

/**
 * File validation
 * @param string $field_name
 * @param string $inp_name
 * @param string $type
 * @param string $error_msg
 * @return boolean
 */
function file_validation($field_name, $inp_name, $type='csv', &$error_msg){
	$file_data = &$_FILES;
	// Check file exits
	if(!isset($file_data[$inp_name])){
		$error_msg = sprintf('File not found for %s.', $field_name);
		return false;
	}
	// Get file from form submit data
	$file = $file_data[$inp_name];

	// Check empty file input
	if( $file['name'] == '' ){
		$error_msg = sprintf('CSVファイルが添付されていません。');
		return false;
	}
	// Check file error code and empty tmp_name
	if( $file['error'] != 0 || !isset($file['tmp_name']) ){
		$error_msg = sprintf('File not found for %s.', $field_name);
		return false;
	}
	// Check file type
	switch ($type){
		case 'csv':
			$valid_file_type = array('application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv');
			if ( !in_array($file['type'], $valid_file_type) ) {
				$error_msg = sprintf('%s was invalid file type. Please choose a csv file.', $field_name);
				return false;
			}
			break;
		case 'zip':
			$valid_file_type = array('application/zip','application/x-zip-compressed');
			if ( !in_array($file['type'], $valid_file_type) ) {
				$error_msg = sprintf('%s was invalid file type. Please choose a zip file.', $field_name);
				return false;
			}
			break;
		default:
			break;
	}
	return true;
}

/**
 * Check file name exist and rename it
 * @param unknown $name
 * @param unknown $path
 * @return Ambigous <string, mixed>
 */
function get_dest_file_name($name, $path){
	// get file name from file path
	$actual_name = pathinfo($name,PATHINFO_FILENAME);
	// set original name
	$original_name = $actual_name;
	// get file extension
	$extension = pathinfo($name, PATHINFO_EXTENSION);
	// the name can use
	$valid_name = $actual_name.".".$extension;
	
	$i = 1;
	// check already file exist in destination directory
	while(file_exists($path.'/'.$actual_name.".".$extension))
	{
		// add number to file name
		$actual_name = (string)$original_name.'_'.$i;
		$valid_name = $actual_name.".".$extension;
		$i++;
	}
	// return valid file name
	return $valid_name;
}


/**
 * Generatting array formatted from csv data.
 * @param string $dir
 * @param string $filename
 * @param array $array set converted data to this array
 * @param string $encode
 * @return boolean
 */
function csv_to_array($dir, $filename, &$array, $encode = true){
	ini_set("auto_detect_line_endings", true);
	// Initialization
	$result = true;
	$array = array();
	// Get the full path name of the file
	$fileFullname = $dir . $filename;
	
	// File existence check
	$result = file_exists($fileFullname);

	
	if($result){
		// open file to read
		if (($handle = fopen($fileFullname, "r")) !== FALSE) {
			$csv = file_get_contents($fileFullname);
			$array = csvstring_to_array($csv, 0, ",");
			if ($array) {
				$result = true;
				// Set language
				mb_language("japanese");
				// Set file encoding
				mb_internal_encoding("UTF-8");
				foreach ($array as $key_line => $row){
					foreach ($row as $key_coloumn => $value){
						$array[$key_line][$key_coloumn] =  mb_convert_encoding($value, "UTF-8", "SJIS");
					}
				}


        //echo '<pre>';
        //print_r($array);
        //exit;   	
			}

			fclose($handle);
		}else{
			$result = false;
		}
	}

			
	return	$result;
}

function csvstring_to_array($string, $skip_rows = 0, $separatorChar = ';', $enclosureChar = '"', $newlineChar = "\n") {
        // @author: Klemen Nagode 
        // @source: http://stackoverflow.com/questions/1269562/how-to-create-an-array-from-a-csv-file-using-php-and-the-fgetcsv-function
        $array = array();
        $size = strlen($string);
        $columnIndex = 0;
        $rowIndex = 0;
        $fieldValue="";
        $isEnclosured = false;
        for($i=0; $i<$size;$i++) {

            $char = $string{$i};
            $addChar = "";

            if($isEnclosured) {
                if($char==$enclosureChar) {

                    if($i+1<$size && $string{$i+1}==$enclosureChar){
                        // escaped char
                        $addChar=$char;
                        $i++; // dont check next char
                    }else{
                        $isEnclosured = false;
                    }
                }else {
                    $addChar=$char;
                }
            }else {
                if($char==$enclosureChar) {
                    $isEnclosured = true;
                }else {

                    if($char==$separatorChar) {

                        $array[$rowIndex][$columnIndex] = $fieldValue;
                        $fieldValue="";

                        $columnIndex++;
                    }elseif($char==$newlineChar) {
                        $array[$rowIndex][$columnIndex] = $fieldValue;
                        $fieldValue="";
                        $columnIndex=0;
                        $rowIndex++;
                    }else {
                        $addChar=$char;
                    }
                }
            }
            if($addChar!=""){
                $fieldValue.=$addChar;

            }
        }

        if($fieldValue) { // save last field
            $array[$rowIndex][$columnIndex] = $fieldValue;
        }


        /**
         * Skip rows. 
         * Returning empty array if being told to skip all rows in the array.
         */ 
        if ($skip_rows > 0) {
            if (count($array) == $skip_rows)
                $array = array();
            elseif (count($array) > $skip_rows)
                $array = array_slice($array, $skip_rows);           

        }

        return $array;
    }

/**
 * change charset for CSV
 */
function csv_charset($str) {
	return mb_convert_encoding($str, 'SJIS', 'auto');
}

/**
 * creates a compressed zip file
 * @param unknown $files
 * @param string $destination
 * @param string $overwrite
 * @return boolean
 */
function create_zip($files = array(),$destination = '',$overwrite = false) {
	//if the zip file already exists and overwrite is false, return false
	if(file_exists($destination) && !$overwrite) { return false; }

	//vars
	$valid_files = array();
	//if files were passed in...
	if(is_array($files)) {
		//cycle through each file
		foreach($files as $file) {
			//make sure the file exists
			if(file_exists($file)) {
				$valid_files[] = $file;
			}
		}
	}

	//if we have good files...
	if(count($valid_files)) {
		//create the archive
		$zip = new ZipArchive();
		$ziptmp = tempnam(sys_get_temp_dir(),'zip');
		unlink($ziptmp);
		if($zip->open($ziptmp,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
			return false;
		}
		//add the files
		foreach($valid_files as $file) {
			$zip->addFromString(basename( $file ), file_get_contents($file));
		}
		//close the zip -- done!
		$zip->close();

		//check to make sure the file exists
		if(file_exists($ziptmp)){
			$size = filesize($ziptmp);
			$handle = fopen( $ziptmp, "rb" );
			if($size > 0){
				$zipdata = fread( $handle, $size );
			}
			fclose($handle);
			unlink($ziptmp);
			
			Header("Content-disposition: attachment; filename=".$destination);
			Header("Content-type: application/octet-stream; name=".$destination);
			Header("Cache-Control: ");
			Header("Pragma: ");
			ob_clean();
			flush();

			/* export data */
			echo $zipdata;
			return true;
		}
	}else{
		return false;
	}
}

/**
 * Convert 2 byte nymber to 2 byte number
 * @param unknown $num
 * @return string
 */
function __num2to1byte($num){
	$replace = array('1','2','3','4','5','6','7','8','9','0');
	$find = array('１','２','３','４','５','６','７','８','９', '０');

	$num = str_replace($find,$replace,$num);
	return $num;
}

?>