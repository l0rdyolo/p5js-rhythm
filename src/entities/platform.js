class Platform {
  constructor(grid, startX, startY, startZ, gap, lanePositions) {
    this.grid = grid;  // 3x3 grid yapısı
    this.position = createVector(startX, startY, startZ);  // Platformun pozisyonu
    this.gap = gap;  
    this.lanePositions = lanePositions; // Lane pozisyonları
    this.collectables = [];
    this.obstacles = [];
    this.isActive = true;
    this.setup();
  }

  setup() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let zOffset = i * (this.gap + 15);  // Z ekseni pozisyonu
        let xLanePosition = this.lanePositions[j];  // X ekseni pozisyonu (lane'a göre)

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
    this.position.z += speed;  // Platformu hareket ettir
    this.collectables.forEach(collectable => collectable.move(this.position));  
    this.obstacles.forEach(obstacle => obstacle.move(this.position)); 

    if (this.position.z > 300) {  
      this.isActive = false;
      this.position.z = -1000;
    }
    else if(this.position.z > -1000){
      this.isActive = true;

    }
  }

  draw() {
    if(!this.isActive) return;
    push();
    translate(this.position.x, this.position.y, this.position.z);
    this.collectables.forEach(collectable => collectable.draw());
    this.obstacles.forEach(obstacle => obstacle.draw());
    pop();
  }

  resetPosition() {

  }
}


