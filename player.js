class Player {
  constructor() {
    this.lanePositions = [-150, 0, 150]; // x positions for left, middle, and right lanes
    this.currentLane = 1; // Start in the middle lane (index 1)
    this.x = this.lanePositions[this.currentLane]; // X pozisyonunu başlat
    this.y = 0;
    this.z = 200; // Sabit Z pozisyonu
    this.targetX = this.x; // Yeni hedef pozisyon
    this.trail = []; // Oyuncunun trail'ini tutmak için
    this.fakeSpeed = 5; // Z ekseninde sanal hareket hızı
  }

  draw() {
    // X pozisyonunu güncelle ve smooth hareket
    this.x = lerp(this.x, this.targetX, 0.1);

    // Trail'in Z ekseninde sürekli geriye gitmesini sağla
    for (let i = 0; i < this.trail.length; i++) {
      this.trail[i].z += this.fakeSpeed; // Trail'i geriye kaydır
      this.trail[i].alpha -= 5; // Zamanla alpha değeri azalsın (şeffaflık)
    }

    // Trail'deki alpha değeri 0'a ulaşan parçaları diziden kaldır
    this.trail = this.trail.filter(trailPart => trailPart.alpha > 0);

    // Oyuncunun pozisyonunu trail'e ekle
    this.trail.push({ x: this.x, y: this.y, z: this.z, alpha: 255 }); // Yeni iz başta tamamen görünür

    // Sanatsal trail çizimi
    for (let i = 0; i < this.trail.length; i++) {
      let trailPart = this.trail[i];

      // Renk (mavi) ve saydamlık ayarı (alpha)
      fill(100, 100, 255, trailPart.alpha);

      push();
      noStroke();
      translate(trailPart.x, trailPart.y, trailPart.z);
      sphere(20); // Küre şeklinde trail parçaları
      pop();
    }

    // Oyuncuyu çiz
    push();
    fill('blue');
    noStroke();
    translate(this.x, this.y, this.z); // Z sabit kalıyor
    sphere(22); // Oyuncu kutusu
    pop();
  }

  move(direction) {
    if (direction === 'left' && this.currentLane > 0) {
      this.currentLane--;
    } else if (direction === 'right' && this.currentLane < this.lanePositions.length - 1) {
      this.currentLane++;
    }
    this.targetX = this.lanePositions[this.currentLane]; // Yeni hedef pozisyon
  }
  
    // Çarpışma kontrolü (çok basit bir mesafe hesabı)
  collidesWith(object) {
    let distance = dist(this.x, this.y, this.z, object.x, object.y, object.z);
    return distance < 50; // Belirli bir mesafede çarpışma algılaması
  }
}
