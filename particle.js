class ParticleEffect {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.particles = [];
    this.lifetime = 60; 
    
    
    for (let i = 0; i < 10; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        z: this.z,
        xSpeed: random(-1, 1),
        ySpeed: random(-1, 1),
        zSpeed: random(-1, 1)
      });
    }
  }

  update() {
    this.lifetime--;
    for (let p of this.particles) {
      p.x += p.xSpeed;
      p.y += p.ySpeed;
      p.z += p.zSpeed;
    }
  }

  draw() {
    return;
    push();
    fill(255, 255, 0, map(this.lifetime, 0, 60, 0, 255)); 
    for (let p of this.particles) {
      translate(p.x, p.y, p.z);
      sphere(5);
      translate(-p.x, -p.y, -p.z);
    }
    pop();
  }

  isFinished() {
    return this.lifetime <= 0; 
  }
}