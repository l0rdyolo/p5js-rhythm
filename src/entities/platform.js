class Platform {
  constructor(grid, startX, startY, startZ, gap, lanePositions) {
    this.grid = grid;  
    this.position = createVector(startX, startY, startZ);  
    this.gap = gap;  
    this.lanePositions = lanePositions;
    this.collectables = [];
    this.obstacles = [];
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
      this.resetPosition();
    }
  }

  draw() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    this.collectables.forEach(collectable => collectable.draw());
    this.obstacles.forEach(obstacle => obstacle.draw());
    pop();
  }

  resetPosition() {
    this.position.z = -1200;
  }

  // Check collisions with player
  checkCollisions(player) {
    // Check collectables
    this.collectables.forEach(collectable => {
      if (collectable && player.checkCollision(collectable)) {
        console.log('Speed up!');
        // Handle the collectable collision (e.g., increase speed)
      }
    });

    // Check obstacles
    this.obstacles.forEach(obstacle => {
      if (obstacle && player.checkCollision(obstacle)) {
        console.log('Speed down!');
        // Handle the obstacle collision (e.g., decrease speed)
      }
    });
  }
}
