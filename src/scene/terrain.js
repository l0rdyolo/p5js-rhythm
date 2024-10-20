class Terrain {
  constructor(config) {
    this.rows = config.rows;
    this.cols = config.cols;
    this.size = config.size;
    this.altitude = config.altitude;
    this.trench = config.trench;
    this.color = color(...config.color);
    this.strokeColor = color(...config.strokeColor);
    this.terrainMesh = []; // Mesh verileri burada tutulacak
    this.flying = 0;
    this.rowPosition = 0;
    this.initializeTerrain();
  }

  initializeTerrain() {
    for (let y = 0; y < this.rows; y++) {

      let row = [];
      for (let x = 0; x < this.cols; x++) {
        row.push(this.renderTerrainPoint(x, y));
      }
      this.terrainMesh.push(row);
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
      this.rowPosition++;
      this.terrainMesh.pop(); // Son satırı sil
      let newRow = [];
      for (let x = 0; x < this.cols; x++) {
        newRow.push(this.renderTerrainPoint(x, this.rowPosition));
      }
      this.terrainMesh.unshift(newRow); // Yeni satırı başa ekle
    }
  }

  display() {
    push();
    rotateX(PI / 2);
    translate(-220, -2400, -40);
    fill(this.color);
    stroke(this.strokeColor);
    strokeWeight(2);
    
    // Terrain mesh'i bir kere hesaplandıktan sonra sürekli yeniden çizilir
    for (let y = 0; y < this.rows - 1; y++) {
      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < this.cols; x++) {
        vertex(x * this.size, y * this.size + this.flying, this.terrainMesh[y][x]);
        vertex(x * this.size, (y + 1) * this.size + this.flying, this.terrainMesh[y + 1][x]);
      }
      endShape();
    }
    pop();
  }
}
