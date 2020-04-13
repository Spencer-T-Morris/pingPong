var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 25;
var ballSpeedY = 4;
var paddel1Y = 250;
const paddelHeight = 100;
var paddel2Y = 250;
const paddelwidth = 20;
var player1Score = 0;
var player2Score = 0;
const winningScore = 3;
var winScreen = false;


function calcMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX -rect.left- root.scrollLeft;
    var mouseY = evt.clientY -rect.top- root.scrollTop;
    return {
        x: mouseX,
        y: mouseY,
    }
}
 function handleMouseClick(evt){
     if(winScreen){
         player2Score = 0
         player1Score = 0
         winScreen = false
     }
 }
window.onload = function(){
    this.console.log("window.onload is working")
    this.canvas = this.document.getElementById('gameCanvas');
    canvasContext = canvas.getContext("2d");
    //sets frames per second 
    var FPS = 30
    
    setInterval(
        function(){
            move(); 
            draw();
        }, 1000/FPS);
    canvas.addEventListener('mousedown', handleMouseClick);
    canvas.addEventListener('mousemove', 
        function(evt){
            var mousePos = calcMousePos(evt);
            paddel1Y= mousePos.y - (paddelHeight/2);
        }
    )
};
function ballReset(){
    if(player1Score >= winningScore || player2Score >= winningScore){
        winScreen = true;
    }

    ballSpeedX= -ballSpeedX;
    ballX =canvas.width/2;
    ballY = canvas.height/2;
}
function computerMove(){
    var paddel2YCenter = paddel2Y +(paddelHeight/2)
    if (paddel2YCenter < ballY -35){
        paddel2Y+= 5
    } else if (paddel2YCenter > ballY+35){
        paddel2Y-=5
    }
}
function move(){
    if(winScreen){
        return;
    }
    computerMove();
    ballX = ballX + ballSpeedX
    ballY = ballY + ballSpeedY
    if (ballX < 0){
        if(ballY>paddel1Y && ballY < paddel1Y+paddelHeight){
            ballSpeedX = -ballSpeedX
            var  deltaY = ballY
                -(paddel1Y+paddelHeight/2);
                ballSpeedY = deltaY * 0.35;
        } else {
            player2Score ++; // must be before ballrest();
            ballReset();
            
        }
    }
    if (ballX > canvas.width){
        if(ballY>paddel2Y && ballY < paddel2Y+paddelHeight){
            ballSpeedX = -ballSpeedX
            var  deltaY = ballY
                -(paddel2Y+paddelHeight/2);
                ballSpeedY = deltaY * 0.35;
        } else {
            player1Score ++; // must be before ballreset();
            ballReset();
            
        }
    }
    if(ballY < 0){
        ballSpeedY = -ballSpeedY
    }
    if( ballY > canvas.height){
        ballSpeedY = -ballSpeedY
    }
       // console.log(ballX, ballSpeedX)
}
function drawNet(){
    for( var i=0; i<canvas.height; i += 40){
        colorRect(canvas.width/2-1, i, 2,20, 'white');
    }
}
function draw(){
    //creates background 
    colorRect( 0,0, canvas.width, canvas.height, 'black');
    
    if(winScreen){
        canvasContext.fillStyle ='white';
        if (player1Score >= winningScore){
            canvasContext.fillText("player 1 wins", 350, 200);
        } else if (player2Score >= winningScore){
            canvasContext.fillText("player 2 wins", 350, 200);
        }
        
        canvasContext.fillText("click to continue", 350, 500);
        return;
    }
    drawNet();
    //draws first rectangle
    colorRect(0,paddel1Y, paddelwidth, paddelHeight, 'white');
    //draws second paddel
    colorRect(canvas.width - paddelwidth, paddel2Y, paddelwidth, paddelHeight, 'white');
    //draws ball
    colorCircle(ballX, ballY, 10, 'white');
    //
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width-100, 100 )
};
function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}
function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle =  drawColor;
    canvasContext.fillRect(leftX, topY, width, height)
}