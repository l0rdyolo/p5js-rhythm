class Obstacle {
  constructor(xOffset, yOffset, zOffset, size, parent) {
    this.offset = createVector(xOffset, yOffset, zOffset);  // Platforma göre relatif pozisyon
    this.size = size;
    this.parent = parent;
    this.position = p5.Vector.add(this.offset, this.parent.position);
  }
  
  move(platformPos) {
    this.position = p5.Vector.add(this.offset, platformPos);
  }
  
  draw() {
    push();
    translate(this.position.x, this.position.y, this.position.z);  // Obstacle'ın pozisyonu
    fill(0, 255, 0);
    box(this.size, this.size, this.size);  // Obstacle'ı kutu olarak çiz
    pop();
  }
}
