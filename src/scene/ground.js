class Ground {
  constructor(width, length, laneCount, stripeWidth, colorPalette) {
    this.width = width;
    this.length = length;
    this.laneCount = laneCount;
    this.stripeWidth = stripeWidth;
    this.laneWidth = this.width / this.laneCount;
    this.colorPalette = colorPalette; // ColorPalette sınıfını aldık

    this.stripes = [];
    this.initializeStripes();

    this.brightness = new Array(this.laneCount).fill(0.3); // Şeritlerin parlaklığını tutar
  }

  initializeStripes() {
    for (let i = 1; i < this.laneCount; i++) {
      let stripeX = -this.width / 2 + i * this.laneWidth;
      this.stripes.push(stripeX);
    }
  }

  draw(activeLaneIndex) {
    push();
    translate(0, 5, -1000);

    for (let i = 0; i < this.laneCount; i++) {
      push();

      // Dalga şeklinde renk geçişi
      let laneColor = this.colorPalette.waveColor(i * 30);

      // Aktif şeridin parlaklığını 0.3'ten 0.8'e, pasif olanları 0.8'den 0.3'e smooth geçişle ayarla
      if (i === activeLaneIndex) {
        this.brightness[i] = lerp(this.brightness[i], 0.8, 0.05);  // Aktif şerit için parlaklık artırılır
      } else {
        this.brightness[i] = lerp(this.brightness[i], 0.3, 0.05);  // Diğer şeritler için parlaklık azaltılır
      }

      fill(red(laneColor), green(laneColor), blue(laneColor), this.brightness[i]);

      noStroke();
      translate(-this.width / 2 + i * this.laneWidth + this.laneWidth / 2, 0, this.length / 2);
      rotateX(HALF_PI);
      plane(this.laneWidth, this.length);
      pop();
    }

    pop();
  }

  drawLaneLines() {
    stroke(255);
    strokeWeight(this.stripeWidth);
    for (let i = 0; i < this.stripes.length; i++) {
      line(this.stripes[i], 0, 0, this.stripes[i], 0, this.length);
    }
  }
}
