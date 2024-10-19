class Ground {
  constructor(config) {
    this.width = config.width;
    this.length = config.length;
    this.laneCount = config.laneCount;
    this.stripeWidth = config.stripeWidth;
    this.laneWidth = this.width / this.laneCount;
    this.colorPalette = new ColorPalette();

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
    translate(0, 5, -1000);
    for (let i = 0; i < this.laneCount; i++) {
      push();
      let laneColor = this.colorPalette.waveColor(i * 30);
      if (i === activeLaneIndex) {
        fill(red(laneColor), green(laneColor), blue(laneColor), 0.8);
      } else {
        fill(red(laneColor), green(laneColor), blue(laneColor), 0.2);
      }
      noStroke();
      translate(-this.width / 2 + i * this.laneWidth + this.laneWidth / 2, 0, this.length / 2);
      rotateX(HALF_PI);
      plane(this.laneWidth, this.length);
      pop();
    }
    pop();
  }
}
