var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");

//global variables
var meteors = []
var images  = {
    P1: "https://i.imgur.com/lDNOf2n.png",
    P2: "https://i.imgur.com/doHy8wW.png",
    bg: "https://i.imgur.com/k0bwZ5C.jpg",
    planet1:"https://i.imgur.com/XC0l2s5.png",
    planet2:"https://i.imgur.com/7CE0aiK.png",
    planet3:"https://i.imgur.com/usrB8Sj.png",
    meteor1:"https://img9.androidappsapk.co/300/1/4/7/com.Oriol.Casa.png"
}
var frames = 0
var startBTN = document.getElementById('start');
 var instructionsBTN = document.getElementById('instructions');
 var Logo = document.getElementById('logo');
 var instructionsMenu = document.getElementById('instructionsSection');
 var Instructions = document.getElementById('instrucciones')


canvas.width = 1000;
canvas.height = 800;


//classes
class Board{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = document.createElement('img')
        this.image.src = images.bg
        
        this.music = new Audio()
        this.music.src = "https://ericskiff.com/music/Resistor%20Anthems/05%20Come%20and%20Find%20Me.mp3"
    }
draw(){
  //velocidad del fondo
this.y+=0.4
if(this.y > this.height ) this.y = 0
  //primer fondo
ctx.drawImage(this.image,this.x,this.y,this.width,this.height)    
  //segundo fondo
 ctx.drawImage(this.image,this.x,this.y - this.height,this.width,this.height)      

}

}


class Planet1{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = document.createElement('img')
        this.image.src = images.planet1
        this.image.onload = () => {
            this.draw()
        }
    }
draw(){
  //velocidad del fondo
this.y+=0.8
if(this.y > this.height ) this.y = 0
  //primer fondo
ctx.drawImage(this.image,this.x,this.y,this.width,this.height)    
  //segundo fondo
 ctx.drawImage(this.image,this.x,this.y - this.height,this.width,this.height)      

}

}

class Planet2{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = document.createElement('img')
        this.image.src = images.planet2
        this.image.onload = () => {
            this.draw()
        }
    }
draw(){
  //velocidad del fondo
this.y+=1.2
if(this.y > this.height ) this.y = 0
  //primer fondo
ctx.drawImage(this.image,this.x,this.y,this.width,this.height)    
  //segundo fondo
 ctx.drawImage(this.image,this.x,this.y - this.height,this.width,this.height)      

}

}

class Planet3{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = document.createElement('img')
        this.image.src = images.planet3
        this.image.onload = () => {
            this.draw()
        }
    }
draw(){
  //velocidad del fondo
this.y+=1.9
if(this.y > this.height ) this.y = 0
  //primer fondo
ctx.drawImage(this.image,this.x,this.y,this.width,this.height)    
  //segundo fondo
 ctx.drawImage(this.image,this.x,this.y - this.height,this.width,this.height)      

}

}



class P1{
    constructor(){
        this.x = 600
        this.y = 485
        this.width = 34
        this.height = 60
        this.velY= 0
        this.velX= 0
        this.image = document.createElement('img')
        this.image.src = images.P1
        this.image.onload = () => {
             this.draw()
        }
        this.gravity = -4
        
    }

    draw(){
        if(this.y < canvas.height - 50) this.y += this.gravity
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    } 
       
}

class P2{
    constructor(){
        this.x = 655
        this.y = 485
        this.width = 34
        this.height = 60
        this.velY= 0
        this.velX= 0
        this.image = document.createElement('img')
        this.image.src = images.P2
        this.image.onload = () => {
             this.draw()
        }
       this.gravity = -4
        
    }

    draw(){
          
        if(this.y < canvas.height - 50) this.y += this.gravity
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    } 
       
}


class Meteors{
    constructor(x){
      this.x = x
      this.y = 740
      this.width = 100
      this.height = 100
      this.image = document.createElement('img')
      this.image.src = images.meteor1
      this.image.onload = () => {
        this.draw()
      }
      this.gravity = -5
    }
    
    draw(){
      this.y-=2
      if(this.y < canvas.height - 60) this.y += this.gravity
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    // checkCollition(player1){
    //           return  (this.x < player1.x + player1.width) &&
    //                   (this.x + this.width > player1.x) &&
    //                   (this.y < player1.y + player1.height) &&
    //                   (this.y + this.height > player1.y);
    //       }
  }



var x = 150,
    y = 150,
    velY = 0,
    velX = 0,
    speed = 5,
    friction = 0.98,
    keys = [];



var player1 = new P1()
var player2 = new P2()
var board = new Board()
var planet1 = new Planet1()
var planet2 = new Planet2()
var planet3 = new Planet3()

//var meteors = new Meteors()
    



function updatePlayer(player) {
    player.velY *= friction;
    player.y += player.velY;
    player.velX *= friction;
    player.x += player.velX;

    if (player.x >= 966) {
        player.x = 966;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    if (player.y > 740) {
        player.y = 740;
        //temporal top limit
    } else if (player.y <= 4) {
        player.y = 4;
    }

    ctx.fillStyle = player.draw()
    ctx.beginPath();
    //ctx.arc(player.x, player.y, 5, 0, Math.PI * 2);
    ctx.fill();
}

function updateBoard(board,planet1,planet2,planet3,meteors) {
    //board.draw()
    //ctx.beginPath();
    //ctx.fill();
}

function generateMeteors(){
    if(frames % 20 === 0){
     var x = Math.floor(Math.random()*(canvas.width-100))
     var M1 = new Meteors(x)
     meteors.push(M1)
     }
 }
 
 function drawMeteors(){
   meteors.forEach(function(Meteors){
     Meteors.draw()
   })
 }


function update() {

    //----------------------------
    frames++
    //ctx.clearRect(0,0,canvas.width,canvas.height)
    board.draw()
    planet1.draw()
    planet2.draw()
    planet3.draw()
    //meteoros
    generateMeteors()
    drawMeteors()
    // checkTopLimitP1()
    // checkTopLimitP2()
    // checkMeteorsCollitions()
    // checkMeteorsCollitions2()
    //board.music.play()
    //----------------------------
   
    if (keys[87]) {
        if (player1.velY > -speed) {
            player1.velY--;
        }
    }

    if (keys[83]) {
        if (player1.velY < speed) {
            player1.velY++;
        }
    }
    if (keys[68]) {
        if (player1.velX < speed) {
            player1.velX++;
        }
    }
    if (keys[65]) {
        if (player1.velX > -speed) {
            player1.velX--;
        }
    }

    if (keys[73]) {
        if (player2.velY > -speed) {
            player2.velY--;
        }
    }

    if (keys[75]) {
        if (player2.velY < speed) {
            player2.velY++;
        }
    }
    if (keys[76]) {
        if (player2.velX < speed) {
            player2.velX++;
        }
    }
    if (keys[74]) {
        if (player2.velX > -speed) {
            player2.velX--;
        }
    }

    //frames++
    // player1.draw()
    // player2.draw()
    //ctx.clearRect(0,0,canvas.width,canvas.height)

    
    updatePlayer(player1);
    updatePlayer(player2);
    //updateBoard(board);
    setTimeout(update, 10);
}


update();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

