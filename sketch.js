let cam;
let ground;
let player;
let collectables = [];
let obstacles = [];
let totalSets = 10;
let speed = 5;
let sound, fft;
let gameStarted = false;

function preload() {
  sound = loadSound('tecno.mp3');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  cam = createCamera();
  cam.setPosition(0, -400, 560);
  cam.lookAt(0, 0, 0);

  ground = new Ground(600, 10000);
  player = new Player(0);

  for (let i = 0; i < totalSets; i++) {
    spawnCollectableSet(i);
  }

  fft = new p5.FFT();
}

function draw() {
  if (!gameStarted) {
    return;
  }

  background(200);

  let spectrum = fft.analyze();
  let bassEnergy = fft.getEnergy("bass");
  speed = map(bassEnergy, 0, 255, 7, 20);

  displayStats();

  ambientLight(100, 100, 100);
  directionalLight(255, 255, 255, 0.25, 0.25, -1);

  ground.draw();
  player.draw();

  for (let i = collectables.length - 1; i >= 0; i--) {
    collectables[i].move(speed);
    collectables[i].draw();

    if (collectables[i].z > 500) {
      collectables[i].resetPosition();
    }

    if (player.collidesWith(collectables[i])) {
      collectables[i].resetPosition();
      console.log("add score!");
    }
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].move(speed);
    obstacles[i].draw();

    if (obstacles[i].z > 500) {
      obstacles[i].resetPosition();
    }

    if (player.collidesWith(obstacles[i])) {
      console.log("Game Over!");
      noLoop();
    }
  }
}

function displayStats() {
  document.getElementById('speed').innerText = "Speed: " + nf(speed, 1, 2);
  document.getElementById('fps').innerText = "FPS: " + floor(frameRate());
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move('left');
  } else if (keyCode === RIGHT_ARROW) {
    player.move('right');
  }
}

function spawnCollectableSet(index) {
  let zPosition = -1000 - index * 800;
  let availableLanes = [-150, 0, 150];
  let numCollectables = random([2, 3]);

  for (let i = 0; i < numCollectables; i++) {
    let laneIndex = floor(random(availableLanes.length));
    let xPos = availableLanes[laneIndex];
    availableLanes.splice(laneIndex, 1);
    collectables.push(new Collectable(xPos, 0, zPosition + i * 200));
  }

  if (random() < 0.5 && availableLanes.length > 0) {
    let laneIndex = floor(random(availableLanes.length));
    let obstacleX = availableLanes[laneIndex];
    availableLanes.splice(laneIndex, 1);
    obstacles.push(new Obstacle(obstacleX, 0, zPosition + numCollectables * 200 + 100));
  }
}

function startGame() {
  gameStarted = true;
  sound.loop();
  document.getElementById('playButton').style.display = 'none';
}
