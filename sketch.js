let environment;
let player;
let platform;
let soundManager;
let gameSpeed = 2;
let cameraX = 0;
let technoMusic;
let score = 0;

let platforms = [];
let platformGap = 20; 

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

  for (let i = 0; i < platformsPrefabs.length; i++) {
    let startZ = (i * (platformGap * 4) ) - 300 //
    console.log(startZ);
    let platform = new Platform(platformsPrefabs[i], -18, 0, startZ, platformGap);
    platforms.push(platform);
  }

  environment = new Environment(
    new Sky(GameConfig.sky),
    new Terrain(GameConfig.terrain),
    new Ground(GameConfig.ground)
  );
  player = new Player(GameConfig.player);
}

function draw() {
  background(GameConfig.colors.background);  
  cameraX = lerp(cameraX, player.x, 0.1);
  cam = createCamera();
  cam.setPosition(cameraX, -30, 100);
  cam.lookAt(cameraX, -30, 0);

  player.draw();

  environment.update(gameSpeed);  
  environment.display(player.currentLane);

  platforms.forEach(platform => {
    platform.move(gameSpeed);  // Player'a doğru hareket
    platform.draw();
  });

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
