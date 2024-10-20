class Obstacle {
  constructor(xOffset, yOffset, zOffset, size, parent) {
    this.offset = createVector(xOffset, yOffset, zOffset);
    this.size = size;
    this.parent = parent;
    this.position = this.offset.add(this.parent.position);
  }

  move(platformPos) {
    this.position = p5.Vector.add(this.offset, platformPos);
  }

  getBoundingBox() {
    return {
      minX: this.position.x - this.size / 2,
      maxX: this.position.x + this.size / 2,
      minY: this.position.y - this.size / 2,
      maxY: this.position.y + this.size / 2,
      minZ: this.position.z - this.size / 2,
      maxZ: this.position.z + this.size / 2
    };
  }

  draw() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    fill(0, 255, 0);
    box(this.size, this.size, this.size);
    pop();
  }
}