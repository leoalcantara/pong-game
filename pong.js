var canvas;
var canvasContext;
var ballX = 50;
var ballY = 40;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 5;

var showingScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICNESS = 10;
const PADDLE_HEIGTH = 100;

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	console.log(mouseX, mouseY);
	return {
		x:mouseX,
		y:mouseY
	};
}

function handMouseClick(evt){
	if(showingScreen){	
		player1Score = 0;
		player2Score = 0;
		showingScreen = false;
	}
}

window.onload = function(){			
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');	
	
	var framesPerSecond = 30;			
	setInterval(function(){
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);

	canvas.addEventListener('mousedown', handMouseClick);

	canvas.addEventListener('mousemove', 
		function(evt){
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y-(PADDLE_HEIGTH/2);
		});
}	

function ballReset(){
	if (player1Score >= WINNING_SCORE ||
		player2Score >= WINNING_SCORE) {					
		showingScreen = true;
}

ballSpeedX = -ballSpeedX;
ballX = canvas.width/2;
ballY = canvas.height/2;
}

function computerMovement(){
	var paddle2yCenter = paddle2Y + (PADDLE_HEIGTH/2);
	if(paddle2yCenter < ballY-35){
		paddle2Y += 6;
	} else if(paddle2yCenter > ballY+35) {
		paddle2Y -= 6;
	}
}

function moveEverything(){
	if(showingScreen){
		return;
	}

	computerMovement();

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballX < 0){	
		if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGTH){
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (paddle1Y+PADDLE_HEIGTH/2);
			ballSpeedY = deltaY * 0.35;

		} else {	
			player2Score++;		
			ballReset();					
		}	
	}
	if (ballX > canvas.width){
		if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGTH){
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle2Y+PADDLE_HEIGTH/2);
			ballSpeedY = deltaY *0.35;
		} else {	
			player1Score++;		
			ballReset();				
		}	
	}
	if (ballY < 0){
		ballSpeedY = -ballSpeedY;
	}
	if (ballY > canvas.height){
		ballSpeedY = -ballSpeedY;
	}
}

function drawNet(){
	for (var i = 0; i < canvas.height; i+=40) {
		colorRect(canvas.width/2-1, i, 2, 25,'white');
	}
}

function drawEverything(){
			// next line blanks out the screen with black	
			colorRect(0,0,canvas.width, canvas.height,'black');	
			//canvasContext.font = "italic 40pt arial";
			canvasContext.font = " 75pt VT323";
			canvas.style.border = "5px solid #fff";

			if(showingScreen){				
				canvasContext.fillStyle = "white";
				
				if (player1Score >= WINNING_SCORE){
					canvasContext.font = " 45pt VT323";
					canvasContext.fillText("Você Ganhou!", canvas.width/4 +50, canvas.height /2 - 30);
				} else if (player2Score >= WINNING_SCORE) {
					canvasContext.font = " 45pt VT323";
					canvasContext.fillText("O Computador Ganhou!", canvas.width/4 -20 , canvas.height /2 - 30);
				}
				canvasContext.font = " 30pt VT323";
				canvasContext.fillText("Continuar...", canvas.width/4 + 100, canvas.height/2 + 30);
				return;
			}

			drawNet();

			//this is left player paddle
			colorRect(0, paddle1Y,PADDLE_THICNESS,100,'white');

			//this is rigth computer player paddle
			colorRect(canvas.width - 10, paddle2Y,PADDLE_THICNESS,100,'white');

			//next line draws the ball
			//colorRect(ballX,100,10,10,'red');
			colorCircle(ballX, ballY, 10, 'white')

			//Score
			canvasContext.fillText(player1Score, canvas.width /2 - 125, 100);
			canvasContext.fillText(player2Score, canvas.width /2  + 100, 100);
			
			
		}

function colorCircle(centerX, centerY, radius, drawColor){
			canvasContext.fillStyle = drawColor;
			canvasContext.beginPath();
			canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
			canvasContext.fill();
		}

function colorRect(leftX, topY, width, height, drawColor){
			canvasContext.fillStyle = drawColor;
			canvasContext.fillRect(leftX,topY, width, height);
		}

