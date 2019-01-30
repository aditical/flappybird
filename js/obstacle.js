class Obstacle{
    constructor(){      
        this.leftPos = 700;
        this.width = 70;
        this.minleftPos = 740;    
        this.mintopPos = 0;
        this.maxtopPos = 470;  
        this.velocity = 2; 
        this.maxHeight = 200;
        this.minHeight = 90; 
        this.y1 = 0;
        this.height1 = 0;   
        this.gap = 125;

    }
    obstacleInit(container, ball, startButton){ 
        this.startButton = startButton; 
        this.ball= ball;     
        this.container = container;
        this.topObstacleElement = document.createElement("div");       
        this.heightDiff = (this.maxHeight - this.minHeight);  
        let randomHeight = Math.floor(Math.random()*this.heightDiff + this.minHeight);
        this.y1 = randomHeight ;
        this.top1 = randomHeight + this.gap;
        this.height1 = this.maxtopPos - this.top1; 
        this.topObstacleElement.style.left = this.leftPos + 'px';
        this.topObstacleElement.style.top = this.mintopPos + 'px';
        this.topObstacleElement.style.height = randomHeight + 'px';
        this.topObstacleElement.style.width = this.width + 'px'
        this.topObstacleElement.style.position = "absolute";
        this.topObstacleElement.style.backgroundImage= "url(images/obstacle.png)";
        this.topObstacleElement.style.backgroundSize = "cover";    

        this.bottomObstacleElement = document.createElement("div");       

        this.bottomObstacleElement.style.left = this.leftPos + 'px';
        this.bottomObstacleElement.style.top = this.top1 + 'px';
        this.bottomObstacleElement.style.height = this.height1 + 'px';
        this.bottomObstacleElement.style.width = this.width + 'px'
        this.bottomObstacleElement.style.position = "absolute";
        this.bottomObstacleElement.style.backgroundImage= "url(images/obstacle.png)";
        this.bottomObstacleElement.style.backgroundSize = "cover";

        this.container.appendChild(this.topObstacleElement);
        this.container.appendChild(this.bottomObstacleElement); 

        this.moveObstacle = this.moveObstacle.bind(this);
        this.moveInterval = setInterval(this.moveObstacle, 20);
       // this.checkCollision = this.checkCollision.bind(this);
        //setInterval(this.checkCollision, 100); 
        //this.checkScore = this.checkScore.bind(this);
        //setInterval(this.checkScore, 100);
    }
    moveObstacle(){
        this.leftPos = this.leftPos - this.velocity;      
        this.topObstacleElement.style.left = this.leftPos + 'px';
        this.bottomObstacleElement.style.left = this.leftPos + 'px';   
        if(this.leftPos < 0 ) {
            this.topObstacleElement.remove(this.topObstacleElement);
            this.bottomObstacleElement.remove(this.bottomObstacleElement);
        }   
    } 
    stopObstacle(){
       clearInterval(this.moveInterval);
    }
 
    // checkScore(){

    //   if(this.ball.leftPos == this.leftPos){
    //     this.score ++
    //     console.log(this.score);  

    //   } 
    //   //console.log(score);

    // }
}

