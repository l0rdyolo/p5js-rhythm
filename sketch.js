let canvasSize = 680;
let environment;
let player;
let colours;
let lanePositions = [-40, 0, 40];
let colorPalette;

let score = 0;
let fps = 0;
let speed = 4;

let platform;
let gameSpeed;
let cameraX = 0;  // Kamera x konumu
let grid = [
  [0, 1, 0],  // 1: Collectable
  [0, 1, 0],  // 1: Collectable
  [0, 1, 2]   // 1: Collectable, 2: Obstacle
];
function setup() {
  createCanvas(canvasSize, 400, WEBGL);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  gameSpeed =5;
  colorPalette = new ColorPalette();
  colours = [
    color(8, 44, 127),
    color(0, 255, 248),
    color(255, 0, 253),
    color(0, 29, 95),
  ];
  platform = new Platform(0,-10, -60, 50, 8, 10,grid);
  let skyInstance = new Sky(860, 430 * 1.2, 100);
  let terrainInstance = new Terrain(70, 15, 40, 150, 5, color(102, 0, 102), color(0, 255, 248)); 
  let groundInstance = new Ground(120, 2000, 3, 5, colorPalette);
  
  environment = new Environment(skyInstance, terrainInstance, groundInstance);
  
  player = new Player(lanePositions, false);
}

function draw() {
  
  background(colours[3]);

  fps = frameRate();

  // Kameranın X pozisyonunu smooth şekilde player'ı takip edecek şekilde ayarla
  cameraX = lerp(cameraX, player.x, 0.1);  // 0.1 ile smooth hareket sağlanıyor

  cam = createCamera();
  cam.setPosition(cameraX, -30, 500);  // Kamera player'ın X pozisyonuna göre ayarlanıyor
  cam.lookAt(cameraX, -40, 0);  // Kameranın odaklandığı yer de player'ın X pozisyonuna göre ayarlanıyor

  let activeLaneIndex = player.currentLane;
  player.draw();
  platform.move(gameSpeed * -1); 
  platform.draw(); 

  environment.update();
  environment.display(activeLaneIndex);

  updateStats();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move('left');
  } else if (keyCode === RIGHT_ARROW) {
    player.move('right');
  }
}

function updateStats() {
  document.getElementById('fpsDisplay').innerHTML = `FPS: ${nf(fps, 2, 1)}`;
  document.getElementById('speedDisplay').innerHTML = `Speed: ${speed}`;
  document.getElementById('score').innerHTML = `Score: ${score}`;
}
