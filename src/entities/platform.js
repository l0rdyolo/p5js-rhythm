class Platform {
  constructor(config) {
    this.position = createVector(
      config.startX,
      config.startY,
      config.startZ
    ); // Platformun merkezi pozisyonu
    this.gap = config.gap;  // Aradaki boşluk
    this.collectableSize = config.collectableSize;
    this.obstacleSize = config.obstacleSize;
    this.collectables = [];
    this.obstacles = [];
    this.grid = config.grid;  // Matris şeklindeki girdi

    this.resetX = config.resetX || 3000;  // Varsayılan reset pozisyonu

    this.setup();
  }

  setup() {
    for (let i = 0; i < this.grid.length; i++) { // Satırları döngüyle gez
      for (let j = 0; j < this.grid[i].length; j++) { // Sütunları döngüyle gez
        let xOffset = j * (this.collectableSize + this.gap);  // X pozisyonu
        let zOffset = i * (this.collectableSize + this.gap);  // Z pozisyonu

        if (this.grid[i][j] === 1) {
          let collectable = new Collectable(xOffset, 0, zOffset, this.collectableSize);
          this.collectables.push(collectable);
        } else if (this.grid[i][j] === 2) {
          let obstacle = new Obstacle(xOffset, 0, zOffset, this.obstacleSize);
          this.obstacles.push(obstacle);
        }
      }
    }
  }

  move(speed) {
    this.position.x += speed;  // Platformu hareket ettir

    // Collectable ve Obstacle'ların pozisyonlarını güncelle
    this.collectables.forEach((collectable) => {
      collectable.move(this.position);  // Platformun pozisyonuna göre günceller
    });

    this.obstacles.forEach((obstacle) => {
      obstacle.move(this.position);  // Obstacle için de aynı şekilde güncellenir
    });

    if (this.position.x < -800) {  // Ekranın dışına çıktıysa resetle
      this.resetPosition();
    }
  }

  draw() {
    push();
    rotateY(HALF_PI);  // Platformu 90 derece Y ekseninde döndür

    // Collectable'ları çiz
    this.collectables.forEach((collectable) => {
      collectable.draw();
    });

    // Obstacle'ları çiz
    this.obstacles.forEach((obstacle) => {
      obstacle.draw();
    });

    pop();
  }

  resetPosition() {
    this.position.x = this.resetX;  // Reset pozisyonu
  }
}
