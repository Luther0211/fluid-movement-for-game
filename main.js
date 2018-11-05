var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");


var meteors = []
var images  = {
    P1: "https://i.imgur.com/lDNOf2n.png",
    P2: "https://i.imgur.com/doHy8wW.png",
}
var frames

canvas.width = 1860;
canvas.height = 900;



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
        //this.gravity = -3.5
        
    }

    draw(){
        //if(this.y < canvas.height - 60) this.y += this.gravity
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
       // this.gravity = -3.5
        
    }

    draw(){
        //if(this.y < canvas.height - 60) this.y += this.gravity
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    } 
       
}


var x = 150,
    y = 150,
    velY = 0,
    velX = 0,
    speed = 2,
    friction = 0.98,
    keys = [];

var player1 = new P1()
var player2 = new P2()


function updatePlayer(player) {
    player.velY *= friction;
    player.y += player.velY;
    player.velX *= friction;
    player.x += player.velX;

    if (player.x >= 1855) {
        player.x = 1855;
    } else if (player.x <= 5) {
        player.x = 5;
    }

    if (player.y > 895) {
        player.y = 895;
    } else if (player.y <= 5) {
        player.y = 5;
    }

    ctx.fillStyle = player.draw()
    ctx.beginPath();
    //ctx.arc(player.x, player.y, 5, 0, Math.PI * 2);
    ctx.fill();
}


function update() {
   
    if (keys[38]) {
        if (player1.velY > -speed) {
            player1.velY--;
        }
    }

    if (keys[40]) {
        if (player1.velY < speed) {
            player1.velY++;
        }
    }
    if (keys[39]) {
        if (player1.velX < speed) {
            player1.velX++;
        }
    }
    if (keys[37]) {
        if (player1.velX > -speed) {
            player1.velX--;
        }
    }

    if (keys[87]) {
        if (player2.velY > -speed) {
            player2.velY--;
        }
    }

    if (keys[83]) {
        if (player2.velY < speed) {
            player2.velY++;
        }
    }
    if (keys[68]) {
        if (player2.velX < speed) {
            player2.velX++;
        }
    }
    if (keys[65]) {
        if (player2.velX > -speed) {
            player2.velX--;
        }
    }

    frames++
    // player1.draw()
    // player2.draw()
    ctx.clearRect(0,0,canvas.width,canvas.height)

    
    updatePlayer(player1);
    updatePlayer(player2);
    setTimeout(update, 10);
}



update();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});