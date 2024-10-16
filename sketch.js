/***
 * 
 * GLOBAL COLOR
 * 
***/
const Color = {
  NeonPink: { hex: '#ff2a6d', rgb: 'rgb(255,42,109)' },
  NeonBlue: { hex: '#05d9e8', rgb: 'rgb(5,217,232)' },
  NeonPurple: { hex: '#8f00ff', rgb: 'rgb(143,0,255)' },
  NeonGreen: { hex: '#39ff14', rgb: 'rgb(57,255,20)' },
  DeepBlack: { hex: '#01012b', rgb: 'rgb(1,1,43)' },

  lineEffect: { x1: 'rgb(255, 0, 255)', x2: 'rgb(0, 255, 255)', x3: 'rgb(255, 255, 0)' }
};

let cam;
let ground;
let player;
let collectables = [];
let obstacles = [];
let speed = 5;
let gameStarted = false;
let totalObstacles = 5;
let totalCollectables = 5;
let score = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  cam = createCamera();
  cam.setPosition(0, -400, 560);
  cam.lookAt(0, 0, 0);

  ground = new Ground(600, 10000);
  player = new Player(0);

  for (let i = 0; i < totalObstacles; i++) {
    let lanePositions = [-150, 0, 150];
    let laneIndex = floor(random(lanePositions.length));
    let xPos = lanePositions[laneIndex];
    obstacles.push(new Obstacle(xPos, 0, -200 - i * 400));
  }

  for (let i = 0; i < totalCollectables; i++) {
    let lanePositions = [-150, 0, 150];
    let laneIndex = floor(random(lanePositions.length));
    let xPos = lanePositions[laneIndex];
    collectables.push(new Collectable(xPos, 0, -200 - i * 400));
  }

  startGame();
}

function draw() {
  if (!gameStarted) {
    return;
  }

  background(Color.DeepBlack.rgb);

  // Neon teması için karanlık ışık ayarları
  ambientLight(20, 20, 20);  // Daha karanlık bir ambiyans ışığı
  pointLight(255, 255, 255, 0, -300, 400);  // Nokta ışığı, objelere odaklı
  directionalLight(100, 100, 100, 0.5, 0.5, -1);  // Düşük yoğunlukta yönlü ışık

  // Objeler için parlaklık ve yüzey özellikleri
  specularMaterial(150);  // Objelerin daha az parlak olması için düşük değer
  shininess(150);  // Parlaklık yüzeyi için orta düzeyde parlaklık

  ground.draw(player);
  player.draw();

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

      // Şerit çizgisi kırmızı yapılıyor
      let laneKey = collectables[i].x === -150 ? 'left' : (collectables[i].x === 0 ? 'middle' : 'right');
      ground.triggerLaneColor(laneKey);  // Şerit anahtarlarını kullan
    }
  }

  // Obstacle'lar ve player çarpışma kontrolü
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
