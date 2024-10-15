class Obstacle {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = 50; 
  }

  draw() {
    push();
    fill('red');
    noStroke();
    translate(this.x, this.y, this.z);
    box(this.size, this.size, this.size);  
    pop();
  }

  move(speed) {
    this.z += speed;  
  }

  resetPosition() {
    this.z = -3000;  
  }

  collidesWith(player) {
    let d = dist(this.x, this.y, this.z, player.x, player.y, player.z);
    return d < this.size; 
  }
}
