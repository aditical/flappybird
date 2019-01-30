class Ball{
    constructor(container){
        this.ballElement = document.createElement("div");
        this.leftPos = 112;
        this.topPos = 200;
        this.yVelocity = 0;
        this.up = 3;         
        this.width= 60;
        this.height= 45 ; 
        this.upperGap = 0; 
        this.lowerGap = 427; 
        this.gravity = 0;       
        this.container = container;  
        this.ballElement.style.height =  this.height + 'px';
        this.ballElement.style.width = this.width + 'px';       
        this.ballElement.style.left = this.leftPos + 'px';        
        this.ballElement.style.top = this.topPos + 'px';   
        this.ballElement.style.position = "absolute";
        this.ballElement.style.transition= "transform 2s"; 
        this.ballElement.style.background ="url(images/bird.png)";
        this.ballElement.style.backgroundSize = "Cover"; 
        this.ballUp = this.ballUp.bind(this);
        this.ballDown = this.ballDown.bind(this);
        container.appendChild(this.ballElement);    

    }  
    ballUp(){      
        this.gravity = 0;  
        this.yVelocity = - this.up;
    }
    ballDown(){       
        this.gravity += 0.1;
        this.topPos += this.gravity + this.yVelocity; 
        this.ballElement.style.top = this.topPos + 'px';
        if(this.topPos <= this.upperGap ){
            this.yVelocity = -this.yVelocity; 
             game.gameOver();
      
        }
        if( this.topPos >= this.lowerGap ){
            this.ballElement.style.top = this.lowerGap + 'px';  
            game.gameOver();   
        }           
    }    
}


