
class Collectable {
  constructor(xOffset, yOffset, zOffset, size, parent) {
    this.parent = parent;
    this.offset = createVector(xOffset, yOffset, zOffset);  // Platforma göre relatif pozisyon
    this.size = size;
    this.position = p5.Vector.add(this.offset, this.parent.position);
  }

  move(platformPos) {
    this.position = p5.Vector.add(this.offset, platformPos);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y, this.position.z);  // Collectable'ı güncel pozisyonuna göre çizer
    fill(255, 0, 0);
    noStroke();
    sphere(this.size);  // Collectable'ın şekli (küre)
    pop();
  }
}
