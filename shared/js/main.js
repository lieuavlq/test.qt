$('document').ready(function(){
  var body = $('body');
  var qtimg, qttime, qtname, qtleft, qtright, pathImg, imgJpg;
  qtimg = $('.qtimg');
  qttime = $('.qttime');
  qtname = $('.qtname');
  qtleft = $('.qtleft');
  qtright = $('.qtright');
  pathImg = 'shared/img/question/';
  imgJpg = '.jpg';
  var success = 'shared/img/common/success.gif';
  var failed = 'shared/img/common/failed.gif';
  var gameStart = 'shared/img/common/start.gif';

  var arr1 = [
    {img: "testquestion1", name: "Ai đây1?", left: "Zuka1", right: "Wukong1", anleft: 0, anright: 1},
    {img: "testquestion2", name: "Ai đây2?", left: "Zuka2", right: "Wukong2", anleft: 1, anright: 0},
    {img: "testquestion3", name: "Ai đây3?", left: "Zuka3", right: "Wukong3", anleft: 1, anright: 0},
    {img: "testquestion4", name: "Ai đây4?", left: "Zuka4", right: "Wukong4", anleft: 0, anright: 1},
    {img: "testquestion5", name: "Ai đây5?", left: "Zuka5", right: "Wukong5", anleft: 0, anright: 1},
    {img: "testquestion6", name: "Ai đây6?", left: "Zuka6", right: "Wukong6", anleft: 1, anright: 0},
    {img: "testquestion7", name: "Ai đây7?", left: "Zuka7", right: "Wukong7", anleft: 1, anright: 0},
    {img: "testquestion8", name: "Ai đây8?", left: "Zuka8", right: "Wukong8", anleft: 1, anright: 0},
    {img: "testquestion9", name: "Ai đây9?", left: "Zuka9", right: "Wukong9", anleft: 0, anright: 1}
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

  var totalTime = 2;
  var timeshow = progress(totalTime, totalTime, $('#progressBar'));  

  var r = new randomGenerator(0, 8);
  insertQuestion(arr1,r);

  $('.qtresult > div').click(function() {
    // clearTimeout(timeDelay);
    // var answerSelect = $(this).children().attr('data-answer');
    // if(answerSelect != 0){
    //   $('.result-panel').addClass('active').children().attr('src', success);
    //   var timeDelay = setTimeout(function() {
    //     $('.result-panel').removeClass('active');
    //     insertQuestion(arr1,r);
    //   }, 1000);
    // }else{
    //   $('.result-panel').addClass('active').children().attr('src', failed);
    //   var timeDelay = setTimeout(function() {
    //     $('.result-panel').removeClass('active');
    //     ShowSignUp('#restart', 'none');
    //   }, 2000);
    // }
    console.log(timeshow);
  });

  $('.btn-start').click(function() {
    // var counter = totalTime;
    // var interval = setInterval(function() {
    //   counter--;
    //   if (counter < 1) {
    //     clearInterval(interval);
    //   }
    // }, 1000);
    ShowSignUp('#main');
  });

  $('.btn-restart').click(function() {
    clearTimeout(timeDelay);
    $('.result-panel').addClass('active').children().attr('src', gameStart);
      var timeDelay = setTimeout(function() {
        $('.result-panel').removeClass('active');
        insertQuestion(arr1,r);
        ShowSignUp('#main', 'none');
      }, 2000);
  });

  function insertQuestion(newArr, r){
    var elementArr = newArr[r.get()];
    // console.log(elementArr.name);
    qtimg.children().attr("src", pathImg + elementArr.img + imgJpg);
    qtname.text(elementArr.name);
    qtleft.children().text(elementArr.left).attr({'data-answer': elementArr.anleft});
    qtright.children().text(elementArr.right).attr({'data-answer': elementArr.anright});
  };

  function ShowSignUp(page,effect){
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

  function progress(timeleft, timetotal, $element) {
    var timeleft1 = timeleft;
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').animate({ width: progressBarWidth }, timeleft == timetotal ? 0 : 1000, 'linear');
    if(timeleft > 0) {
      setTimeout(function() {
        progress(timeleft - 1, timetotal, $element);
      }, 1000);
    }
    return timeleft1;
  }

// var arr = ["mon","tues","wed"];
// var arr = [];

// arr[0] = "mon";
// arr[1] = "tues";
// arr[2] = "wed";

// arr["drink"] = "beer";
// arr["music"] = "jazz";

// arr.push({
//   name: "bart simpson",
//   phone: "555-1212"
// });

// arr.push(function(){
//   console.log('i am an element of the array "arr", that happens to be an anonymous function');
// });

// arr.testMe = function(){
//   console.log('i am "testMe", a property of the array "arr", that happens to be an anonymour function');
// };


// console.log("the length of arr is: " + arr.length);
// console.dir(arr1);

// arr[4]();
// arr.testMe();

// console.log("Name: " + arr[3].name + "\nPhone: " + arr[3].phone);

// for (var prop in arr){
//   console.log("Prop: " + arr[prop]);
// }












































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