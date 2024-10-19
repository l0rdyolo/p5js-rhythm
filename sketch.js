let canvasSize = 680;
let environment;
let player;
let colours;
let lanePositions = [-40, 0, 40]; // X positions for the 3 lanes

let colorPalette;

let score = 0;
let fps = 0;
let speed = 4;

function setup() {
  createCanvas(canvasSize, 400, WEBGL);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  
  // ColorPalette instance
  colorPalette = new ColorPalette();
  
  // Set colors
  colours = [
    color(8, 44, 127), // Night blue
    color(0, 255, 248), // Neon blue
    color(255, 0, 253), // Neon pink
    color(0, 29, 95),   // Dark blue
  ];

  // Sky instance
  let skyInstance = new Sky(860, 430 * 1.2, 100);  // 100 yıldız ile sky oluşturuluyor
  
  // Terrain instance
  let terrainInstance = new Terrain(70, 15, 40, 150, 5, color(102, 0, 102), color(0, 255, 248)); 
  
  // Ground instance
  let groundInstance = new Ground(70, 1000, 3, 5, colorPalette);
  
  // Environment instance (Sky, Terrain ve Ground gönderiliyor)
  environment = new Environment(skyInstance, terrainInstance, groundInstance);
  
  // Initialize player
  player = new Player(lanePositions, false); // Trail devre dışı bırakıldı
}

function draw() {
  background(colours[3]);

  fps = frameRate();

  cam = createCamera();
  cam.setPosition(0, -80, 380);
  cam.lookAt(0, -70, 0);

  let activeLaneIndex = player.currentLane; // player'ın bulunduğu şerit

  environment.update();  // Environment (Sky, Terrain, Ground) güncelleniyor
  environment.display(activeLaneIndex);  // Environment çiziliyor

  push();
  player.draw();
  pop();

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
  
  // X-axis (Red)
  stroke(255, 0, 0); // Red for X axis
  line(0, 0, 0, 100, 0, 0);

  // Y-axis (Green)
  stroke(0, 255, 0); // Green for Y axis
  line(0, 0, 0, 0, 100, 0);

  // Z-axis (Blue)
  stroke(0, 0, 255); // Blue for Z axis
  line(0, 0, 0, 0, 0, 100);
}

function updateStats() {
  // HTML üzerinden FPS değerini göster
  document.getElementById('fpsDisplay').innerHTML = `FPS: ${nf(fps, 2, 1)}`;
  // HTML üzerinden hızı göster
  document.getElementById('speedDisplay').innerHTML = `Speed: ${speed}`;
  // HTML üzerinden skoru göster
  document.getElementById('score').innerHTML = `Score: ${score}`;
}
