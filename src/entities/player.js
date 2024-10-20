class Player {
  constructor(config, lanePositions) {
    this.lanePositions = lanePositions; 
    this.currentLane = 1; 
    this.x = this.lanePositions[this.currentLane]; 
    this.y = -10;
    this.z = 30;
    this.size = { x: 10, y: 10, z: 20 };  // Car body size (width, height, depth)
    this.targetX = this.x; 
    this.lerpAmount = 0.1;  // Smoothing factor for lane movement
  }

  draw() {
    this.x = lerp(this.x, this.targetX, this.lerpAmount);  // Smooth lane switching
    this.drawCar();
  }

  drawCar() {
    push();
    translate(this.x, this.y, this.z);
    rotateY(HALF_PI);  // Rotate the car model to face forward

    fill(15, 25, 20);
    noStroke();  
    box(this.size.x, this.size.y, this.size.z);  // Car body size

    pop();
  }

  // Move player between lanes
  move(direction) {
    if (direction === 'left' && this.currentLane > 0) {
      this.currentLane--;
    } else if (direction === 'right' && this.currentLane < this.lanePositions.length - 1) {
      this.currentLane++;
    }
    this.targetX = this.lanePositions[this.currentLane]; 
  }

  getBoundingBox() {
    return {
      minX: this.x - this.size.x / 2,
      maxX: this.x + this.size.x / 2,
      minY: this.y - this.size.y / 2,
      maxY: this.y + this.size.y / 2,
      minZ: this.z - this.size.z / 2,
      maxZ: this.z + this.size.z / 2
    };
  }

  checkCollision(target) {
    let playerBox = this.getBoundingBox();
    let targetBox = target.getBoundingBox();

    return !(
      playerBox.maxX < targetBox.minX ||
      playerBox.minX > targetBox.maxX ||
      playerBox.maxY < targetBox.minY ||
      playerBox.minY > targetBox.maxY ||
      playerBox.maxZ < targetBox.minZ ||
      playerBox.minZ > targetBox.maxZ
    );
  }
}
