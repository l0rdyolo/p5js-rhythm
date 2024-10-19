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
  }

  initializeStripes() {
    for (let i = 1; i < this.laneCount; i++) {
      let stripeX = -this.width / 2 + i * this.laneWidth;
      this.stripes.push(stripeX); 
    }
  }

  draw(activeLaneIndex) {
    push();
    translate(0, -50, -500); 

    for (let i = 0; i < this.laneCount; i++) {
      push();

      // Dalga şeklinde renk geçişi uyguluyoruz
      let laneColor = this.colorPalette.waveColor(i * 30); 

      // Aktif şerit için parlaklığı 0.7, diğerleri için 0.3 yapıyoruz
      if (i === activeLaneIndex) {
        fill(red(laneColor), green(laneColor), blue(laneColor), 0.7);
      } else {
        fill(red(laneColor), green(laneColor), blue(laneColor), 0.3);
      }

      noStroke();
      translate(-this.width / 2 + i * this.laneWidth + this.laneWidth / 2, 0, this.length / 2); 
      rotateX(HALF_PI);
      plane(this.laneWidth, this.length); 
      pop();
    }

    stroke(255);
    strokeWeight(this.stripeWidth);
    for (let i = 0; i < this.stripes.length; i++) {
      line(this.stripes[i], 0, 0, this.stripes[i], 0, this.length);
    }

    pop();
  }
}
