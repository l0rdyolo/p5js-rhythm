class Ground {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
  }

  draw() {
    let laneWidth = this.width / 3;

    let laneColors = ['rgb(78,30,106)', 'rgb(49,25,63)', 'rgb(78,30,106)'];

    for (let i = 0; i < 3; i++) {
      push();
      let x = -this.width / 2 + laneWidth / 2 + i * laneWidth;
      translate(x, 100, 0);
      rotateX(HALF_PI);
      fill(laneColors[i]);
      noStroke();
      plane(laneWidth, this.depth);
      pop();
    }

    push();
    translate(0, 100.1, 0); 
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
  }
}
