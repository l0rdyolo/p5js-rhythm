class Obstacle {
  constructor(xOffset, yOffset, zOffset, size) {
    this.offset = createVector(xOffset, yOffset, zOffset);  // Platforma göre relatif pozisyon
    this.size = size;
  }

  move(platformX) {
    // Obstacle pozisyonunu platformun pozisyonuna göre günceller
    this.x = platformX + this.offset.x;
  }

  draw(platformPos) {
    push();
    translate(platformPos.x + this.offset.x, platformPos.y + this.offset.y, platformPos.z + this.offset.z);
    fill(0, 255, 0);  // Rastgele bir renk örneği
    box(this.size, this.size, this.size);  // Obstacle'ı bir kutu olarak çiz
    pop();
  }
}
