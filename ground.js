class Ground {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
    this.terrain = [];
    this.rows = 70;
    this.cols = 13;
    this.size = 40;
    this.flying = 0;
    this.flyingSpeed = 0.05;  // Daha yumuşak bir hız
    this.trench = 5;
    this.noiseOffsetX = 0;
    this.noiseOffsetZ = 0;
    this.altitude = 150;

    this.xOffset = 0;
    this.zOffset = 0;

    // Terrain oluşturuluyor
    for (let y = 0; y < this.rows; y++) {
      this.terrain[y] = [];
      for (let x = 0; x < this.cols; x++) {
        this.terrain[y][x] = this.renderTerrainPoint(x, y);
      }
    }
  }

  renderTerrainPoint(x, y) {
    let offsetX = (x + this.noiseOffsetX) * 0.1 + this.xOffset;
    let offsetY = (y + this.noiseOffsetZ) * 0.1 + this.zOffset;

    // Yolu çukur ve duvar yapısı olarak yap
    if (x === this.trench || x === this.trench + 1) {
      return random(0, 0.2) * this.size;
    } else if (x === this.trench - 1 || x === this.trench + 2) {
      return map(noise(offsetX, offsetY), 0, 1, 0, 0.2) * this.altitude;
    } else {
      return noise(offsetX, offsetY) * this.altitude;
    }
  }

  updateTerrain() {
    this.noiseOffsetX += this.flyingSpeed;  // X ekseninde yumuşak kaydırma
    this.noiseOffsetZ += this.flyingSpeed * 0.5;  // Z ekseninde daha hafif bir kaydırma

    // Terrain verilerini güncelle
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.terrain[y][x] = this.renderTerrainPoint(x, y);
      }
    }
  }

  draw(player) {
    push();
    rotateX(PI / 2.12);
    translate(-220 + this.xOffset * 100, -1000 + this.zOffset * 100);  // X ve Z offset ekledik

    fill(0, 29, 95);
    stroke(0, 255, 248);
    strokeWeight(2);

    for (let y = 0; y < this.rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < this.cols; x++) {
        vertex(x * this.size + this.xOffset, (y * this.size) + this.flying, this.terrain[y][x] + this.zOffset);
        vertex(x * this.size + this.xOffset, ((y + 1) * this.size) + this.flying, this.terrain[y + 1][x] + this.zOffset);
      }
      endShape();
    }

    // Flying animasyonu
    this.flying += this.size * this.flyingSpeed;
    if (this.flying >= this.size) {
      this.flying = 0;
      this.updateTerrain();  // Terrain güncelleniyor
    }

    pop();
  }

  drawLanes(player) {
    let laneWidth = this.width / 3; 

    for (let i = 0; i < 3; i++) {
      push();
      let x = -this.width / 2 + laneWidth / 2 + i * laneWidth;

      if (i === player.currentLane) {
        fill(255, 255, 255, 180); 
      } else {
        fill(0, 0, 0, 75); 
      }

      translate(x, -10, 0);
      rotateX(PI / 2);
      noStroke();
      plane(laneWidth, this.depth * 2);

      pop();
    }
  }
}
