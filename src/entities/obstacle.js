class Obstacle {
  constructor(xOffset, yOffset, zOffset, size) {
    this.offset = createVector(xOffset, yOffset, zOffset);  // Platforma göre relatif pozisyon
    this.size = size;
    this.position = createVector(0, 0, 0);  // Obstacle'ın güncel pozisyonu
  }

  move(platformPos) {
    // Obstacle pozisyonunu platformun pozisyonuna göre günceller
    this.position.x = platformPos.x + this.offset.x;
    this.position.y = platformPos.y + this.offset.y;
    this.position.z = platformPos.z + this.offset.z;
  }

  draw() {
    push();
    translate(this.position.x, this.position.y, this.position.z);  // Obstacle'ın pozisyonu
    fill(0, 255, 0);  // Rastgele bir renk örneği (yeşil)
    box(this.size, this.size, this.size);  // Obstacle'ı bir kutu olarak çiz
    pop();
  }
}
