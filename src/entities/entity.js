class Entity {
  constructor(position, config) {
    this.position = position;
    this.basePosition = this.position.copy();
    this.size = config.size;
    this.color = config.color;
    this.isCollected = false;
    this._active = true;
  }

  set active(value) {
    this._active = value;
  }

  get active() {
    return this._active;
  }

  move(speed) {
    this.position.z += speed;
  }

  checkCollision(other) {
    if (!this.isCollected) {
      if (p5.Vector.dist(this.position, other.position) < 10) {
        this.hit();
      }
    }
  }

  reset() {
    this.position.z = this.basePosition.z - 500;
    this.isCollected = false;
    this.active = true;
  }

  hit() {
    this.isCollected = true;
    this.active = false;
  }
}
