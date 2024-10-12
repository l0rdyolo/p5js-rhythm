class Player {
  constructor() {
    this.lanePositions = [-150, 0, 150]; 
    this.currentLane = 1; 
    this.x = this.lanePositions[this.currentLane]; 
    this.y = 0;
    this.z = 200;
    this.targetX = this.x;
    this.trail = []; 
    this.fakeSpeed = 5; 
  }

  draw() {
    this.x = lerp(this.x, this.targetX, 0.1);

    for (let i = 0; i < this.trail.length; i++) {
      this.trail[i].z += this.fakeSpeed; 
      this.trail[i].alpha -= 5; 
    }

    this.trail = this.trail.filter(trailPart => trailPart.alpha > 0);

    this.trail.push({ x: this.x, y: this.y, z: this.z, alpha: 255 }); 

    for (let i = 0; i < this.trail.length; i++) {
      let trailPart = this.trail[i];

      fill(100, 100, 255, trailPart.alpha);

      push();
      noStroke();
      translate(trailPart.x, trailPart.y, trailPart.z);
      sphere(20); 
      pop();
    }

    push();
    fill('blue');
    noStroke();
    translate(this.x, this.y, this.z); 
    sphere(22);
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
  
  collidesWith(object) {
    let distance = dist(this.x, this.y, this.z, object.x, object.y, object.z);
    return distance < 50; 
  }
}
