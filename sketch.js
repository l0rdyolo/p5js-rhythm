let cam;
let ground;
let player;
let collectables = [];
let obstacles = [];
let totalSets = 10; // Başlangıçta 10 set obstacle ve collectable
let speed = 5; // Oyun hızı
let sound, fft;
let myFont; // Font değişkeni

function preload() {
  sound = loadSound('tecno.mp3'); // Müziği yükle
}

function setup() {
  createCanvas(600, 600, WEBGL);
  cam = createCamera();
  cam.setPosition(0, -400, 560);
  cam.lookAt(0, 0, 0);

  ground = new Ground(600, 10000);
  player = new Player(0);
  
  // İlk başta 10 set oluştur
  for (let i = 0; i < totalSets; i++) {
    spawnCollectableSet(i);
  }
  
  // Müzik analizi için FFT başlat
  fft = new p5.FFT();
  sound.loop(); // Müziği başlat ve döngüde çal
}

function draw() {
  background(200);

  // Müzik analizi ile oyunun hızını ayarla
  let spectrum = fft.analyze();
  let bassEnergy = fft.getEnergy("bass"); // Bas frekansların enerjisini al
  speed = map(bassEnergy, 0, 255, 7, 20); // Bas enerjisine göre hız belirle

  // FPS ve hız bilgilerini ekranın sol üst köşesinde göster
  displayStats();

  // Işıklandırma
  ambientLight(100, 100, 100);
  directionalLight(255, 255, 255, 0.25, 0.25, -1);

  ground.draw();
  player.draw();

  // Collectable ve Obstacle'ları çiz ve hareket ettir
  for (let i = collectables.length - 1; i >= 0; i--) {
    collectables[i].move(speed);
    collectables[i].draw();

    // Collectable'ları oyuncuya yaklaşırken kontrol et
    if (collectables[i].z > 500) {
      collectables[i].resetPosition(); // Geçen nesneleri yeniden konumlandır
    }

    // Çarpışma algılaması
    if (player.collidesWith(collectables[i])) {
        collectables[i].resetPosition(); // Geçen collectable'ı yeniden konumlandır
      console.log("Collectable toplandı!");
    }
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].move(speed);
    obstacles[i].draw();

    // Obstacle'ları oyuncuya yaklaşırken kontrol et
    if (obstacles[i].z > 500) {
      obstacles[i].resetPosition(); // Geçen nesneleri yeniden konumlandır
    }

    // Çarpışma algılaması
    if (player.collidesWith(obstacles[i])) {
      console.log("Game Over! Obstacle'a çarpıldı.");
      noLoop(); // Oyun biter
    }
  }
}

function displayStats() {
  // FPS ve hız bilgilerini HTML div öğelerinde göster
  document.getElementById('speed').innerText = "Speed: " + nf(speed, 1, 2);
  document.getElementById('fps').innerText = "FPS: " + floor(frameRate());
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move('left');
  } else if (keyCode === RIGHT_ARROW) {
    player.move('right');
  }
}

// Yeni bir collectable seti ve bazen obstacle spawn eden fonksiyon
function spawnCollectableSet(index) {
  let zPosition = -1000 - index * 800; // Setlerin başlangıç pozisyonları

  let availableLanes = [-150, 0, 150];

  // Rastgele bir şeridi seç ve collectable ekle
  let numCollectables = random([2, 3]); // Rastgele 2 veya 3 collectable
  for (let i = 0; i < numCollectables; i++) {
    let laneIndex = floor(random(availableLanes.length)); // Rastgele şerit seç
    let xPos = availableLanes[laneIndex]; // Şeridi al
    availableLanes.splice(laneIndex, 1); // Seçilen şeridi diziden çıkar

    collectables.push(new Collectable(xPos, 0, zPosition + i * 200)); // Collectable oluştur
  }

  // Eğer obstacle oluşturulacaksa, kullanılmayan şeritlerden birini seç
  if (random() < 0.5 && availableLanes.length > 0) {
    let laneIndex = floor(random(availableLanes.length)); // Rastgele kalan şeritlerden birini seç
    let obstacleX = availableLanes[laneIndex]; // Şeridi al
    availableLanes.splice(laneIndex, 1); // Seçilen şeridi diziden çıkar

    obstacles.push(new Obstacle(obstacleX, 0, zPosition + numCollectables * 200 + 100)); // Obstacle oluştur
  }
}
