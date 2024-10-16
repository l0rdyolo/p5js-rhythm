class Player {
  constructor() {
    this.lanePositions = [-50, 0, 50]; // Şerit pozisyonları
    this.currentLane = 1; // Başlangıçta orta şeritte
    this.x = this.lanePositions[this.currentLane];
    this.y = -12.5;
    this.z = 70;
    this.targetX = this.x; // Hareket sırasında hedef X pozisyonu
    this.lerpAmount = 0.1; // Yumuşak geçiş için

    // Kutu şeklindeki oyuncu tanımları
    this.width = 20;
    this.height = 20;
    this.depth = 30;
    this.color = color(0, 0, 255); // Mavi kutu

    // Trail ayarları
    this.trail = [];
    this.trailLength = 10;
    this.trailSpeed = 10;
    this.offsetTrails = [
      { offsetX: -2, trail: [], amplitude: random(5, 12), frequency: random(0.02, 1), waveOffset: random(100) },
      { offsetX: 2, trail: [], amplitude: random(5, 12), frequency: random(0.02, 1), waveOffset: random(100) },
      { offsetX: -5, trail: [], amplitude: random(5, 12), frequency: random(0.02, 1), waveOffset: random(100) },
      { offsetX: 5, trail: [], amplitude: random(5, 12), frequency: random(0.02, 1), waveOffset: random(100) }
    ];
  }

  draw() {
    // Player X konumunu hedefe doğru yumuşak bir şekilde taşıyoruz
    this.x = lerp(this.x, this.targetX, this.lerpAmount);

    // Trail çizimi için yeni pozisyon ekleniyor
    this.trail.push({ x: this.x, y: this.y, z: this.z });

    if (this.trail.length > this.trailLength) {
      this.trail.shift(); // Eski trail parçalarını çıkar
    }

    // Offset trail için aynı işlemi yapıyoruz
    for (let i = 0; i < this.offsetTrails.length; i++) {
      this.offsetTrails[i].trail.push({
        x: this.x + this.offsetTrails[i].offsetX,
        y: this.y,
        z: this.z
      });

      if (this.offsetTrails[i].trail.length > this.trailLength) {
        this.offsetTrails[i].trail.shift(); // Trail uzunluğunu sınırlıyoruz
      }
    }

    // Trail'leri geriye doğru hareket ettiriyoruz
    for (let i = 0; i < this.trail.length; i++) {
      this.trail[i].z += this.trailSpeed; // Ana trail'in Z ekseninde geriye doğru hareketi
    }

    for (let i = 0; i < this.offsetTrails.length; i++) {
      for (let j = 0; j < this.offsetTrails[i].trail.length; j++) {
        this.offsetTrails[i].trail[j].z += this.trailSpeed;
      }
    }

    // Trail çizimi
    this.drawTrail(this.trail, color(255)); // Ana trail

    for (let i = 0; i < this.offsetTrails.length; i++) {
      this.drawTrailWithSineWave(
        this.offsetTrails[i].trail,
        color(150),
        this.offsetTrails[i].amplitude,
        this.offsetTrails[i].frequency,
        this.offsetTrails[i].waveOffset
      );
    }

    // Kutuyu (arabayı) çiziyoruz
    this.drawCar();

    // Sinüs dalgası ofsetini sürekli güncelle
    for (let i = 0; i < this.offsetTrails.length; i++) {
      this.offsetTrails[i].waveOffset += this.offsetTrails[i].frequency;
    }
  }

  drawCar() {
    push();
    translate(this.x, this.y, this.z);
    fill(this.color); // Mavi renkte kutu
    noStroke();
    box(this.width, this.height, this.depth); // Kutu çizimi
    pop();
  }

  // Trail çizim fonksiyonu
  drawTrail(trail, trailColor) {
    noFill();
    stroke(trailColor);
    strokeWeight(5);
    beginShape();
    for (let i = 0; i < trail.length; i++) {
      vertex(trail[i].x, trail[i].y, trail[i].z);
    }
    endShape();
  }

  // Sinüs dalgası ile trail çizme fonksiyonu
  drawTrailWithSineWave(trail, trailColor, amplitude, frequency, waveOffset) {
    noFill();
    stroke(trailColor);
    strokeWeight(5);
    beginShape();
    for (let i = 0; i < trail.length; i++) {
      let waveY = amplitude * sin(frequency * i + waveOffset);
      vertex(trail[i].x, trail[i].y + waveY, trail[i].z);
    }
    endShape();
  }

  move(direction) {
    if (direction === 'left' && this.currentLane > 0) {
      this.currentLane--;
    } else if (direction === 'right' && this.currentLane < this.lanePositions.length - 1) {
      this.currentLane++;
    }
    this.targetX = this.lanePositions[this.currentLane];
  }

  collidesWith(object) {
    let distance = dist(this.x, this.y, this.z, object.x, object.y, object.z);
    return distance < 50;
  }
}
