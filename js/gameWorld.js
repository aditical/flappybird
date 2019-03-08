class Game{
	constructor(){
		this.gameElement = document.getElementsByClassName("container")[0];  
		this.height = 500;
		this.width = 900;
		this.gameElement.style.height = this.height + 'px';
		this.gameElement.style.width = this.width + 'px'; 
		this.velocity = 1; 
		this.buttonHeight = 40; 
		this.buttonWidth = 100; 
		this.buttonLeft = 400;
		this.buttonTop = 250;   
		this.obstacles = []; 
		this.initialization();
		this.isGameOver = false;
		this.ballUp = this.ballUp.bind(this);
		this.ballDown = this.ballDown.bind(this);
		this.scoreCard = document.createElement('h1');
		this.scoreCard.style.position = "absolute";
		this.scoreCard.style.left = 700 + 'px';     
		this.scoreCard.style.top = 10 + 'px'; 
		this.scoreCard.style.zIndex = "2";
		this.scoreCard.style.color = "#095864";
		this.scoreCard.style.fontFamily =" Verdana";
		this.scoreCard.style.fontSize = 50 + 'px';
		this.gameElement.appendChild(this.scoreCard);
		this.myMusic = new sound("sounds/mymus.mp3");
		this.scoreMusic = new sound("sounds/score.mp3");  
		this.gameOverMusic = new sound("sounds/gameo.mp3"); 
		 
	}
	initialization(){       
		this.ball = new Ball(this.gameElement);   
		this.backgroundElement = document.getElementsByClassName("background")[0];
		this.background = new Background(this.backgroundElement);
	 }  
	ballUp(){   
		this.ball.gravity = 0;  
		this.ball.yVelocity = - this.ball.up;
	}
	ballDown(){    
		this.ball.gravity += 0.1;
		this.ball.topPos += this.ball.gravity + this.ball.yVelocity; 
		this.ball.ballElement.style.top = this.ball.topPos + 'px';
		if(this.ball.topPos <= this.ball.upperGap ){
			this.ball.yVelocity = -this.ball.yVelocity; 
			 this.gameOver();
	  
		}
		if( this.ball.topPos >= this.ball.lowerGap ){
			this.ball.ballElement.style.top = this.ball.lowerGap + 'px';  
			this.gameOver();   
		}           
	}       
	moveBall(){   
		this.move = setInterval(this.ballDown, 20) ;     
		this.gameElement.addEventListener('mousedown',  this.ballUp);         
	  //  console.log(this.ball.leftPos );        
	} 
	checkCollision(ball, obstacle){
		if(ball.leftPos + ball.width  > obstacle.leftPos && ball.leftPos < obstacle.leftPos + obstacle.width) {
		   if(ball.topPos <= obstacle.mintopPos + obstacle.y1 || ball.topPos + ball.height > obstacle.top1){               
			this.ball.ballElement.style.zIndex = "2"; 
			this.gameOver();
		   }                            
		}                   
	}

	gameLoop(restart){
		this.restart = restart
		this.buttonHeightmyMusic;        
		let highscore = 0   
		let score = 0;         
		this.moveBackgorund = setInterval (this.background.moveBackground, 30) ;
		var that = this;  
		this.obstacleInterval = setInterval (() => {
			this.obstacle = new Obstacle();                   
			this.obstacle.obstacleInit(that.gameElement, that.ball); 
			this.obstacles.push(this.obstacle);                       
		}, 3000);  
		this.gameInterval = setInterval(()=> {
			this.myMusic.play();
			this.scoreCard.innerHTML =  + score;
			for(let i =0 ; i < this.obstacles.length; i++){
			 this.checkCollision(this.ball, this.obstacles[i]); 
			// console.log(this.ball.leftPos , this.obstacles[i].leftPos)
			 if(this.ball.leftPos == this.obstacles[i].leftPos){
				 score++;
				 this.scoreMusic.play();
			 }           
			}
			if(highscore <= score){
				highscore = score;
				localStorage.setItem('highscore' , JSON.stringify(highscore)); 
			}
			if(score == 10){
				this.ball.ballElement.style.background ="url(images/blue.png)";
				this.ball.ballElement.style.backgroundSize = "Cover"; 
			} else if (score == 20){
				this.ball.ballElement.style.background ="url(images/green.png)";
				this.ball.ballElement.style.backgroundSize = "Cover"; 
			} else if(score >= 30) {
				this.ball.ballElement.style.background ="url(images/pink.png)";
				this.ball.ballElement.style.backgroundSize = "Cover"; 
			}
		}, 100) ;
	   }         
	   gameOver(){             
		   this.myMusic.stop(); 
		   this.gameElement.removeEventListener('mousedown',  this.ball.ballUp); 
		   clearInterval(this.moveBackgorund);
		   clearInterval(this.obstacleInterval);
		   clearInterval(this.gameInterval);
		   this.gameOverText  = document.createElement('h1');  
		   this.gameOverText.style.position = "absolute"; 
		   this.gameOverText.style.fontWeight = "bold";
		   this.gameOverText.style.color = "#095864";
		   this.gameOverText.style.fontFamily ="Verdana";            
		   this.gameOverText.style.fontSize = 40 + 'px';
		   this.gameOverText.style.left = 290 + 'px';     
		   this.gameOverText.style.top = 150 + 'px';
		   this.gameOverText.innerHTML = "GAME OVER";
		   this.gameElement.appendChild(this.gameOverText);
		   this.gameOverMusic.play();
		   //this.startButton.style.display = "block";
		   for(let i= 0; i < this.obstacles.length ; i++){
			this.obstacles[i].stopObstacle();
		   }        
		   this.restart.style.display = "block";    
	}    
}
let game = new Game();
var startButton = document.createElement("button");
var restartButton = document.createElement("button");
restartButton.style.height =  40 + 'px';
restartButton.style.width = 100 + 'px';       
restartButton.style.left = 370 + 'px';        
restartButton.style.top = 250 + 'px';   
restartButton.style.position = "absolute";
restartButton.style.backgroundColor = "#efb300";
restartButton.innerHTML = "RESTART";
restartButton.style.fontWeight = "bold";
restartButton.style.color = "black";
restartButton.style.zIndex = '1';
restartButton.style.fontFamily ="monospace"; 
restartButton.onclick = () => {
	window.location.reload();       
}
game.gameElement.appendChild(restartButton);
restartButton.style.display = "none";
var instructionButton = document.createElement("button");
startButton.style.height =  40 + 'px';
startButton.style.width = 100 + 'px';       
startButton.style.left = 350 + 'px';        
startButton.style.top = 180 + 'px';   
startButton.style.position = "absolute";
startButton.style.backgroundColor = "#efb300";
startButton.innerHTML = "START GAME";
startButton.style.fontWeight = "bold";
startButton.style.color = "black";
startButton.style.fontFamily ="monospace"; 
startButton.onclick = () => {
	startButton.style.display ="none";   
	instructionButton.style.display= "none";  
	game.moveBall();
	game.gameLoop(restartButton);
}
game.gameElement.appendChild(startButton);
instructionButton.style.height =  40 + 'px';
instructionButton.style.width = 100 + 'px';       
instructionButton.style.left = 350 + 'px';        
instructionButton.style.top = 230 + 'px';   
instructionButton.style.position = "absolute";
instructionButton.style.backgroundColor = "#efb300";
instructionButton.innerHTML = "INSTRUCTION";
instructionButton.style.fontWeight = "bold";
instructionButton.style.color = "black";
instructionButton.style.fontFamily ="monospace"; 
game.gameElement.appendChild(instructionButton);



var backButton = document.createElement("button");
backButton.style.height = 40 + 'px';
backButton.style.width = 100 + 'px';
backButton.style.left = 350 + 'px';
backButton.style.top = 320 + 'px';
backButton.style.position = "absolute";
backButton.style.backgroundColor = "#efb300";
backButton.innerHTML = "BACK";
backButton.style.fontWeight = "bold";
backButton.style.color = "black";
backButton.style.fontFamily ="monospace"; 

var instruction = document.createElement("div");
instruction.style.border = "solid";
instruction.style.height = 160 + 'px';
instruction.style.width= 150 + 'px';
instruction.style.left = 320 + 'px'; 
instruction.style.top = 150 + 'px';   
instruction.style.position = "absolute";
instruction.style.backgroundColor = "#efb300";
instruction.innerHTML = "CLICK ON THE SCREEN TO GET STARTED. FLY THE BIRD AS FAR AS YOU CAN WITHOUT HITTING THE PIPE.";
instruction.style.textAlign= "center";
instruction.style.fontWeight = "bold";
instruction.style.fontStyle = "italic";
instruction.style.fontSize = 17 + 'px';
instruction.style.color = "black";
instruction.style.fontFamily ="monospace"; 
instructionButton.onclick = () => {
	startButton.style.display ="none";  
	instructionButton.style.display= "none";  
	instruction.style.display ="block";
	backButton.style.display= "block";
	game.gameElement.appendChild(instruction);
	game.gameElement.appendChild(backButton);
}
backButton.onclick = () => {
	startButton.style.display ="block";  
	instructionButton.style.display= "block"; 
	instruction.style.display = "none";
	backButton.style.display= "none";
}



































// var soundButton = document.createElement("button");
// soundButton.style.height =  40 + 'px';
// soundButton.style.width = 100 + 'px';       
// soundButton.style.left = 350 + 'px';        
// soundButton.style.top = 280 + 'px';   
// soundButton.style.position = "absolute";
// soundButton.style.backgroundColor = "#efb300";
// soundButton.style.fontWeight = "bold";
// soundButton.innerHTML = "Sound : ON"
// soundButton.style.color = "black";
// soundButton.style.fontFamily ="monospace"; 
// var isSoundOn = true ; 
// soundButton.onclick = () => { 
//     startButton.style.display ="block";  
//     instructionButton.style.display= "block"; 
//     isSoundOn = !isSoundOn;   
//     isSoundOn ? soundButton.innerHTML = "Sound : ON"  : soundButton.innerHTML = "Sound : OFF" ; 
//     isSoundOn ? game.myMusic.play() : game.myMusic.stop();
// }
// game.gameElement.appendChild(soundButton);


