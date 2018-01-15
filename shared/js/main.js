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
  var progessBar = $('#progressBar');
  var qtscore = $('.qtscore');
  var qthighscore = $('.qthighscore');
  var gameSuccess = 'shared/img/common/success.gif';
  var gameFailed = 'shared/img/common/failed.gif';
  var gameStart = 'shared/img/common/start.gif';
  var gameTimeup = 'shared/img/common/timeup.gif';
  var totalTime = 3; //time for progress bar
  var randomMax = 8; //maximum show question
  var totalScore = 0;


  var quesStack = [
    {img: "testquestion1", name: "Ai đây1?", left: "Zuka1", right: "Wukong1", anleft: 1, anright: 0},
    {img: "testquestion2", name: "Ai đây2?", left: "Zuka2", right: "Wukong2", anleft: 1, anright: 0},
    {img: "testquestion3", name: "Ai đây3?", left: "Zuka3", right: "Wukong3", anleft: 1, anright: 0},
    {img: "testquestion4", name: "Ai đây4?", left: "Zuka4", right: "Wukong4", anleft: 1, anright: 0},
    {img: "testquestion5", name: "Ai đây5?", left: "Zuka5", right: "Wukong5", anleft: 1, anright: 0},
    {img: "testquestion6", name: "Ai đây6?", left: "Zuka6", right: "Wukong6", anleft: 1, anright: 0},
    {img: "testquestion7", name: "Ai đây7?", left: "Zuka7", right: "Wukong7", anleft: 1, anright: 0},
    {img: "testquestion8", name: "Ai đây8?", left: "Zuka8", right: "Wukong8", anleft: 1, anright: 0},
    {img: "testquestion9", name: "Ai đây9?", left: "Zuka9", right: "Wukong9", anleft: 1, anright: 0}
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

  // var storage = window.localStorage;
  // storage.setItem("totalScore", 0);
  // var parseInt(qtscore.children().text(), 10)
  // if (storage.getItem("totalScore") < null) {
  //     setTimeout(function(){
  //         document.getElementById("wrap-review").classList.add('active');
  //     }, 180000);
  // }


  $('.btn-answer').click(function() {
    var answerSelect = $(this).children().attr('data-answer');
    clearTimeout(progDelay); // clear timeout in progress
    if(answerSelect != 0){
      effectPages(function(){
        calcScore(progessBar.children().attr('data-time'));
        insertQuestion(quesStack,r);
        progressTime(totalTime, totalTime, progessBar);
      },gameSuccess,1000);
    }else{
      effectPages(function(){
        redirectPages('#restart', 'none');
      },gameFailed,2000);
    }
  });

  function calcScore(score){
    var intScore = parseInt(score) + 1;
    var curScore = parseInt(qtscore.children().text(), 10);
    var calc = curScore + (intScore > 3 ? 3 : intScore)*5;
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
    qtimg.children().attr("src", pathImg + elementArr.img + imgJpg);
    qtname.text(elementArr.name);
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

  function progressTime(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').stop().animate({ width: progressBarWidth }, timeleft == timetotal ? 0 : 1000, 'linear').attr('data-time', timeleft);
    if(timeleft >= 0) {
      progDelay = setTimeout(function() {
        progressTime(timeleft - 1, timetotal, $element);
      }, 1000);
    }else{
      effectPages(function(){
        redirectPages('#restart', 'none');
      },gameTimeup,2000);
    }
  }












































  var imgShared = 'shared/img/';
  var soundShared = 'shared/sound/';
  var uiBtn = $('.ui-btn, .ui-btn-left, .ui-btn-right, .lvg_class');
  var systemLink = $('.btn-sys');

  /* Open link outsite */
  systemLink.click(function() {
    var hrefA = $(this).attr('href');
    cordova.InAppBrowser.open(hrefA, '_system', null);
  });

  /* Set time out for wall */
  // var frontWall = $('.front-wall');
  // setTimeout(function(){ frontWall.fadeOut(600); }, 2000);
  // body.addClass('wall-active');

  /* Open url */
  var lvgAWalls = $('.lvg_walls .ui-block-a a');
  var lvgBWalls = $('.lvg_walls .ui-block-b a');
  lvgAWalls.click(function() {
    var hrefA = $(this).attr('href');
    cordova.InAppBrowser.open(hrefA, '_blank', 'location=yes');
  });
  lvgBWalls.click(function() {
    var hrefA = $(this).attr('href');
    cordova.InAppBrowser.open(hrefA, '_system', null);
  });

  /* Slider images */
  $('.lvg_slider').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    variableWidth: true,
    arrows: false
  });

  /* Skills */
  var skills = $('.lvg_incskill');
  skills.children('div').each(function(){
    var text = $(this).text();
    var splText = text.split(',');
    $(this).text('');
    for(var i = 1; i <= 15; i++){
      $(this).append('<span>' + i + '</span>');
    }
    for(var j = 0; j < splText.length; j++){
      $(this).children('span').eq(splText[j] - 1).addClass('active');
    }
  });

  /* Selecte class */
  var selectClass = $('.lvg_class');
  var selectChamps = $('.lvg_select_champs');
  selectClass.on('change', function() {
    var value = $(this).children('option:selected').val();
    selectChamps.children().hide();
    selectChamps.children('.' + value).show();
    if(value == 'tatca'){
      selectChamps.children().show();
    }
  });

  /* Runes */
  var skillsSP = $('.lvg_items');
  skillsSP.find('.item').each(function() {
    var text = $(this).text();
    $(this).css({'background-image':'url('+ imgShared + 'items/' + text + '.png)'});
  });

  /* Runes */
  var skillsSP = $('.lvg_runes');
  skillsSP.find('.rune').each(function() {
    var text = $(this).text();
    $(this).css({'background-image':'url('+ imgShared + 'runes/' + text + '.png)'});
  });

  /* Skills Support */
  var skillsSP = $('.lvg_skills_sp');
  skillsSP.find('a').each(function() {
    var text = $(this).text();
    $(this).css({'background-image':'url('+ imgShared + 'skills/' + text + '.png)'});
  });

  /* Skills */
  var skills = $('.lvg_skills');
  skills.find('.skill').each(function() {
    var text = $(this).text();
    var champSkill = $(this).parents('.lvg_skills').data('skill');
    if(text !== 'normal'){
      $(this).css({'background-image':'url('+ imgShared + 'champs/' + champSkill + '/' + text + '.png)'});
    }else{
      $(this).css({'background-image':'url('+ imgShared + 'common/normal.png)'});
    }
  });

  /* Champions */
  var champs = $('.lvg_champs');
  champs.find('a').each(function() {
    var href = $(this).attr('href');
    $(this).css({'background-image':'url('+ imgShared + 'champs/' + href.replace('#', '') +'/avat1.jpg)'});
  });

  /* Main click */
  var click01 = soundShared + 'click01.wav';
  var click02 = soundShared + 'click02.ogg';
  var typeOgg = 'audio/ogg';
  var typeWav = 'audio/wav';
  body.append('<audio id="main_click" src="'+ click02 +'" type="'+ typeOgg +'"></audio>');
  uiBtn.on('click', function(){
    $('#main_click').get(0).play();
  });

});