let canvasSize = 680;
let environment;
let player;
let colours;
let lanePositions = [-40, 0, 40];
let colorPalette;

let score = 0;
let fps = 0;
let speed = 4;
let tempo = 0;
let n = 1;  // Başlangıçta n değerimiz
let platform;
let baseSpeed = 2;  // Oyunun en düşük hızı
let gameSpeed = baseSpeed;
let cameraX = 0;  // Kamera x konumu

let grid = [
  [0, 1, 0],  // 1: Collectable
  [0, 1, 0],  // 1: Collectable
  [0, 1, 2]   // 1: Collectable, 2: Obstacle
];

// PlatformsProps nesnesi ile platform özelliklerini ayarlıyoruz
let platformsProps = {
  startX: 2500,   // Platformun başlama noktası
  resetX: -1000,  // Platform sıfırlama konumu, ekran dışına çıktığında tekrar başlayacak
  gap: 40,        // Platformlar arasında boşluk
  platformCount: 5  // Kaç tane platform kullanılacak
};

let platforms = [];
let technoMusic, amplitude, fft;
let tempoHistory = [];  // Tempo verilerini saklayacağımız dizi

function preload() {
  technoMusic = loadSound('assets/sounds/tecno.mp3');  // Müziği yüklüyoruz
}

function setup() {
  createCanvas(canvasSize, 400, WEBGL);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Müzik analizcileri başlatıyoruz
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  
  technoMusic.loop();  // Müziği döngüye al
  
  colorPalette = new ColorPalette();
  colours = [
    color(8, 44, 127),
    color(0, 255, 248),
    color(255, 0, 253),
    color(0, 29, 95),
  ];

  let skyInstance = new Sky(width * 2, height * 2, 350);
  let terrainInstance = new Terrain(70, 15, 40, 150, 5, color(102, 0, 102), color(0, 255, 248)); 
  let groundInstance = new Ground(100, 1500, 3, 5, colorPalette);
  
  environment = new Environment(skyInstance, terrainInstance, groundInstance);
  
  player = new Player(lanePositions, false);
}

function draw() {
  
  background(colours[0]);

  fps = frameRate();

  // Amplitüd ile tempo ölçümü
  let level = amplitude.getLevel();
  tempo = map(level, 0, 1, 1, 20);  // Daha geniş tempo aralığı
  
  // Oyunun hızı tempoya göre ayarlanıyor
  if (tempo > 1) {
    n = map(tempo, 1, 20, 1, 9);  // 1 ile 9 arasında genişletiyoruz
  } else {
    n = -map(tempo, 0.5, 1, 1, 9);
  }

  if (n > 0) {
    gameSpeed = 2 + log(n + 1) * 3;  // Hız artışı daha ani bir şekilde olur
  } else {
    gameSpeed = max(2, 2 + log(abs(n) + 1) * 2);  // Hız azalışı baseSpeed altına düşmez
  }

  // Kameranın X pozisyonunu smooth şekilde player'ı takip edecek şekilde ayarla
  cameraX = lerp(cameraX, player.x, 0.5);  // 0.1 ile smooth hareket sağlanıyor

  cam = createCamera();
  cam.setPosition(cameraX, -30, 100);  // Kamera player'ın X pozisyonuna göre ayarlanıyor
  cam.lookAt(cameraX, -30, 0);  // Kameranın odaklandığı yer de player'ın X pozisyonuna göre ayarlanıyor

  let activeLaneIndex = player.currentLane;
  player.draw();

  // Tüm platformları hareket ettir ve çiz
  platforms.forEach((platform) => {
    platform.move(gameSpeed * -1); 
    platform.draw(); 

    // Platform ekranın dışına çıktıysa sıfırla
    if (platform.position.x < platformsProps.resetX) {
      platform.position.x = platformsProps.startX;
    }
  });

  environment.update(gameSpeed);
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
  document.getElementById('tempoDisplay').innerHTML = `Tempo: ${nf(tempo, 2, 1)}`;
  document.getElementById('speedDisplay').innerHTML = `Speed: ${nf(gameSpeed, 2, 1)}`;
  document.getElementById('fpsDisplay').innerHTML = `FPS: ${nf(fps, 2, 2)}`;
  document.getElementById('score').innerHTML = `Score: ${score}`;
}
