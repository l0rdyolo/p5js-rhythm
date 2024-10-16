class Ground {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
    this.terrain = [];
    this.rows = 40;  // Daha az satır, daha yüksek performans
    this.cols = 10;  // Daha az kolon
    this.size = 40;  // Birim büyüklük, optimize edildi
    this.flying = 0;
    this.flyingSpeed = 2;  // Daha yumuşak bir hız
    this.trench = 5;
    this.noiseOffset = 0;
    this.altitude = 150;

    // Terrain verilerini oluştur
    this.initTerrain();
  }

  // Terrain'i başlatma fonksiyonu
  initTerrain() {
    for (let y = 0; y < this.rows; y++) {
      this.terrain[y] = [];
      for (let x = 0; x < this.cols; x++) {
        this.terrain[y][x] = this.renderTerrainPoint(x, y);
      }
    }
  }

  // Terrain noktalarını hesaplama
  renderTerrainPoint(x, y) {
    let offsetX = x * 0.1 + this.noiseOffset;
    let offsetY = y * 0.1 + this.noiseOffset;

    // Yolu çukur ve duvar yapısı olarak yap
    if (x === this.trench || x === this.trench + 1) {
      return random(0, 0.2) * this.size;
    } else if (x === this.trench - 1 || x === this.trench + 2) {
      return map(noise(offsetX, offsetY), 0, 1, 0, 0.2) * this.altitude;
    } else {
      return noise(offsetX, offsetY) * this.altitude;
    }
  }

  // Terrain'i güncelleme
  updateTerrain() {
    this.noiseOffset += this.flyingSpeed * 0.01;  // Smooth geçiş
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.terrain[y][x] = this.renderTerrainPoint(x, y);  // Noktaları güncelle
      }
    }
  }

  // Terrain çizimi
  draw(player) {
    push();
    rotateX(PI / 2.12);
    translate(-220, -1000);

    fill(0, 29, 95); // Dark blue renk
    stroke(0, 255, 248); // Neon blue çizgi rengi
    strokeWeight(2);

    // Zemin çizimi
    for (let y = 0; y < this.rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < this.cols; x++) {
        vertex(x * this.size, (y * this.size) + this.flying, this.terrain[y][x]);
        vertex(x * this.size, ((y + 1) * this.size) + this.flying, this.terrain[y + 1][x]);
      }
      endShape();
    }

    // Flying animasyonu
    this.flying += this.size * this.flyingSpeed;
    if (this.flying >= this.size) {
      this.flying = 0;
      this.updateTerrain();  // Noktaları güncelle
    }

    pop();
  }
}
