class Collectable {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  draw() {
    push();
    noStroke();
    fill('green');
    translate(this.x, this.y, this.z);
    sphere(25); // Collectable küre
    pop();
  }

  move(speed) {
    this.z += speed; // Oyuncuya doğru yaklaş
  }

  resetPosition() {
    this.z = -5000; // Ekranı geçince yeniden ileri konumlandır
  }
}