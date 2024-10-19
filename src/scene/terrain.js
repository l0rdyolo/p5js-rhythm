class Terrain {
  constructor(config) {
    this.rows = config.rows;                 // Config'ten satır sayısı
    this.cols = config.cols;                 // Config'ten sütun sayısı
    this.size = config.size;                 // Config'ten hücre boyutu
    this.altitude = config.altitude;         // Config'ten dağ yüksekliği
    this.trench = config.trench;             // Config'ten vadi genişliği
    this.color = color(...config.color);     // Config'ten terrain rengi
    this.strokeColor = color(...config.strokeColor);  // Config'ten stroke rengi
    this.terrain = [];
    this.rowPosition = 0;
    this.flying = 0;
    this.initializeTerrain();
  }

  initializeTerrain() {
    for (let y = 0; y < this.rows; y++) {
      this.terrain[y] = [];
      for (let x = 0; x < this.cols; x++) {
        this.terrain[y][x] = this.renderTerrainPoint(x, y);
      }
      this.rowPosition++;
    }
  }

  renderTerrainPoint(x, y) {
    let point;
    if (x === this.trench || x === (this.trench + 1)) {
      point = random(0, 0.2) * this.size;
    } else if (x === (this.trench - 1) || x === (this.trench + 2)) {
      point = map(noise(x, y), 0, 1, 0, 0.2) * this.altitude;
    } else {
      point = noise(x, y) * this.altitude;
    }
    return point;
  }

  update(gameSpeed) {
    this.flying += gameSpeed;
    if (this.flying >= this.size) {
      this.flying = 0;
      this.terrain.pop();

      const newRow = [];
      for (let x = 0; x < this.cols; x++) {
        newRow.push(this.renderTerrainPoint(x, this.rowPosition));
      }
      this.terrain.unshift(newRow);
      this.rowPosition++;
    }
  }

  display() {
    push();
    rotateX(PI / 2);
    translate(-220, -2400, -40);
    fill(this.color);  // Terrain rengini ayarladık

    for (let y = 0; y < this.rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < this.cols; x++) {
        // Çukur bölgesi için stroke'u kapatıyoruz
        if (x === this.trench || x === (this.trench + 1)) {
          noStroke();
        } else {
          stroke(this.strokeColor);  // Diğer bölgeler için stroke uygulanır
          strokeWeight(2);
        }

        vertex(x * this.size, (y * this.size) + this.flying, this.terrain[y][x]);
        vertex(x * this.size, ((y + 1) * this.size) + this.flying, this.terrain[y + 1][x]);
      }
      endShape();
    }
    pop();
  }
}
