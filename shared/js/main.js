$('document').ready(function(){
  var body = $('body');
  var qtimg = $('.qtimg');
  var qttime = $('.qttime');
  var qtname = $('.qtname');
  var qtleft = $('.qtleft');
  var qtright = $('.qtright');
  var pathImg = 'shared/img/question/';
  var imgJpg = '.jpg';
  var soundShared = 'shared/sound/';
  var uiBtn = $('.ui-btn, .ui-btn-left, .ui-btn-right, .lvg_class, .zkbtn span, .zkbtn-circle a');
  var qtstar = $('.qtstar');
  var qtnotify = $('.qtnotify');
  var progessBar = $('#progressBar');
  var qtscore = $('.qtscore');
  var qthighscore = $('.qthighscore');
  var qtnewscore = $('.qtnewscore');
  var gameSuccess = 'shared/img/common/success.gif';
  var gameFailed = 'shared/img/common/failed.gif';
  var gameStart = 'shared/img/common/start.gif';
  var gameTimeup = 'shared/img/common/timeup.gif';
  var totalTime = 3; //time for progress bar
  var randomMax = 8; //maximum show question
  var totalScore = 0;
  var txtWrong = 'Sai mất rồi!';
  var txtTimeup = 'Hết giờ rồi!';
  var btnAnswer = $('.btn-answer');
  var storage = window.localStorage;
  var quesStack = ques_stack_vn;

  //reset score
  storage.setItem("totalScore", "");

  /* Show Rank */
  getRank();

  /* Show High Score */
  var currentScore = storage.getItem("totalScore");
  if(currentScore === null || currentScore === ''){
    currentScore = 1;
  }
  qthighscore.children().text(currentScore);

  randomGenerator.prototype = {
    reset: function() {
      this.remaining = [];
      for (var i = this.low; i <= this.high; i++) {
        this.remaining.push(i);
      }
    },
    get: function() {
      if (!this.remaining.length) {
        this.reset();
      }
      var index = Math.floor(Math.random() * this.remaining.length);
      var val = this.remaining[index];
      this.remaining.splice(index, 1);
      return val;        
    }
  }  

  var r = new randomGenerator(0, randomMax);
  var progDelay;

  btnAnswer.click(function() {
    var answerSelect = $(this).children().attr('data-answer');
    clearTimeout(progDelay);
    if(answerSelect != 0){
      soundRun('true_click');
      effectPages(function(){
        calcScore(progessBar.children().attr('data-time'));
        insertQuestion(quesStack,r);
        getStar();
        progressTime(totalTime, totalTime, progessBar);
      },gameSuccess,1000);
    }else{
      soundRun('false_click');
      effectPages(function(){
        redirectPages('#restart', 'none');
        getHighscore();
        getNotify(txtWrong);
        getRank();
      },gameFailed,2000);
    }
  });

  $('.btn-start').click(function() {
    effectPages(function(){
      resetScore();
      insertQuestion(quesStack,r);
      redirectPages('#main', 'none');
      progressTime(totalTime, totalTime, progessBar);
    },gameStart,2000);
  });

  $('.btn-restart').click(function() {
    effectPages(function(){
      resetScore();
      insertQuestion(quesStack,r);
      redirectPages('#main', 'none');
      progressTime(totalTime, totalTime, progessBar);
    },gameStart,2000);
  });

  /* Functions */
  function getRank(){
    var element;
    var rankScore = storage.getItem("totalScore");
    var qtrank = $('.qtrank');
    var qtrankimg = $('.qtrankimg');
    var rankArray = [
      {id: 'go3', name: 'Gỗ 3', img: 'shared/img/common/rank_go.png'},
      {id: 'go2', name: 'Gỗ 2', img: 'shared/img/common/rank_go.png'},
      {id: 'go1', name: 'Gỗ 1', img: 'shared/img/common/rank_go.png'},
      {id: 'sat3', name: 'Sắt 3', img: 'shared/img/common/rank_sat.png'},
      {id: 'sat2', name: 'Sắt 2', img: 'shared/img/common/rank_sat.png'},
      {id: 'sat1', name: 'Sắt 1', img: 'shared/img/common/rank_sat.png'},
      {id: 'dong3', name: 'Đồng 3', img: 'shared/img/common/rank_dong.png'},
      {id: 'dong2', name: 'Đồng 2', img: 'shared/img/common/rank_dong.png'},
      {id: 'dong1', name: 'Đồng 1', img: 'shared/img/common/rank_dong.png'},
      {id: 'bac3', name: 'Bạc 3', img: 'shared/img/common/rank_bac.png'},
      {id: 'bac2', name: 'Bạc 2', img: 'shared/img/common/rank_bac.png'},
      {id: 'bac1', name: 'Bạc 1', img: 'shared/img/common/rank_bac.png'},
      {id: 'vang4', name: 'Vàng 4', img: 'shared/img/common/rank_vang.png'},
      {id: 'vang3', name: 'Vàng 3', img: 'shared/img/common/rank_vang.png'},
      {id: 'vang2', name: 'Vàng 2', img: 'shared/img/common/rank_vang.png'},
      {id: 'vang1', name: 'Vàng 1', img: 'shared/img/common/rank_vang.png'},
      {id: 'ruby4', name: 'Ruby 4', img: 'shared/img/common/rank_ruby.png'},
      {id: 'ruby3', name: 'Ruby 3', img: 'shared/img/common/rank_ruby.png'},
      {id: 'ruby2', name: 'Ruby 2', img: 'shared/img/common/rank_ruby.png'},
      {id: 'ruby1', name: 'Ruby 1', img: 'shared/img/common/rank_ruby.png'},
      {id: 'kc', name: 'Kim Cương', img: 'shared/img/common/rank_kc.png'},
    ];

    switch(true){
      case rankScore <= 50: element = 'go3'; break;
      case rankScore <= 100: element = 'go2'; break;
      case rankScore <= 150: element = 'go1'; break;
      case rankScore <= 200: element = 'sat3'; break;
      case rankScore <= 250: element = 'sat2'; break;
      case rankScore <= 300: element = 'sat1'; break;
      case rankScore <= 350: element = 'dong3'; break;
      case rankScore <= 400: element = 'dong2'; break;
      case rankScore <= 450: element = 'dong1'; break;
      case rankScore <= 500: element = 'bac3'; break;
      case rankScore <= 550: element = 'bac2'; break;
      case rankScore <= 600: element = 'bac1'; break;
      case rankScore <= 650: element = 'vang4'; break;
      case rankScore <= 700: element = 'vang3'; break;
      case rankScore <= 750: element = 'vang2'; break;
      case rankScore <= 800: element = 'vang1'; break;
      case rankScore <= 850: element = 'ruby4'; break;
      case rankScore <= 900: element = 'ruby3'; break;
      case rankScore <= 950: element = 'ruby2'; break;
      case rankScore <= 1000: element = 'ruby1'; break;
      case rankScore <= 1050: element = 'kc'; break;
      default: element = 'kc1'; break;
    }

    if(element == 'kc1'){
      var valRank = parseInt(((rankScore - 1000) / 100), 10);
      var rankCT;
      if(valRank >= 1){
        rankCT = 'Kim Cương ' + valRank;
      }else{
        rankCT = 'Kim Cương';
      }
      qtrank.children().text(rankCT);
      qtrankimg.children().attr('src', 'shared/img/common/rank_kc.png');
    }else{
      for(var i = 0; i<rankArray.length; i++){
        if(rankArray[i].id == element){
          qtrank.children().text(rankArray[i].name);
          qtrankimg.children().attr('src', rankArray[i].img);
        }
      }
    }

    clearTimeout(time);
    $('.qtrankimg img').addClass('animated tada');
    var time = setTimeout(function(){
      $('.qtrankimg img').removeClass('tada').addClass('infinite pulse');
    },2000);
  }

  function getStar() {
    if(qtname.attr('data-star') == 1){
      qtstar.addClass('active');
    }else{
      qtstar.removeClass('active');
    }
    return qtname.attr('data-star');
  }

  function getTimeup(){
    soundRun('timeup_click');
    effectPages(function(){
      getHighscore();
      getNotify(txtTimeup);
      getRank();
      redirectPages('#restart', 'none');
    },gameTimeup,2000);
  }

  function getNotify($text){
    qtnotify.children().text($text);
  }

  function getHighscore(){
    var qtcurrentscore = qtscore.children().text();
    var pointRound = parseInt(qtcurrentscore,10);
    var oldHighscore = storage.getItem("totalScore");
    var qthighscorestage = $('.qthighscorestage');
    
    if(pointRound > oldHighscore){
      storage.setItem("totalScore", pointRound);
      qthighscore.children().text(storage.getItem("totalScore"));
      qthighscorestage.show().children().text(qtcurrentscore);
      qtnewscore.hide();
    }else{
      qthighscorestage.hide();
      qtnewscore.show().children().text(qtcurrentscore);
    }
  }

  function calcScore(score){
    var valStar = getStar();
    var intScore = parseInt(score) + 1;
    var curScore = parseInt(qtscore.children().text(), 10);
    var scoreX;
    if(valStar == 1){
      scoreX = 5*2;
    }else{
      scoreX = 5;
    }
    var calc = curScore + (intScore > 3 ? 3 : intScore)*scoreX;
    qtscore.children().prop('number', curScore).animateNumber({
      number: calc
    },1000);
    qtscore.addClass('animated bounceIn');
    setTimeout(function() {
      qtscore.removeClass('animated bounceIn');
    }, 1000);
  }

  function resetScore(){
    qtscore.children().text(0);
  }

  function progressTime(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').stop().animate({ width: progressBarWidth }, timeleft == timetotal ? 0 : 1000, 'linear').attr('data-time', timeleft);
    if(timeleft >= 0) {
      progDelay = setTimeout(function() {
        progressTime(timeleft - 1, timetotal, $element);
      }, 1000);
    }else{
      btnDisOrNot(btnAnswer,1);
      getTimeup();
    }
  }

  function btnDisOrNot(btn,stt) {
    if(stt == 1){
      btn.addClass('disable');
    }else{
      btn.removeClass('disable');
    }
  }

  function effectPages(object,type,time){
    clearTimeout(timeDelay);
    $('.result-panel').addClass('active').children().attr('src', type);
    var timeDelay = setTimeout(function() {
      $('.result-panel').removeClass('active');
      object();
    }, time);
  }

  function insertQuestion(newArr, r){
    btnDisOrNot(btnAnswer, 0);
    var elementArr = newArr[r.get()];
    qtimg.children('.zkquesimg').css({'background-image': 'url(' + pathImg + elementArr.img + imgJpg + ')'});
    qtname.text(elementArr.name).attr({'data-star': elementArr.star});
    qtleft.children().attr({'data-answer': elementArr.anleft});
    qtright.children().attr({'data-answer': elementArr.anright});
  };

  function redirectPages(page,effect){
    if(effect !== null){
      $.mobile.changePage( page, { transition: effect} );
    }else{
      $.mobile.changePage( page );
    }
  }

  function randomGenerator(low, high) {
    if (arguments.length < 2) {
      high = low;
      low = 0;
    }
    this.low = low;
    this.high = high;
    this.reset();
  }

  /* Main click */
  var click03 = soundShared + 'click03.wav';
  var clickTrue = soundShared + 'true.mp3';
  var clickFalse = soundShared + 'false.mp3';
  var clickTimeup = soundShared + 'timeup.mp3';
  var bgMusic = soundShared + 'bg.mp3';
  var typeOgg = 'audio/ogg';
  var typeWav = 'audio/wav';
  var typeMpeg = 'audio/mpeg';
  body.append('<audio id="main_click" src="'+ click03 +'" type="'+ typeWav +'"></audio>');
  body.append('<audio id="true_click" src="'+ clickTrue +'" type="'+ typeMpeg +'"></audio>');
  body.append('<audio id="false_click" src="'+ clickFalse +'" type="'+ typeMpeg +'"></audio>');
  body.append('<audio id="timeup_click" src="'+ clickTimeup +'" type="'+ typeMpeg +'"></audio>');

  var bgmusicStore = storage.getItem('bgmusic');
  if(bgmusicStore === 'true'){
    body.append('<audio id="bg_music_click" src="'+ bgMusic +'" type="'+ typeMpeg +'" loop></audio>');
    $('a[href*="bgmusic"]').addClass('active');
  }else{
    body.append('<audio id="bg_music_click" src="'+ bgMusic +'" type="'+ typeMpeg +'" loop autoplay></audio>');
  }

  $('a[href*="bgmusic"]').click(function(){
    if($(this).hasClass('active')){
      $('a[href*="bgmusic"]').removeClass('active');
      $('#bg_music_click').get(0).play();
      storage.setItem('bgmusic', 'false');
    }else{
      $('a[href*="bgmusic"]').addClass('active');
      $('#bg_music_click').get(0).pause();
      storage.setItem('bgmusic', 'true');
    }
  });

  uiBtn.on('click', function(){
    soundRun('main_click');
  });

  function soundRun(item){
    $('#' + item).get(0).play();
  }

});