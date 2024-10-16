let cam;
let ground;
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
  createCanvas(600, 600, WEBGL);
  cam = createCamera();
  cam.setPosition(0, -400, 560);
  cam.lookAt(0, 0, 0);

  // Amplitude analizcisi oluştur
  amp = new p5.Amplitude();
  
  ground = new Ground(600, 10000);  // Zemin
  player = new Player(0);  // Oyuncu (araba)

  // Engeller oluştur
  for (let i = 0; i < totalObstacles; i++) {
    let lanePositions = [-150, 0, 150];
    let laneIndex = floor(random(lanePositions.length));
    let xPos = lanePositions[laneIndex];
    obstacles.push(new Obstacle(xPos, 0, -3000 - i * 400));
  }

  // Collectable'lar oluştur
  for (let i = 0; i < totalCollectables; i++) {
    let lanePositions = [-150, 0, 150];
    let laneIndex = floor(random(lanePositions.length));
    let xPos = lanePositions[laneIndex];
    collectables.push(new Collectable(xPos, 0, -3000 - i * 400));
  }

  // Binaları oluştur: ground'un sağında ve solunda yer alacak şekilde
  for (let i = 0; i < totalBuildings; i++) {
    let side = i % 2 === 0 ? 1 : -1;  // Sağ ve sol yerleşimi
    let x = side * (ground.width / 2 + random(50, 100));  // Binalar ground'un dışında yer alacak
    let z = random(-3000, -500);  // Uzaklığa göre binalar
    let width = random(50, 100);
    let height = random(100, 300);
    buildings.push(new Building(x, z, width, height));
  }

  technoMusic.loop();
  startGame();
}

function draw() {
  if (!gameStarted) {
    return;
  }

  background(Color.DeepBlack.rgb);  // Neon arka plan

  // Işıklandırma
  ambientLight(50, 50, 50);  // Loş ortam ışığı
  pointLight(255, 255, 255, 0, -300, 400);  // Nokta ışığı
  directionalLight(255, 255, 255, 0.5, 0.5, -1);  // Yönlü ışık

  // Zemin ve oyuncu çizimi
  ground.draw(player);
  player.draw();

  // Binaları çiz ve hareket ettir
  for (let i = 0; i < buildings.length; i++) {
    buildings[i].move(speed);
    buildings[i].draw();

    if (buildings[i].z > 500) {
      buildings[i].resetPosition();  // Bina ekrandan çıktığında geri gönder
    }
  }

  // Collectable'lar ve player çarpışma kontrolü
  for (let i = collectables.length - 1; i >= 0; i--) {
    collectables[i].move(speed);
    collectables[i].draw();

    if (collectables[i].z > 500) {
      collectables[i].resetPosition();
    }

    if (collectables[i].collidesWith(player)) {
      collectables[i].resetPosition();
      score += 10;
      document.getElementById('score').innerText = "Score: " + score;

      // Kick sound for collectable collection
      // kickSound.play();

      let laneKey = collectables[i].x === -150 ? 'left' : (collectables[i].x === 0 ? 'middle' : 'right');
      ground.triggerLaneColor(laneKey);
    }
  }

  // Obstacles rendering and collision detection
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

  // Oyun hızını ve FPS'yi göster
  document.getElementById('speedDisplay').innerText = nf(speed, 1, 1);
  document.getElementById('fpsDisplay').innerText = nf(frameRate(), 2, 0);

  analyzeMusicTempo();
}

function analyzeMusicTempo() {
  let level = amp.getLevel();
  speed = map(level, 0, 1, 10, 18);  // Müzik temposuna göre oyun hızı
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
