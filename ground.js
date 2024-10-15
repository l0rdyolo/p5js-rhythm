class Ground {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
    this.laneColor = Color.NeonBlue.hex;  // Global renk paletinden NeonBlue
    this.highlightColor = Color.NeonPink.hex;  // Global renk paletinden NeonPink
    this.lineManager = new LaneLineManager(this.width, this.depth);  // LaneLineManager kullanımı
  }

  draw(player) {
    let laneWidth = this.width / 3;

    // Şeritleri çiz
    for (let i = 0; i < 3; i++) {
      push();
      let x = -this.width / 2 + laneWidth / 2 + i * laneWidth;

      // Oyuncunun bulunduğu şerit daha parlak olacak
      if (i === player.currentLane) {
        fill(this.highlightColor);  // Oyuncunun olduğu şeridi parlak renkle çiz
      } else {
        fill(this.laneColor);  // Diğer şeritler normal renkte kalacak
      }

      translate(x, 100, 0);
      rotateX(HALF_PI);
      noStroke();
      plane(laneWidth, this.depth);
      pop();
    }

    // LaneLineManager'a çizgileri çizmesini söyle
    this.lineManager.draw();
  }

  triggerLaneColor(laneKey) {
    const strategies = {
      left: ["a", "b"],    // left şeridi a ve b çizgilerini yakar
      middle: ["b", "c"],  // middle şeridi b ve c çizgilerini yakar
      right: ["c", "d"]    // right şeridi c ve d çizgilerini yakar
    };

    if (strategies.hasOwnProperty(laneKey)) {
      // LaneLineManager'a hangi çizgileri yakması gerektiğini söyle
      this.lineManager.activateLines(strategies[laneKey]);
    } else {
      console.error(`Geçersiz şerit anahtarı: ${laneKey}`);
    }
  }
}
