class Collectable extends Collideable {
  constructor(xOffset, yOffset, zOffset, size, parent) {
    super(xOffset, yOffset, zOffset, size, parent);  
  }

  draw() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    fill(255, 0, 0);  
    noStroke();
    sphere(this.size);  
    pop();
  }

  collide(player) {
    if (super.isCollide(player) && !this._isCollided) {
      super.collide();
      return true;
    }
    return false;
  }
}
