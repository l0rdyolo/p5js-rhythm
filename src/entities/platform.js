class Platform {
  constructor(grid, startX, startY, startZ, gap) {
    this.grid = grid;  // 3x3 grid yapısı
    this.position = createVector(startX, startY, startZ);  // Platformun pozisyonu
    this.gap = gap;  
    this.collectables = [];
    this.obstacles = [];
    this.setup();
  }

  setup() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let xOffset = j * (this.gap + 15);  // X ekseni pozisyonu
        let zOffset = i * (this.gap + 15);  // Z ekseni pozisyonu
        if (this.grid[i][j] === 1) {
          let collectable = new Collectable(xOffset, 0, zOffset, GameConfig.platform.collectableSize , this);  
          this.collectables.push(collectable);
        } else if (this.grid[i][j] === 2) {
          let obstacle = new Obstacle(xOffset, 0, zOffset, GameConfig.platform.obstacleSize , this);  
          this.obstacles.push(obstacle);
        }
      }
    }
  }

  move(speed) {
    return;
    this.collectables.forEach(collectable => collectable.move(this.position));  
    this.obstacles.forEach(obstacle => obstacle.move(this.position)); 

    if (this.position.x < -800) {  // Ekrandan çıktıysa
      this.resetPosition();  // Platformu yeniden en arkaya gönder
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
    this.position.x = 3000;  // Platformu en arkaya taşır
  }
}
