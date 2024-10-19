class Sky {
  constructor(config) {
    this.width = config.width;
    this.height = config.height;
    this.starCount = config.starCount;
    this.canvasSky = this.createSky();  // Gökyüzü önceden hazırlanıyor
  }

  createSky() {
    const sky = createGraphics(this.width, this.height);
    sky.noFill();
    sky.noStroke();
    sky.fill(255, 255, 255, random(100, 255));  // Beyaz yıldızlar
    for (let i = 0; i < this.starCount; i++) {
      sky.ellipse(random(0, this.width), random(0, this.height), random(1, 5));
    }
    return sky;
  }

  display() {
    push();
    translate(0, -400, -1500);
    noStroke();
    texture(this.canvasSky);
    plane(3000,2000);
    pop();
  }
}
