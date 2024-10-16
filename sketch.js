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
let totalBuildings = 10;  // Sağ ve sol tarafa 5'er bina
let buildingDistance = 400;  // Binaların ground etrafında düzenli aralıklarla yerleştirilmesi

let technoMusic, kickSound, amp;
function preload() {
  technoMusic = loadSound('tecno.mp3');
  kickSound = loadSound('kick.mp3');
}

function setup() {
  createCanvas(860, 430*1.2, WEBGL);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  cam = createCamera();
  cam.setPosition(0, -50, 200);  // Daha yukarı ve arabaya daha yakın
  cam.lookAt(0, 0, 0);

  backgroundLayer = new Background();
  ground = new Ground(600, 10000);  // Zemin
  player = new Player(0);  // Oyuncu (araba)

  // Sağ ve sol tarafa binalar oluştur
  for (let i = 0; i < totalBuildings; i++) {
    let leftSide = new Building(-300, random(-3000, -500), random(100, 300), random(50, 100));
    let rightSide = new Building(300, random(-3000, -500), random(100, 300), random(50, 100));
    buildings.push(leftSide, rightSide);
  }

  startGame();
}

function draw() {
  background(Color.DeepBlack.rgb);  // Neon arka plan
 // Yolun virajına göre kamera dönüşü
 
  // Işıklandırma
  ambientLight(50, 50, 50);  // Loş ortam ışığı
  pointLight(255, 255, 255, 0, -300, 400);  // Nokta ışığı
  directionalLight(255, 255, 255, 0.5, 0.5, -1);  // Yönlü ışık

  // Zemin ve oyuncu çizimi
  backgroundLayer.draw();
  ground.draw(player);
  player.draw();


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
