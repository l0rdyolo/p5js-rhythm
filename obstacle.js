
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
    cone(50, 100); // Obstacle konisi
    pop();
  }

  move(speed) {
    this.z += speed; // Oyuncuya doğru yaklaş
  }

  resetPosition() {
    this.z = -5000; // Ekranı geçince yeniden ileri konumlandır
  }
}