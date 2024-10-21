class Collectable extends Entity {
  constructor(xOffset, yOffset, zOffset, size, parent) {
    super(xOffset, yOffset, zOffset, size, parent);  
  }

  draw(){
    if(!this.active) return;
    push();
    translate(this.position.x, 0, this.position.z);
    fill(0, 255, 0);
    box(this.size, this.size, this.size);
    pop();
  }

  hit(){
    super.hit();
    console.log("obstacle");
  }
}
