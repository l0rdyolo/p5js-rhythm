let cam;
let ground;
let player;
let collectables = [];
let obstacles = [];
let speed = 5;
let gameStarted = false;
let totalObstacles = 5;
let totalCollectables = 5;
let score = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  cam = createCamera();
  cam.setPosition(0, -400, 560);
  cam.lookAt(0, 0, 0);

  ground = new Ground(600, 10000);
  player = new Player(0);

  for (let i = 0; i < totalObstacles; i++) {
    let lanePositions = [-150, 0, 150];
    let laneIndex = floor(random(lanePositions.length));
    let xPos = lanePositions[laneIndex];
    obstacles.push(new Obstacle(xPos, 0, -1000 - i * 400));
  }

  for (let i = 0; i < totalCollectables; i++) {
    let lanePositions = [-150, 0, 150];
    let laneIndex = floor(random(lanePositions.length));
    let xPos = lanePositions[laneIndex];
    collectables.push(new Collectable(xPos, 0, -1000 - i * 400));  // Toplanabilir nesneler
  }

  startGame();
}

function draw() {
  if (!gameStarted) {
    return;
  }

  background(200);

  ambientLight(100, 100, 100);
  directionalLight(255, 255, 255, 0.25, 0.25, -1);

  ground.draw(player);
  player.draw();

  for (let i = collectables.length - 1; i >= 0; i--) {
    collectables[i].move(speed);
    collectables[i].draw();

    if (collectables[i].z > 500) {
      collectables[i].resetPosition();
    }

    if (collectables[i].collidesWith(player)) {
      collectables[i].resetPosition();
      score += 10;  // Skoru artır
      document.getElementById('score').innerText = "Score: " + score;  // Skoru HTML'de güncelle
    }
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].move(speed);
    obstacles[i].draw();

    if (obstacles[i].z > 500) {
      obstacles[i].resetPosition();
    }

    if (obstacles[i].collidesWith(player)) {
      console.log("Game Over!");
      noLoop();
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move('left');
  } else if (keyCode === RIGHT_ARROW) {
    player.move('right');
  }
}

function startGame() {
  gameStarted = true;
}
