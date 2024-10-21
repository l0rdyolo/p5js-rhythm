let environment;
let player;
let platform;
let soundManager;
let gameSpeed = 1;
let cameraX = 0;
let technoMusic;
let score = 0;

let ground;
let lanePositions;

let platforms = [];
let platformGap = 50; 

let obstacle;

const BASE_SPEED = 10;
const MAX_SPEED = 30;

function preload() {
  technoMusic = loadSound(GameConfig.music.src);  
}

function setup() {
  createCanvas(GameConfig.canvas.size, 400, WEBGL);
  pixelDensity(GameConfig.canvas.pixelDensity);
  colorMode(RGB, 255, 255, 255, 1);

  soundManager = new SoundManager(technoMusic);


  ground = new Ground(GameConfig.ground);
  //calculeted when ground init
  lanePositions = ground.lanePositions;

  environment = new Environment(
    new Sky(GameConfig.sky),
    new Terrain(GameConfig.terrain),
    ground
  );
  obstacle = new Obstacle(createVector(0,0,-30),10);

  player = new Player(GameConfig.player , lanePositions);

}

function draw() {
  background(GameConfig.colors.background);  
  cameraX = lerp(cameraX, player.position.x, 0.1);
  cam = createCamera();
  
  // test
  cam.setPosition(cameraX, -30, 100);
  cam.lookAt(cameraX, 0, 0);

  //base
  // cam.setPosition(cameraX, -30, 100);
  // cam.lookAt(cameraX, -30, 0);

  environment.update(gameSpeed);  
  environment.display(player.currentLane);
  obstacle.draw();
  obstacle.checkCollision(player);
  player.draw();


  updateStats(gameSpeed);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move('left');
  } else if (keyCode === RIGHT_ARROW) {
    player.move('right');
  }
}

function updateStats(gameSpeed) {
  document.getElementById('speedDisplay').innerHTML = `Speed: ${gameSpeed.toFixed(0)}`; 
  document.getElementById('fpsDisplay').innerHTML = `FPS: ${frameRate().toFixed(0)}`;
  document.getElementById('score').innerHTML = `Score: ${score}`;
}

