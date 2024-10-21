class Platform {
  constructor(grid, gap, startZ ,lanePositions) {
    this.grid = grid;
    this.gap = gap;
    this.lanePositions = lanePositions;
    this.collectables = [];
    this.obstacles = [];
    this.entities = [];
    this.imposter = undefined;
    this.startZ = startZ; 
    this.setup();
  }

  setup() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let zOffset = i * (this.gap + 15) + this.startZ;
        let xLanePosition = this.lanePositions[j];
        let position = createVector(xLanePosition, 0, zOffset);
        if (this.grid[i][j] === 1) {
          let collectable = new Collectable(position, GameConfig.collectable);
          this.collectables.push(collectable);
          this.entities.push(collectable);
        } else if (this.grid[i][j] === 2) {
          let obstacle = new Obstacle(position, GameConfig.obstacle);
          this.obstacles.push(obstacle);
          this.entities.push(obstacle);
        }
  
        if (i === 0 && j === 0) {
          this.imposter = new Collectable(position, GameConfig.collectable);
          this.imposter.active = false;
          this.entities.push(this.imposter);
        }
      }
    }
  }
  

  update(speed, player) {
    this.entities.forEach(entity => {
        entity.move(speed); 
        entity.checkCollision(player);
    });
    if (this.imposter && this.imposter.position.z > 100) {
      this.resetEntities();  // Reset all entities
    }
    
  }

  draw() {
    push();
    this.entities.forEach(entity => {
      if (entity.active) {
        entity.draw(); 
      }
    });
    pop();
  }

  resetEntities() {
    this.entities.forEach(entity => {
      entity.reset(); 
    });

    this.imposter.active = false;
    this.imposter.isCollected = true; 
  }


}
