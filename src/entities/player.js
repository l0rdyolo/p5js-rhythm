class Player {
  constructor(config, lanePositions) {
    this.lanePositions = lanePositions; 
    this.currentLane = 1; 
    this.x = this.lanePositions[this.currentLane]; 
    this.y = -10;
    this.z = 30;
    this.size = { x: 10, y: 10, z: 20 };  
    this.targetX = this.x; 
    this.lerpAmount = 0.1;  
  }

  draw() {
    this.x = lerp(this.x, this.targetX, this.lerpAmount); 
    this.drawCar();
  }

  drawCar() {
    push();
    translate(this.x, this.y, this.z);
    fill(15, 25, 20);
    noStroke();  
    box(this.size.x, this.size.y, this.size.z);  
    pop();
  }

  move(direction) {
    if (direction === 'left' && this.currentLane > 0) {
      this.currentLane--;
    } else if (direction === 'right' && this.currentLane < this.lanePositions.length - 1) {
      this.currentLane++;
    }
    this.targetX = this.lanePositions[this.currentLane]; 
  }
}
