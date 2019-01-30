class Background{
    constructor(backgroundElement){
        this.backgroundElement = backgroundElement;
        this.height = 500;
        this.width = 780;
        this.backgroundElement.style.height = this.height + 'px';
        this.backgroundElement.style.width = this.width + 'px';
        this.leftPosition = 0;
        this.topPosition = 0;
        this.velocity = 10;
        this.backgroundElement.style.leftPosition = this.leftPosition + 'px';
        this.backgroundElement.style.topPosition = this.topPosition + 'px';
        this.moveBackground = this.moveBackground.bind(this);
    }
    moveBackground(){
        this.leftPosition = this.leftPosition - this.velocity;         
        this.backgroundElement.style.backgroundPositionX = this.leftPosition + 'px';        
    }
}