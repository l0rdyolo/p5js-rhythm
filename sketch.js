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

function setup() {
  createCanvas(canvasSize, 400, WEBGL);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  
  colorPalette = new ColorPalette();
  colours = [
    color(8, 44, 127),
    color(0, 255, 248),
    color(255, 0, 253),
    color(0, 29, 95),
  ];
  platform = new Platform(-300, -50, 50, 15, 20);
  let skyInstance = new Sky(860, 430 * 1.2, 100);
  let terrainInstance = new Terrain(70, 15, 40, 150, 5, color(102, 0, 102), color(0, 255, 248)); 
  let groundInstance = new Ground(70, 1000, 3, 5, colorPalette);
  
  environment = new Environment(skyInstance, terrainInstance, groundInstance);
  
  player = new Player(lanePositions, false);
}

function draw() {
  background(colours[3]);

  fps = frameRate();

  cam = createCamera();
  cam.setPosition(0, -80, 380);
  cam.lookAt(0, -70, 0);

  let activeLaneIndex = player.currentLane;

  environment.update();
  environment.display(activeLaneIndex);

  player.draw();
  platform.draw();


  updateStats();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move('left');
  } else if (keyCode === RIGHT_ARROW) {
    player.move('right');
  }
}

function drawAxis() {
  strokeWeight(4);
  stroke(255, 0, 0);
  line(0, 0, 0, 100, 0, 0);

  stroke(0, 255, 0);
  line(0, 0, 0, 0, 100, 0);

  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, 100);
}

function updateStats() {
  document.getElementById('fpsDisplay').innerHTML = `FPS: ${nf(fps, 2, 1)}`;
  document.getElementById('speedDisplay').innerHTML = `Speed: ${speed}`;
  document.getElementById('score').innerHTML = `Score: ${score}`;
}
