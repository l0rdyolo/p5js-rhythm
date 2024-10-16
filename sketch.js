let cam;
let ground;
let backgroundLayer;
let player;
let collectables = [];
let obstacles = [];
let speed = 5;
let gameStarted = false;
let totalObstacles = 8;
let totalCollectables = 15;
let score = 0;

let buildings = [];
let totalBuildings = 10;
let buildingDistance = 400;

let fps = 0;  // FPS sayacı

let technoMusic, kickSound, amp;

function preload() {
  technoMusic = loadSound('tecno.mp3');
  kickSound = loadSound('kick.mp3');
}

function setup() {
  createCanvas(860, 430 * 1.2, WEBGL);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  cam = createCamera();
  cam.setPosition(0, -50, 200);
  cam.lookAt(0, 0, 0);

  backgroundLayer = new Background();
  ground = new Ground(600, 10000);
  player = new Player(0);

  // Binalar
  for (let i = 0; i < totalBuildings; i++) {
    let leftSide = new Building(-300, random(-3000, -500), random(100, 300), random(50, 100));
    let rightSide = new Building(300, random(-3000, -500), random(100, 300), random(50, 100));
    buildings.push(leftSide, rightSide);
  }

  startGame();
}

function draw() {
  // FPS hesaplama
  fps = frameRate();

  background(Color.DeepBlack.rgb);

  // Işıklandırma
  ambientLight(50, 50, 50);
  pointLight(255, 255, 255, 0, -300, 400);
  directionalLight(255, 255, 255, 0.5, 0.5, -1);

  // Zemin ve oyuncu çizimi
  backgroundLayer.draw();
  ground.draw(player);
  player.draw();

  // HTML FPS göstergesi
  updateStats();
}

function updateStats() {
  // HTML üzerinden FPS değerini göster
  document.getElementById('fpsDisplay').innerHTML = `FPS: ${nf(fps, 2, 1)}`;
  // HTML üzerinden hızı göster
  document.getElementById('speedDisplay').innerHTML = `Speed: ${speed}`;
  // HTML üzerinden skoru göster
  document.getElementById('score').innerHTML = `Score: ${score}`;
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
