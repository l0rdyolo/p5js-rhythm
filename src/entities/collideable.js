class Collideable {
  constructor(xOffset, yOffset, zOffset, size, parent) {
    this.parent = parent;
    this.offset = createVector(xOffset, yOffset, zOffset);  
    this.size = size;
    this.position = this.offset.copy().add(this.parent.position);  
    this._isCollided = false;
  }

  move(platformPos) {
    this.position = this.offset.copy().add(platformPos);  
  }


  draw() {
    if (this._isCollided) return;
  }

  collide() {
    this._isCollided = true;
  }

  reset() {
    this._isCollided = false;
  }
}
