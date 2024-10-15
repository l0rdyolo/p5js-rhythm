class Collectable {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = 30; // Collectable boyutu
  }

  draw() {
    push();
    fill('yellow');
    noStroke();
    translate(this.x, this.y, this.z);
    sphere(this.size);  // Küre şeklinde toplanabilir nesne
    pop();
  }

  move(speed) {
    this.z += speed;  // Z ekseninde oyuncuya doğru hareket eder
  }

  resetPosition() {
    this.z = -1000;  // Nesne ekran dışına çıktığında yeniden pozisyonlanır
  }

  collidesWith(player) {
    let d = dist(this.x, this.y, this.z, player.x, player.y, player.z);
    return d < this.size;  // Çarpışma kontrolü
  }
}
