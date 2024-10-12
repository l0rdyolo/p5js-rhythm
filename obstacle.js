
class Obstacle {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  draw() {
    push();
    fill('red');
    noStroke();
    translate(this.x, this.y, this.z);
    rotateX(PI);
    cone(50, 100);
    pop();
  }

  move(speed) {
    this.z += speed; 
  }

  resetPosition() {
    this.z = -5000;
  }
}