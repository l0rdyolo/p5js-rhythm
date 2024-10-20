class Obstacle extends Collideable {
  constructor(xOffset, yOffset, zOffset, size, parent) {
    super(xOffset, yOffset, zOffset, size, parent); 
  }

  draw() {
    super.draw();
    push();
    translate(this.position.x, this.position.y, this.position.z);
    fill(0, 255, 0);  
    box(this.size, this.size, this.size); 
    pop();
  }

  collide(player) {
    console.log("obstacle");
  }
}
