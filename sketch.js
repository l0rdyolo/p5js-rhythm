let canvasSize = 680;
let terrain;
let sky;
let player;
let colours;
let lanePositions = [-40, 0, 40]; // X positions for the 3 lanes

let ground;

let score = 0;
let fps = 0;
let speed = 4;

function setup() {
  createCanvas(canvasSize, 400, WEBGL);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Set colors
  colours = [
    color(8, 44, 127), // Night blue
    color(0, 255, 248), // Neon blue
    color(255, 0, 253), // Neon pink
    color(0, 29, 95),   // Dark blue
  ];

  // Initialize terrain and sky
  terrain = new Terrain(50, 13, 40, 200, 5);
  sky = new Sky(3400, 2600, 1000);  // Sky with gradient and stars
  ground = new Ground(70, 1000, 3, 5);
  // Initialize player
  player = new Player(lanePositions, false); // Trail devre dışı bırakıldı

}

function draw() {
  background(colours[0]);

  fps = frameRate();
  // Draw sky and sun with proper positioning
  push();
  translate(0, -400, -2000);
  sky.display();  // Sky background with stars
  sky.displaySun();  // Sun
  pop();

  // Camera and terrain setup

  cam = createCamera();
  cam.setPosition(0, -80, 380);
  cam.lookAt(0, -70, 0);
  // Terrain styling
  fill(colours[3]);
  stroke(colours[1]);
  strokeWeight(3);

  // Update and display terrain
  terrain.update();
  terrain.display();
  let activeLaneIndex = player.currentLane; // player'ın bulunduğu şerit

  // Ground ve Player çizimi
  ground.draw(activeLaneIndex);
  // Display player
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