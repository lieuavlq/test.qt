$('document').ready(function(){
  var body = $('body');

$( ".test" ).find( "div" ).eq( 0 ).addClass( "blue" );


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

var arr1 = [
  {name: "anhvu", phone: "123"},
  {name: "anhhung", phone: "456"},
  {name: "anhC", phone: "789"},
  {name: "anhD", phone: "741"},
  {name: "anhE", phone: "147"},
  {name: "anhF", phone: "258"},
  {name: "anhG", phone: "369"}
]

function randomGenerator(low, high) {
  if (arguments.length < 2) {
    high = low;
    low = 0;
  }
  this.low = low;
  this.high = high;
  this.reset();
}

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

var r = new randomGenerator(0, 6);
console.dir(arr1);

$('.clickMe').click(function(event) {
  /* Act on the event */
  console.log(arr1[r.get()].name);
  return false;
});


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