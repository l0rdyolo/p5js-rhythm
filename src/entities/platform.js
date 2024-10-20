class Platform {
  constructor(grid, startX, startY, startZ, gap, lanePositions) {
    this.grid = grid;  
    this.position = createVector(startX, startY, startZ); 
    this.gap = gap;  
    this.lanePositions = lanePositions; 
    this.collectables = [];
    this.obstacles = [];
    this.isActive = true;
    this.resetPosition = -1000;
    this.setup();
  }

  setup() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let zOffset = i * (this.gap + 15);  
        let xLanePosition = this.lanePositions[j];  
        if (this.grid[i][j] === 1) {
          let collectable = new Collectable(xLanePosition, 0, zOffset, GameConfig.platform.collectableSize, this);  
          this.collectables.push(collectable);
        } else if (this.grid[i][j] === 2) {
          let obstacle = new Obstacle(xLanePosition, 0, zOffset, GameConfig.platform.obstacleSize, this);  
          this.obstacles.push(obstacle);
        }
      }
    }
  }

  move(speed) {
    this.position.z += speed; 
    this.collectables.forEach(collectable => collectable.move(this.position));  
    this.obstacles.forEach(obstacle => obstacle.move(this.position));  
    if (this.position.z > 300) {  
      this.isActive= false;
      this.position.z = this.resetPosition;
    }
    else if(this.position.z > this.resetPosition - 50){
      this.isActive = true;
    }
  }

  draw() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    this.collectables.forEach(collectable => collectable.draw());  
    this.obstacles.forEach(obstacle => obstacle.draw());  
    pop();
  }

  checkCollisions(player) {
    this.collectables.forEach(collectable => {
      if (collectable && player.checkCollision(collectable)) {
        collectable.collide(player);  
      }
    });

    this.obstacles.forEach(obstacle => {
      if (obstacle && player.checkCollision(obstacle)) {
        obstacle.collide(player);  
      }
    });
  }
}
