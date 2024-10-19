class Player {
  constructor(lanePositions, enableTrail = false) { // Enable trail with a default value
    this.lanePositions = lanePositions; 
    this.currentLane = 1; 
    this.x = this.lanePositions[this.currentLane]; 
    this.y = -60;
    this.z = 320;
    this.size = {x:10,y:10,z:20}
    this.targetX = this.x;
    this.trail = [];  
    this.trailLength = 20;  
    this.trailSpeed = 10;  
    this.lerpAmount = 0.1;  
    this.enableTrail = enableTrail; // Control for enabling/disabling trail

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

  // Function to draw the main trail
  drawTrail(trail, trailColor) {
    noFill();
    stroke(trailColor);  
    strokeWeight(5);  
    beginShape();
    for (let i = 0; i < trail.length; i++) {
      vertex(trail[i].x, trail[i].y, trail[i].z);  
    }
    endShape();
  }

  // Function to draw the offset trail with sine wave effect
  drawTrailWithSineWave(trail, trailColor, amplitude, frequency, waveOffset) {
    noFill();
    stroke(trailColor);
    strokeWeight(5);
    beginShape();
    for (let i = 0; i < trail.length; i++) {
      let waveY = amplitude * sin(frequency * i + waveOffset);  
      vertex(trail[i].x, trail[i].y + waveY, trail[i].z);
    }
    endShape();
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

  trailEnable(){
    //! delete this
        // Trail effect calculations only if trail is enabled
        if (this.enableTrail) {
          // Main trail of the player
          this.trail.push({ x: this.x, y: this.y, z: this.z });
    
          if (this.trail.length > this.trailLength) {
            this.trail.shift();  
          }
    
          // Offset trails behind the car
          for (let i = 0; i < this.offsetTrails.length; i++) {
            this.offsetTrails[i].trail.push({
              x: this.x + this.offsetTrails[i].offsetX,  
              y: this.y,
              z: this.z
            });
    
            if (this.offsetTrails[i].trail.length > this.trailLength) {
              this.offsetTrails[i].trail.shift();  
            }
          }
    
          // Move trails forward as the car moves
          for (let i = 0; i < this.trail.length; i++) {
            this.trail[i].z += this.trailSpeed;  
          }
    
          for (let i = 0; i < this.offsetTrails.length; i++) {
            for (let j = 0; j < this.offsetTrails[i].trail.length; j++) {
              this.offsetTrails[i].trail[j].z += this.trailSpeed;
            }
          }
    
          // Draw the main trail
          this.drawTrail(this.trail, color(255));
    
          // Draw the offset trails with sine wave effect
          for (let i = 0; i < this.offsetTrails.length; i++) {
            this.drawTrailWithSineWave(
              this.offsetTrails[i].trail, 
              color(150), 
              this.offsetTrails[i].amplitude, 
              this.offsetTrails[i].frequency, 
              this.offsetTrails[i].waveOffset
            );
          }
    
          // Update the wave offset for sine wave trail
          for (let i = 0; i < this.offsetTrails.length; i++) {
            this.offsetTrails[i].waveOffset += this.offsetTrails[i].frequency;  
          }
        }
    
  }
}
