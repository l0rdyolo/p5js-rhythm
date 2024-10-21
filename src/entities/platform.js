class Platform {
  constructor(grid, startX, startY, startZ, gap, lanePositions) {
    this.grid = grid;
    this.position = createVector(startX, startY, startZ);
    this.gap = gap;
    this.lanePositions = lanePositions;
    this.collectables = [];
    this.obstacles = [];
    this.entites = [];
    this.isActive = true;
    this.resetPosition = -500;
    this.setup();
  }

  setup() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let zOffset = i * (this.gap + 15);
        let xLanePosition = this.lanePositions[j];
        if (this.grid[i][j] === 1) {
          let collectable = new Collectable(
            xLanePosition,
            0,
            zOffset,
            GameConfig.platform.collectableSize,
          );
          this.collectables.push(collectable);
          this.entites.push(collectable);
        } else if (this.grid[i][j] === 2) {
          let obstacle = new Obstacle(
            xLanePosition,
            0,
            zOffset,
            GameConfig.platform.obstacleSize,
          );
          this.obstacles.push(obstacle);
          this.entites.push(obstacle);
        }
      }
    }
  }
  
  update(speed , player) {
    this.entites.forEach(entity => {
      entity.move(speed)
      entity.checkCollision(player);
    });

  }

  move(speed) {
  }

  draw() {
    if (!this.isActive) return;
    push();
    translate(this.position.x, this.position.y, this.position.z);
    this.entites.forEach(entity => entity.draw());
    pop();
  }

  resetEntites() {
    this.entites.forEach(entity => {
      entity.reset();
    });
  }
}
