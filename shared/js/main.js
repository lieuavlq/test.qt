$('document').ready(function(){
  var body = $('body');
  var qtimg, qttime, qtname, qtleft, qtright, pathImg, imgJpg, progDelay;
  qtimg = $('.qtimg');
  qttime = $('.qttime');
  qtname = $('.qtname');
  qtleft = $('.qtleft');
  qtright = $('.qtright');
  pathImg = 'shared/img/question/';
  imgJpg = '.jpg';
  var soundShared = 'shared/sound/';
  var uiBtn = $('.ui-btn, .ui-btn-left, .ui-btn-right, .lvg_class');
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

  var storage = window.localStorage;

  //reset score
  // storage.setItem("totalScore", 0);

  /* Show Rank */
  getRank();

  /* Show High Score */
  var currentScore = storage.getItem("totalScore");
  if(currentScore === null){
    currentScore = 0;
  }
  qthighscore.children().text(currentScore);

  var quesStack = [
    {img: "testquestion1", name: "Ai đây1?", left: "Zuka1", right: "Wukong1", anleft: 1, anright: 0, star: 0},
    {img: "thuonglong", name: "Ai đây2?", left: "Zuka2", right: "Wukong2", anleft: 1, anright: 0, star: 1},
    {img: "testquestion3", name: "Ai đây3?", left: "Zuka3", right: "Wukong3", anleft: 1, anright: 0, star: 0},
    {img: "thuonglong", name: "Ai đây4?", left: "Zuka4", right: "Wukong4", anleft: 1, anright: 0, star: 1},
    {img: "testquestion5", name: "Ai đây5?", left: "Zuka5", right: "Wukong5", anleft: 1, anright: 0, star: 1},
    {img: "testquestion6", name: "Ai đây6?", left: "Zuka6", right: "Wukong6", anleft: 1, anright: 0, star: 1},
    {img: "thuonglong", name: "Ai đây7?", left: "Zuka7", right: "Wukong7", anleft: 1, anright: 0, star: 0},
    {img: "testquestion8", name: "Ai đây8?", left: "Zuka8", right: "Wukong8", anleft: 1, anright: 0, star: 1},
    {img: "thuonglong", name: "Ai đây9?", left: "Zuka9", right: "Wukong9", anleft: 1, anright: 0, star: 0}
  ]

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

  $('.btn-answer').click(function() {
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
      {id: 'chuaco', name: 'chưa có', img: ''},
      {id: 'dong3', name: 'Đồng 3', img: 'shared/img/common/icon_dong.png'},
      {id: 'dong2', name: 'Đồng 2', img: 'shared/img/common/icon_dong.png'},
      {id: 'dong1', name: 'Đồng 1', img: 'shared/img/common/icon_dong.png'},
      {id: 'bac3', name: 'Bạc 3', img: 'shared/img/common/icon_bac.png'},
      {id: 'bac2', name: 'Bạc 2', img: 'shared/img/common/icon_bac.png'},
      {id: 'bac1', name: 'Bạc 1', img: 'shared/img/common/icon_bac.png'},
      {id: 'vang4', name: 'Vàng 4', img: 'shared/img/common/icon_vang.png'},
      {id: 'vang3', name: 'Vàng 3', img: 'shared/img/common/icon_vang.png'},
      {id: 'vang2', name: 'Vàng 2', img: 'shared/img/common/icon_vang.png'},
      {id: 'vang1', name: 'Vàng 1', img: 'shared/img/common/icon_vang.png'},
      {id: 'bk5', name: 'Bạch Kim 5', img: 'shared/img/common/icon_bk.png'},
      {id: 'bk4', name: 'Bạch Kim 4', img: 'shared/img/common/icon_bk.png'},
      {id: 'bk3', name: 'Bạch Kim 3', img: 'shared/img/common/icon_bk.png'},
      {id: 'bk2', name: 'Bạch Kim 2', img: 'shared/img/common/icon_bk.png'},
      {id: 'bk1', name: 'Bạch Kim 1', img: 'shared/img/common/icon_bk.png'},
      {id: 'kc5', name: 'Kim Cương 5', img: 'shared/img/common/icon_kc.png'},
      {id: 'kc4', name: 'Kim Cương 4', img: 'shared/img/common/icon_kc.png'},
      {id: 'kc3', name: 'Kim Cương 3', img: 'shared/img/common/icon_kc.png'},
      {id: 'kc2', name: 'Kim Cương 2', img: 'shared/img/common/icon_kc.png'},
      {id: 'kc1', name: 'Kim Cương 1', img: 'shared/img/common/icon_kc.png'},
      {id: 'ct', name: 'Cao Thủ', img: 'shared/img/common/icon_ct.png'},
    ];
    if(rankScore > 0) {
      qtrankimg.show();
    }else{
      qtrankimg.hide();
    }

    switch(true){
      case rankScore <= 0: element = 'chuaco'; break;
      case rankScore <= 50: element = 'dong3'; break;
      case rankScore <= 100: element = 'dong2'; break;
      case rankScore <= 150: element = 'dong1'; break;
      case rankScore <= 200: element = 'bac3'; break;
      case rankScore <= 250: element = 'bac2'; break;
      case rankScore <= 300: element = 'bac1'; break;
      case rankScore <= 350: element = 'vang4'; break;
      case rankScore <= 400: element = 'vang3'; break;
      case rankScore <= 450: element = 'vang2'; break;
      case rankScore <= 500: element = 'vang1'; break;
      case rankScore <= 550: element = 'bk5'; break;
      case rankScore <= 600: element = 'bk4'; break;
      case rankScore <= 650: element = 'bk3'; break;
      case rankScore <= 700: element = 'bk2'; break;
      case rankScore <= 750: element = 'bk1'; break;
      case rankScore <= 800: element = 'kc5'; break;
      case rankScore <= 850: element = 'kc4'; break;
      case rankScore <= 900: element = 'kc3'; break;
      case rankScore <= 950: element = 'kc2'; break;
      case rankScore <= 1000: element = 'kc1'; break;
      case rankScore <= 1050: element = 'ct'; break;
      default: element = 'ct1'; break;
    }

    if(element == 'ct1'){
      var valRank = parseInt(((rankScore - 1000) / 100), 10);
      var rankCT;
      if(valRank >= 1){
        rankCT = 'Cao Thủ ' + valRank;
      }else{
        rankCT = 'Cao Thủ';
      }
      qtrank.children().text(rankCT);
      qtrankimg.children().attr('src', 'shared/img/common/icon_ct.png');
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
      getTimeup();
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
    var elementArr = newArr[r.get()];
    qtimg.children().attr({'src': pathImg + elementArr.img + imgJpg});
    qtname.text(elementArr.name).attr({'data-star': elementArr.star});
    qtleft.children().text(elementArr.anleft + elementArr.left).attr({'data-answer': elementArr.anleft});
    qtright.children().text(elementArr.anright + elementArr.right).attr({'data-answer': elementArr.anright});
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
  // var click01 = soundShared + 'click01.wav';
  var click02 = soundShared + 'click02.ogg';
  var clickTrue = soundShared + 'true.mp3';
  var clickFalse = soundShared + 'false.mp3';
  var clickTimeup = soundShared + 'timeup.mp3';
  var typeOgg = 'audio/ogg';
  var typeWav = 'audio/wav';
  var typeMpeg = 'audio/mpeg';
  body.append('<audio id="main_click" src="'+ click02 +'" type="'+ typeOgg +'"></audio>');
  body.append('<audio id="true_click" src="'+ clickTrue +'" type="'+ typeMpeg +'"></audio>');
  body.append('<audio id="false_click" src="'+ clickFalse +'" type="'+ typeMpeg +'"></audio>');
  body.append('<audio id="timeup_click" src="'+ clickTimeup +'" type="'+ typeMpeg +'"></audio>');
  uiBtn.on('click', function(){
    soundRun('main_click');
  });

  function soundRun(item){
    $('#' + item).get(0).play();
  }

});