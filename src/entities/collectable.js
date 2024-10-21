class Collectable extends Entity {
  constructor(position,config) {
    super(position,config); 
  }


  draw(){
    push();
    translate(this.position.x, 0, this.position.z);
    if(this.active){
      fill(this.color);
      box(this.size, this.size, this.size);
    }
    pop();
  }

  hit(){
    super.hit();
    if(gameSpeed<MAX_SPEED){
      gameSpeed++;
    }
  }
}
