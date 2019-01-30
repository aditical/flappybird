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
    moveBall(){   
        this.move = setInterval(this.ball.ballDown, 20) ;     
        this.gameElement.addEventListener('mousedown',  this.ball.ballUp);         
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

    gameLoop(startButton){
        this.buttonHeightmyMusic;        
        this.startButton = startButton;  
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
                this.ball.ballElement.style.background ="url(images/bb.png)";
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
        }    
}
let game = new Game();
var startButton = document.createElement("button");
startButton.style.height =  40 + 'px';
startButton.style.width = 100 + 'px';       
startButton.style.left = 350 + 'px';        
startButton.style.top = 250 + 'px';   
startButton.style.position = "absolute";
startButton.style.backgroundColor = "#efb300";
startButton.innerHTML = "START GAME";
startButton.style.fontWeight = "bold";
startButton.style.color = "black";
startButton.style.fontFamily ="monospace"; 
startButton.onclick = () => {
    startButton.style.display ="none";   
    game.moveBall();
    game.gameLoop(startButton);
}
game.gameElement.appendChild(startButton);



