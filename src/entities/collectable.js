class Collectable extends Collideable {
  constructor(xOffset, yOffset, zOffset, size, parent) {
    super(xOffset, yOffset, zOffset, size, parent);  
  }

  draw() {
    super.draw();
    push();
    translate(this.position.x, this.position.y, this.position.z);
    fill(255, 220, 0);  
    noStroke();
    sphere(this.size);  
    pop();
  }

  collide(player) {
    console.log("collec");
  }

}
