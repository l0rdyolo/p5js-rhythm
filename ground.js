class Ground {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
  }

  draw() {
    // Şerit genişliği
    let laneWidth = this.width / 3;

    // Şerit renkleri
    let laneColors = ['rgb(78,30,106)', 'rgb(49,25,63)', 'rgb(78,30,106)'];

    // Ground düzlemini çizmek yerine, her şeridi ayrı ayrı çiziyoruz
    for (let i = 0; i < 3; i++) {
      push();
      // Her şeridin x pozisyonu
      let x = -this.width / 2 + laneWidth / 2 + i * laneWidth;
      translate(x, 100, 0);
      rotateX(HALF_PI);
      fill(laneColors[i]);
      noStroke();
      // Her şerit için bir düzlem çiziyoruz
      plane(laneWidth, this.depth);
      pop();
    }

    // Şeritlerin arasına çizgi çizmek isterseniz
    push();
    translate(0, 100.1, 0); // Z-fighting'i önlemek için hafif yukarı taşıyoruz
    rotateX(HALF_PI);
    stroke(255);
    strokeWeight(2);

    let lineLength = this.depth;
    let lanePositions = [-this.width / 6, this.width / 6];

    for (let x of lanePositions) {
      line(x, -lineLength / 2, x, lineLength / 2);
    }
    pop();
  }

  update() {
    // Ground ile ilgili güncellemeler buraya
  }
}
