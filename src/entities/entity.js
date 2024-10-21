class Entity {
  constructor(position, size) {
    this.position = position;
    this.basePosition = this.position.copy();
    this.size = size;
    this.isCollected = false;
    this.active = true;
  }

  set active(value) {
    this._active = value;
  }

  get active() {
    return this._active;
  }

  move(speed) {
    this.position.z += speed;
    if (this.position.z > 2000) {
      this.reset();
    }
  }

  checkCollision(other) {
    if (!this.isCollected) {
      if (p5.Vector.dist(this.position, other.position) < 10) {
        this.hit();
      }
    }
  }

  reset() {
    this.position.z = this.basePosition.z;
    this._isCollided = false;
    this.active = true;
  }

  hit() {
    this.isCollected = true;
    this.active = false;
  }
}
