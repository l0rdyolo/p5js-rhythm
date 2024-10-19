class Player {
  constructor(config) { // Enable trail with a default value
    this.lanePositions = config.lanePositions; 
    this.currentLane = 1; 
    this.x = config.lanePositions[this.currentLane]; 
    this.y = -10;
    this.z = 30;
    this.size = {x:10,y:10,z:20}
    this.targetX = this.x;
    this.trail = [];  
    this.trailLength = 20;  
    this.trailSpeed = 10;  
    this.lerpAmount = 0.1;  

    // Trail effects for the car
    this.offsetTrails = [
      { offsetX: -3, trail: [], amplitude: random(5, 7), frequency: random(0.02, 1), waveOffset: random(100) },  
      { offsetX: 3, trail: [], amplitude: random(5, 7), frequency: random(0.02, 1), waveOffset: random(100) },   
      { offsetX: -5, trail: [], amplitude: random(5, 7), frequency: random(0.02, 1), waveOffset: random(100) },  
      { offsetX: 5, trail: [], amplitude: random(5, 7), frequency: random(0.02, 1), waveOffset: random(100) }    
    ];
  }

  draw() {
    // Smooth movement for the player
    this.x = lerp(this.x, this.targetX, this.lerpAmount);
    this.drawCar();
  }

  drawCar() {
    push();
    translate(this.x, this.y, this.z);
    rotateY(HALF_PI);  // Rotate the car model to face forward

    // Car body
    fill(15, 25, 20);
    noStroke();  
    box(this.size.x,this.size.y,this.size.z);  // Car body size

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

  // Check collision with another object
  collidesWith(object) {
    let distance = dist(this.x, this.y, this.z, object.x, object.y, object.z);
    return distance < 50;  
  }

}
