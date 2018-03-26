//creating bat, ball, score and gameover objects
$(function(){
  var bat='<div id=bat></div>';
  $("#grid").append(bat);
  var ball='<div id=ball></div>';
  $("#grid").append(ball);
  var score='<div id="score">SCORE:0</div>'
  $("#grid").append(score);
  var game_over='<div id="game_over"></div>';
  $("#grid").append(game_over);
});


$(document).ready (function start(){
  var bat_pos;
  var ball_pos;
  var ball_go='down';
  var ball_left_right='right';
  var points=0;

document.addEventListener("keydown", move_bat);

//bat movement
function move_bat(event){
 bat_pos=$("#bat").position();
  if(event.keyCode==37){
    $("#bat").css('left',bat_pos.left-10+'px');//move left
  }
  if(event.keyCode==39){
    $("#bat").css('left',bat_pos.left+10+'px');//move right
  }
}

//ball movement
move=requestAnimationFrame(move_ball)
function move_ball(){
  ballx= $("#ball").offset().left;
  bally= $("#ball").offset().top;

if(collision(bat,ball)==true){
ball_go='up';
points+=10;
$('#score').html("SCORE:"+points);
}
if(ballx<=0){
  ball_left_right='right';
}
else if(ballx>=600){
  ball_left_right='left';
}
if(ball_go=='down'){
  balldown();
}
else if(ball_go='up'){
  ballup();
}
if(bally>=450){
gameover();
}
move=requestAnimationFrame(move_ball);
}

function balldown(){
  ball_pos=$("#ball").position();
  $("#ball").css('top',ball_pos.top+3+'px');
  if(ball_left_right=='right'){
    $("#ball").css('left',ball_pos.left+3+'px');
  }
  else if(ball_left_right=='left'){
    $("#ball").css('left',ball_pos.left-3+'px');
  }
}

function ballup(){
  ball_pos=$("#ball").position();
  $("#ball").css('top',ball_pos.top-3+'px');
  if(ball_pos.top==70){
    ball_go='down';
  }
  if(ball_left_right=='right'){
    $("#ball").css('left',ball_pos.left+3+'px');
  }
  else if(ball_left_right=='left'){
    $("#ball").css('left',ball_pos.left-3+'px');
  }
}

function gameover(){
  ball_left_right=null;
$("#ball").css('position','sticky');
$('#game_over').html("GAME OVER");
move_ball.stop();
}

//detects collision of two divs (bat & ball)
var collision =function(ele1,ele2) {
      var x1 = $(ele1).offset().left;
      var y1 = $(ele1).offset().top;
      var h1 = $(ele1).outerHeight(true);
      var w1 = $(ele1).outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $(ele2).offset().left;
      var y2 = $(ele2).offset().top;
      var h2 = $(ele2).outerHeight(true);
      var w2 = $(ele2).outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
    }
});
