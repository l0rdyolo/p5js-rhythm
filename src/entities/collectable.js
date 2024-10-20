class Collectable {
  constructor(xOffset, yOffset, zOffset, size , parent) {
    this.parent = parent;
    this.offset = createVector(xOffset, yOffset, zOffset);  // Platforma göre relatif pozisyon
    this.size = size;
    this.baseSize = size;  // Collectable'ın temel boyutu
    this.position = createVector(); 
    this.position = this.offset.add(this.parent.position)

  }

  move() {
    this.position.x = this.parent.position.x + this.offset.x;
    this.position.y = this.parent.position.y + this.offset.y;
    this.position.z = this.parent.position.z + this.offset.z;
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
