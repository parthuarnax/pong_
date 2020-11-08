// available keys must remain in a global variable.
// sigle alphabet variable = key
// if ( a ) means ""'a' pressed?""
let a = false;
let q = false;
let l = false;
let p = false;
let r = false;
let y = false;

// let ping_sound = [];
// let death_sound = [];
// let end_sound;
// let theme1_sound;
// let theme2_sound;
// let char_sound;

//function preload(){
   theme1_sound = loadSound('assets/theme.mp3');
//   theme2_sound = loadSound('assets/theme2.mp3');
//   for(let i = 0; i < 18; i++){
//     ping_sound[i] = loadSound('assets/'+i+'.mp3');
//   }
//   for(let i = 1; i < 5; i++){
//     death_sound[i-1] = loadSound('assets/D'+i+'.mp3');
//   }
//   end_sound = loadSound('assets/End.mp3');
//   char_sound = loadSound('assets/teris.mp3');
//}

function setup() {
  createCanvas(900, 550);
  noCursor();
  ball = new Ball(30);
  page = new GamePage();
  players = new Players();
}

function draw() {
  if (!page.pause_bool) {
    background(0);
    
    displayGame();
    
    if (!page.game_bool) {
      players.pad1Ypos = 220;
      players.pad1Xpos = 80;
      players.pad2Ypos = 220;
      players.pad2Xpos = 800;
    }
  
    page.scoreboard();
    page.main(page.main_bool);
    page.chara(page.chara_bool);
    page.winner(page.winner_bool);
  }

  pauseButton();
}

//------------------pause button------------------------

function pauseButton() {
  if (keyCode == 85) {
    page.pause_bool = true;
    background(0, 5);
    textSize(60);
    text('GAME PAUSED', 240, height / 2);
    textSize(30);
    text('Press any key to continue', 270, height / 2 + 70)
    return;
  } else {
    page.pause_bool = false;
    return;
  }
}

//------------------page design-------------------------
class GamePage {
  constructor() {
    this.tutMotionCount = 0;
    this.tutMotion = 0;
    
    this.main_bool = true;
    this.pause_bool = false;
    this.game_bool = false;
    this.winner_bool = false;
    this.chara_bool = false;
    
    this.playerScoreReset = function(){
      players.player1score = 0;
      players.player2score = 0;
    }

    this.main = function(bool) {      
      if (bool == true) {    
        if(!theme1_sound.isPlaying()){
          // end_sound.stop();
          theme1_sound.play();
          theme1_sound.loop();
        }
        this.playerScoreReset();       
        if (keyCode == 83) { // 's'tart pressed
          this.main_bool = false; // mainpage off
          this.chara_bool = true;
          return;
        }

        background(0);
        textSize(180);

        text('MEME\nPONG', 80, 225);
        textSize(42);
        stroke(255);
        strokeWeight(2);

        noFill();
        rect(635, 330, 140, 50);
        rect(635, 330, 195, 50);
        fill(255);
        text('Start    S', 645, 370);
        textSize(40);

        noFill();
        rect(635, 400, 140, 50);
        rect(635, 400, 195, 50);
        fill(255);
        text('Pause   U', 645, 440);
      } else {
        return;
      }
            
      this.tutorial = function() {
        let pushsome = 720;
        if(this.tutMotionCount > 4 && this.tutMotion == 39){
          return;
        }
        if(this.tutMotion > 40) {
          this.tutMotion = 0; 
          this.tutMotionCount++;
        }         
        textSize(40);
        fill(255, 200 - this.tutMotion * 3);
        text('Q', 70, 110 - this.tutMotion);
        text('▲', 66, 160 - this.tutMotion);
        text('▲', 66, 200 - this.tutMotion);
        text('▼', 66, 360 + this.tutMotion);
        text('▼', 66, 400 + this.tutMotion);
        text('A', 73, 450 + this.tutMotion);
        
        text('P', 75 + pushsome, 110 - this.tutMotion);
        text('▲', 66 + pushsome, 160 - this.tutMotion);
        text('▲', 66 + pushsome, 200 - this.tutMotion);
        text('▼', 66 + pushsome, 360 + this.tutMotion);
        text('▼', 66 + pushsome, 400 + this.tutMotion);
        text('L', 78 + pushsome, 450 + this.tutMotion);
          
        this.tutMotion++;
      }    

      this.winner = function(bool) {
        if (bool == false) {
          if (players.player1score == 3) {
            // if( ! end_sound.isPlaying() ){
            //   end_sound.play();
            //   end_sound.loop();
            //   theme2_sound.stop();
            // }
            textSize(60);
            switch (this.padcolor1) {
              case 1:
                fill(255, 20, 20); //red
                break;
              case 2:
                fill(255, 165, 20); //orange
                break;
              case 3:
                fill(255, 255, 0); //yellow
                break;
              case 4:
                fill(0, 228, 0); //green
                break;
              case 5:
                fill(20, 20, 255); //blue
                break;
              case 6:
                fill(90, 50, 150); //purple
                break;
              case 7:
                fill(238, 130, 238); //pink
                break;
              case 8:
                fill(225, 134, 129); //light brown
                break;
            }
            
            text('PLAYER 1 WINS!', 235, height / 2 + 10);
            textSize(30);
            fill(255);
            text('Press R to return to the main screen', 203, height / 2 + 70);
            text('Press R to return to the main screen', 203, height / 2 + 70);
            text('Press Y to rematch', 203, height / 2 + 100);
            this.game_bool = false;
            
            if ( y ){
              this.playerScoreReset();
              this.winner_bool = false;
              this.game_bool = true;
            }
            
            if ( r ) {
              this.playerScoreReset();
              this.main_bool = true;
              this.winner_bool = false;
            }
          }

          if (players.player2score == 3) {
            // if( ! end_sound.isPlaying() ){
            //   end_sound.play();
            //   end_sound.loop();
            //   theme2_sound.stop();
            // }
            textSize(60);
            switch (this.padcolor2) {
              case 1:
                fill(255, 20, 20); //red
                break;
              case 2:
                fill(255, 165, 20); //orange
                break;
              case 3:
                fill(255, 255, 0); //yellow
                break;
              case 4:
                fill(0, 228, 0); //green
                break;
              case 5:
                fill(20, 20, 255); //blue
                break;
              case 6:
                fill(90, 50, 150); //purple
                break;
              case 7:
                fill(238, 130, 238); //pink
                break;
              case 8:
                fill(225, 134, 129); //light brown
                break;
            }            
            text('PLAYER 2 WINS!', 235, height / 2 + 10);
            textSize(30);
            fill(255);
            text('Press R to return to the main screen', 203, height / 2 + 70);
            text('Press Y to rematch', 203, height / 2 + 100);
            this.game_bool = false;
            
            if ( y ){
              this.playerScoreReset();
              this.winner_bool = false;
              this.game_bool = true;              
            }
            if ( r ) {
              this.playerScoreReset();
              this.main_bool = true;
              this.winner_bool = false;
            }
          }
        }
      }
      
      this.chara = function(bool) {
        if (bool) {
          //  if(!char_sound.isPlaying()){
          //    theme1_sound.stop();
          // //   char_sound.play();
          // //   char_sound.loop();
          //  }
          background(0);
          textSize(50);
          text('Player 1', 134, 110);
          text('Player 2', 584, 110);
          textSize(20);
          text(' < p r e s s  L  k e y >', 564, 150);
          text(' < p r e s s  A  k e y >', 114, 150);
          textSize(30);
          text('If you get ready, press SPACEBAR', 230, 500);

          line(width / 2 + 8, 60, width / 2 + 8, height - 100);

          this.colorpicker1();
          this.colorpicker2();
          this.colorRect();

          if (keyCode == 32) {
            this.game_bool = true;
            this.winner_bool = false;
            this.chara_bool = false;
            this.playerScoreReset();
            return;
          }
        }
      }
    }

    this.colorRect = function() {
      let xSpacing = 0;
      let ySpacing = 0;

      for (let j = 0; j < 8; j++) { // draw 8 box
        for (let i = 0; i < 48; i++) { // draw 1 box
          switch (j) {
            case 0:
              stroke(255, 20, 20); //red
              break;
            case 1:
              stroke(255, 165, 20); //orange
              break;
            case 2:
              stroke(255, 255, 0); //yellow
              break;
            case 3:
              stroke(0, 228, 0); //green
              break;
            case 4:
              stroke(20, 20, 255); //blue
              break;
            case 5:
              stroke(90, 50, 150); //purple
              break;
            case 6:
              stroke(238, 130, 238); //pink
              break;
            case 7:
              stroke(225, 134, 129); //light brown
              break;
          }
          line(72 + i + xSpacing, 200 + ySpacing, 72 + i + xSpacing, 249 + ySpacing);
          line(542 + i + xSpacing, 200 + ySpacing, 542 + i + xSpacing, 249 + ySpacing);

          stroke(0, i * 2);
          line(542 + i + xSpacing, 200 + ySpacing, 542 + i + xSpacing, 249 + ySpacing);
          line(72 + i + xSpacing, 200 + ySpacing, 72 + i + xSpacing, 249 + ySpacing);
        }
        xSpacing += 83;
        if (j == 3) {
          xSpacing = 0;
          ySpacing += 100;
        }
      }
      xSpacing = 0;
      ySpacing = 0;
      stroke(255);
      fill(255);
    }

    this.colorpicker1X = 50;
    this.colorpicker1Y = 160;
    this.colorpicker2X = 520; //470 more than 1X
    this.colorpicker2Y = 160;
    this.tempAkey = false;
    this.tempLkey = false;
    this.counter1 = 1;
    this.counter2 = 1;
    this.padcolor2 = 1;
    this.padcolor1 = 1;

    this.colorpicker1 = function() {
      if (a != this.tempAkey) {
        this.tempAkey = a;
        this.counter1++;
        if (this.counter1 % 2 == 0) {
          this.colorpicker1X += 83;
          this.padcolor1++;
        }
        if (this.counter1 % 8 == 0) {
          this.colorpicker1X = 50;
          this.colorpicker1Y += 100;
        }
        if (this.counter1 % 16 == 0) {
          this.colorpicker1Y = 160;
        }
        if (this.padcolor1 == 9) {
          this.padcolor1 = 1;
        }
      }
      stroke(255);
      noFill();
      rect(10 + this.colorpicker1X, 30 + this.colorpicker1Y, 70, 70);
      fill(0);
      noStroke();
      rect(8 + this.colorpicker1X, 40 + this.colorpicker1Y, 80, 50);
      rect(20 + this.colorpicker1X, 28 + this.colorpicker1Y, 50, 80);
      fill(255);
      stroke(255);
    }

    this.colorpicker2 = function() {
      if (l != this.tempLkey) {
        this.tempLkey = l;
        this.counter2++;
        if (this.counter2 % 2 == 0) {
          this.colorpicker2X += 83;
          this.padcolor2++;
        }
        if (this.counter2 % 8 == 0) {
          this.colorpicker2X = 520;
          this.colorpicker2Y += 100;
        }
        if (this.counter2 % 16 == 0) {
          this.colorpicker2Y = 160;
        }
        if (this.padcolor2 == 9) {
          this.padcolor2 = 1;
        }
      }
      stroke(255);
      noFill();
      rect(10 + this.colorpicker2X, 30 + this.colorpicker2Y, 70, 70);
      fill(0);
      noStroke();
      rect(8 + this.colorpicker2X, 40 + this.colorpicker2Y, 80, 50);
      rect(20 + this.colorpicker2X, 28 + this.colorpicker2Y, 50, 80);
      fill(255);
      stroke(255);
    }


    this.scoreboard = function() {
      textSize(90);
      text(players.player1score, 349, 100);
      text(':', 450, 100);
      text(players.player2score, 520, 100);
    }
  }
}

//------------------game display function---------------


function displayGame(){
  if (page.game_bool) {    
    // if(!theme2_sound.isPlaying()){
    //   char_sound.stop();
    //   theme2_sound.play();
    //   theme2_sound.loop();
    // }
    page.tutorial();
    if(page.tutMotionCount > 4){
      ball.display();
      ball.update();
      ball.bounceCheck();
      players.outCheck();
    }
    noStroke();
    players.paddle_1();
    players.paddle_2();
  }
}


//------------------player class-------------------------

class Players{
  constructor(){
    this.padThick = 15;
    this.padLen = 100;
    this.padSpeed = 10;
    this.moveAmount_pad1 = 0;
    this.moveAmount_pad2 = 0;
    
    this.pad1Ypos = 220;
    this.pad1Xpos = 80;
    this.pad2Ypos = 220;
    this.pad2Xpos = 800;
    
    this.player1score = 0;
    this.player2score = 0;

    this.paddle_1 = function() {
      switch (page.padcolor1) {
        case 1:
          fill(255, 20, 20); //red
          break;
        case 2:
          fill(255, 165, 20); //orange
          break;
        case 3:
          fill(255, 255, 0); //yellow
          break;
        case 4:
          fill(0, 228, 0); //green
          break;
        case 5:
          fill(20, 20, 255); //blue
          break;
        case 6:
          fill(90, 50, 150); //purple
          break;
        case 7:
          fill(238, 130, 238); //pink
          break;
        case 8:
          fill(225, 134, 129); //light brown
          break;
      }

      if (a == true && q == false && this.pad1Ypos + this.padLen != height) {
        this.moveAmount_pad1 = this.padSpeed;
      } else if (q == true && a == false && this.pad1Ypos != 0) {
        this.moveAmount_pad1 = - this.padSpeed;
      } else {
        this.moveAmount_pad1 = 0;
      }

      this.pad1Ypos += this.moveAmount_pad1;
      noStroke();
      rect(this.pad1Xpos, this.pad1Ypos, this.padThick, this.padLen);
    }

    this.paddle_2 = function() {
      switch (page.padcolor2) {
        case 1:
          fill(255, 20, 20); //red
          break;
        case 2:
          fill(255, 165, 20); //orange
          break;
        case 3:
          fill(255, 255, 0); //yellow
          break;
        case 4:
          fill(0, 228, 0); //green
          break;
        case 5:
          fill(20, 20, 255); //blue
          break;
        case 6:
          fill(90, 50, 150); //purple
          break;
        case 7:
          fill(238, 130, 238); //pink
          break;
        case 8:
          fill(225, 134, 129); //light brown
          break;
      }

      if (l == true && p == false && this.pad2Ypos + this.padLen != height) {
        this.moveAmount_pad2 = this.padSpeed;
      } else if (p == true && l == false && this.pad2Ypos != 0) {
        this.moveAmount_pad2 = - this.padSpeed;
      } else {
        this.moveAmount_pad2 = 0;
      }

      noStroke();
      this.pad2Ypos += this.moveAmount_pad2;
      rect(this.pad2Xpos, this.pad2Ypos, this.padThick, this.padLen);
      fill(255);
      
      this.outCheck = function() {
      // player 2 win
      if (ball.pos.x < this.pad1Xpos + this.padThick && ball.pos.y < this.pad1Ypos || ball.pos.x < this.pad1Xpos + this.padThick && ball.pos.y > this.pad1Ypos + this.padLen) {
        this.player2score++;
        ball.pos = createVector(width / 2, height / 2);
        ball.vel = createVector(ball.cointoss(5), ball.cointoss(5));
      }
      // player 1 win
      else if (ball.pos.x > this.pad2Xpos && ball.pos.y < this.pad2Ypos || ball.pos.x > this.pad2Xpos && ball.pos.y > this.pad2Ypos + this.padLen) {
        this.player1score++;
        ball.pos = createVector(width / 2, height / 2);
        ball.vel = createVector(ball.cointoss(5), ball.cointoss(5));
        }
      }
    }
  }
}


//--------------------Ball class----------------------

class Ball {
  constructor(size) {
    noStroke();
    this.ballSize = size;
    this.ballHalf = this.ballSize / 2;
    this.minus_or_plus = 0; // half chance
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(5, 5);
    this.acc = createVector(1.07, 1.07);
    // this.acc = createVector(0, 0);

    // this.applyForce = function(force){
    //   this.vel.add(force);
    // }

    this.cointoss = function(number) {
      this.minus_or_plus = random(1) < 0.5 ? -1 : 1;
      return number * this.minus_or_plus;
    }

    this.update = function() {
      this.pos.add(this.vel);
      // this.acc.set(0, 0);
    }

    this.display = function() {
      fill(255);
      ellipse(this.pos.x, this.pos.y, this.ballSize, this.ballSize);
    }

    this.bounceCheck = function() {
      // touch wall
      if (this.pos.y > height - this.ballHalf) {
        this.vel.y *= -1;
        this.pos.y = height - this.ballHalf;
      } else if (this.pos.y < this.ballHalf) {
        this.vel.y *= -1;
        this.pos.y = 0 + this.ballHalf;
      } else if (this.pos.x > width - this.ballHalf) {
        this.vel.x *= -1;
        this.pos.x = width - this.ballHalf;
      } else if (this.pos.x < this.ballHalf) {
        this.vel.x *= -1;
        this.pos.x = this.ballHalf;
      }
      // touch paddle 1
      else if (this.pos.x <= players.pad1Xpos + players.padThick + this.ballHalf && this.pos.y >= players.pad1Ypos && this.pos.y <= players.pad1Ypos + players.padLen) {
        this.bounceAcc();
        this.vel.x *= -1;
        this.pos.x = players.pad1Xpos + players.padThick + this.ballHalf;
//         this.rand_18_pick = function(){
// //          ping_sound[int(random(0, 18))].play();
//         }
      }
      // touch paddle 2
      else if (this.pos.y >= players.pad2Ypos && this.pos.y <= players.pad2Ypos + players.padLen && this.pos.x >= players.pad2Xpos - this.ballHalf) {
        this.bounceAcc();
        this.vel.x *= -1;
        this.pos.x = players.pad2Xpos - this.ballHalf;
//         this.rand_18_pick = function(){
// //          ping_sound[int(random(0, 18))].play();
//         }
      }
    }
    
    this.bounceAcc = function(){
      this.vel.mult(this.acc);
    }
  }
}

//--------------------Pressed key check---------------------

function keyPressed() {
  if (keyCode == 65) { // a, A key true
    a = true;
  }
  if (keyCode == 81) {
    q = true;
  }
  if (keyCode == 76) {
    l = true;
  }
  if (keyCode == 80) {
    p = true;
  }
  if (keyCode == 82){
    r = true;
  }
  if (keyCode == 89){
    y = true;
  }
}

function keyReleased() {
  if (keyCode == 65) { // a, A key false
    a = false;
  }
  if (keyCode == 81) {
    q = false;
  }
  if (keyCode == 76) {
    l = false;
  }
  if (keyCode == 80) {
    p = false;
  }
  if (keyCode == 82) {
    r = false;
  }
  if (keyCode == 89) {
    y = false;
  }
}