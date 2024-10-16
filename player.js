class Player {
  constructor() {
    this.lanePositions = [-150, 0, 150]; 
    this.currentLane = 1; 
    this.x = this.lanePositions[this.currentLane]; 
    this.y = 0;
    this.z = 200;
    this.targetX = this.x;
    this.trail = [];  
    this.trailLength = 20;  
    this.trailSpeed = 10;  
    this.lerpAmount = 0.1;  

    this.offsetTrails = [
      { offsetX: -5, trail: [], amplitude: random(5, 12), frequency: random(0.02, 1), waveOffset: random(100) },  // Sol arka çizgi
      { offsetX: 5, trail: [], amplitude: random(5, 12), frequency: random(0.02, 1), waveOffset: random(100) },   // Sağ arka çizgi
      { offsetX: -10, trail: [], amplitude: random(5, 12), frequency: random(0.02, 1), waveOffset: random(100) },  // Daha geniş sol arka çizgi
      { offsetX: 10, trail: [], amplitude: random(5, 12), frequency: random(0.02, 1), waveOffset: random(100) }    // Daha geniş sağ arka çizgi
    ];
  }

  draw() {
    this.x = lerp(this.x, this.targetX, this.lerpAmount);

    this.trail.push({ x: this.x, y: this.y, z: this.z });

    if (this.trail.length > this.trailLength) {
      this.trail.shift();  
    }

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

    for (let i = 0; i < this.trail.length; i++) {
      this.trail[i].z += this.trailSpeed;  
    }

    for (let i = 0; i < this.offsetTrails.length; i++) {
      for (let j = 0; j < this.offsetTrails[i].trail.length; j++) {
        this.offsetTrails[i].trail[j].z += this.trailSpeed;
      }
    }

    this.drawTrail(this.trail, color(255));

    for (let i = 0; i < this.offsetTrails.length; i++) {
      this.drawTrailWithSineWave(
        this.offsetTrails[i].trail, 
        color(150), 
        this.offsetTrails[i].amplitude, 
        this.offsetTrails[i].frequency, 
        this.offsetTrails[i].waveOffset
      );
    }

    this.drawCar();

    for (let i = 0; i < this.offsetTrails.length; i++) {
      this.offsetTrails[i].waveOffset += this.offsetTrails[i].frequency;  
    }
  }

  drawCar() {
    push();
    translate(this.x, this.y, this.z);
    rotateY(HALF_PI);  

    // Araba gövdesi (büyütüldü)
    fill(255, 0, 0);
    noStroke();  
    box(80, 30, 40);  // Araba gövdesi büyütüldü
    
    // Tekerlekler (küreler büyütüldü)
    fill(0);
    noStroke();  
    translate(-25, 15, -20);  
    sphere(15);  // Sol ön tekerlek büyütüldü

    translate(50, 0, 0);  
    sphere(15);  // Sağ ön tekerlek büyütüldü

    translate(0, 0, 40);  
    sphere(15);  // Sağ arka tekerlek büyütüldü

    translate(-50, 0, 0);  
    sphere(15);  // Sol arka tekerlek büyütüldü

    pop();
  }

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
