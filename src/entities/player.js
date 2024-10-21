class Player {
  constructor(config, lanePositions) {
    this.lanePositions = lanePositions; 
    this.currentLane = 1; 
    this.position = createVector(this.lanePositions[this.currentLane] , 0 , -30)
    this.width = config.width;
    this.height = config.height;
    this.depth = config.depth;
    this.targetX = this.position.x; 
    this.lerpAmount = 0.1;  
    this.collideDistance = 4;  // Çarpışma hassasiyeti
  }

  draw() {
    this.position.x = lerp(this.position.x, this.targetX, this.lerpAmount); 
    this.drawCar();
  }

  drawCar() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    fill(250, 255, 250);
    noStroke();  
    box(this.width, this.height, this.depth);  
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

  collidesWith(entity) {
    let distance = dist(this.position.x, this.position.y, this.position.z, entity.position.x, entity.position.y, entity.position.z);
    return distance < this.collideDistance;  // Çarpışma kontrolü
  }

  checkCollisions(entities) {
    entities.forEach(entity => {
      if (this.collidesWith(entity) && !entity._isCollided) {
        entity.hit(); 
      }
    });
  }

  hit(entity) {
    console.log("Player hit an entity!");
  }
}
