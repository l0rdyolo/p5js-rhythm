let environment;
let player;
let platform;
let gameSpeed;
let cameraX = 0;
let technoMusic;
let soundVisualizer;
let score = 0;
let platforms = [];

const BASE_SPEED = 5;  // Oyun için temel hız
const MAX_SPEED = 20;   // Maksimum oyun hızı

function preload() {
  // Müziği yüklüyoruz
  technoMusic = loadSound(GameConfig.music.src);
}

function setup() {
  // Ana canvas'ı oluşturuyoruz
  createCanvas(GameConfig.canvas.size, 400, WEBGL);
  pixelDensity(GameConfig.canvas.pixelDensity);
  colorMode(RGB, 255, 255, 255, 1);

  // SoundVisualizer nesnesini başlatıyoruz, müziği parametre olarak veriyoruz
  soundVisualizer = new SoundVisualizer(technoMusic, GameConfig.canvas.size, 200);
  soundVisualizer.setup();  // Müzik döngüye alınıyor ve analiz başlıyor

  // Environment, Player ve Platform nesnelerini oluşturuyoruz
  environment = new Environment(
    new Sky(GameConfig.sky),
    new Terrain(GameConfig.terrain),
    new Ground(GameConfig.ground)
  );
  player = new Player(GameConfig.player);
  platform = new Platform(GameConfig.platform);
}

function draw() {
  background(GameConfig.colors.background);  // Arka plan rengini config'ten alıyoruz

  // Amplitüd ile oyun hızını dinamik olarak ayarlıyoruz
  let level = soundVisualizer.amplitude.getLevel();
  gameSpeed = map(level, 0, 1, BASE_SPEED, MAX_SPEED);  // Ses seviyesine göre hız ayarı (min 10, max 30)

  // Kamerayı oyuncuya göre ayarlıyoruz
  cameraX = lerp(cameraX, player.x, 0.1);
  cam = createCamera();
  cam.setPosition(cameraX, -30, 100);
  cam.lookAt(cameraX, -30, 0);

  // Player ve platformları çiziyoruz
  player.draw();

  platforms.forEach((platform) => {
    platform.move(gameSpeed * -1);
    platform.draw();

    if (platform.position.x < GameConfig.platformsProps.resetX) {
      platform.position.x = GameConfig.platformsProps.startX;
    }
  });

  // Ortam ve hız güncellemesi
  environment.update(gameSpeed);
  environment.display(player.currentLane);

  // Ses dalgalarını ve frekans spektrumunu HTML'deki div'e çiziyoruz
  soundVisualizer.draw();

  // Oyun istatistiklerini güncelliyoruz
  updateStats(gameSpeed);
}

// Klavye ile şerit değiştirme
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move('left');
  } else if (keyCode === RIGHT_ARROW) {
    player.move('right');
  }
}

// Oyun istatistiklerini güncelleyen fonksiyon
function updateStats(gameSpeed) {
  document.getElementById('speedDisplay').innerHTML = `Speed: ${(gameSpeed * 10).toFixed(0)}`;  // Nokta kaldırıldı
  document.getElementById('fpsDisplay').innerHTML = `FPS: ${frameRate().toFixed(0)}`;           // FPS'de de nokta kaldırıldı
  document.getElementById('score').innerHTML = `Score: ${score}`;  // Skor zaten tam sayı
}


