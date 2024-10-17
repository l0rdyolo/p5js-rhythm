class Ground {
  constructor(width, length, laneCount, stripeWidth) {
    this.width = width; // Ground'un genişliği
    this.length = length; // Ground'un uzunluğu (oyuncunun önüne kadar uzanacak)
    this.laneCount = laneCount; // Şerit sayısı (her zaman 3 olacak)
    this.stripeWidth = stripeWidth; // Şerit çizgilerinin genişliği
    this.laneWidth = this.width / this.laneCount; // Her şeridin genişliği
    this.stripes = []; // Şerit çizgilerini saklayacağız
    this.initializeStripes();

    // Şeritler için renkleri tanımlıyoruz
    this.laneColors = [
      color(173, 216, 230), // A şeriti: Açık mavi
      color(135, 206, 235), // B şeriti: Açık gökyüzü mavisi
      color(176, 224, 230), // C şeriti: Bebek mavisi
    ];
  }

  initializeStripes() {
    // Şerit çizgilerinin X pozisyonlarını belirleyelim
    for (let i = 1; i < this.laneCount; i++) {
      let stripeX = -this.width / 2 + i * this.laneWidth; // Ortalayıp çiziyoruz
      this.stripes.push(stripeX); // Çizgi yerlerini kaydediyoruz
    }
  }

  draw(activeLaneIndex) {
    push();
    translate(0, -50, -500); // Ground, player'ın altında olacak şekilde ayarlandı

    // Şeritler için döngü
    for (let i = 0; i < this.laneCount; i++) {
      // Her şeriti kendi rengi ile dolduruyoruz
      if (i === activeLaneIndex) {
        fill(red(this.laneColors[i]), green(this.laneColors[i]), blue(this.laneColors[i]), 0.7 * 255); // Aktif şerit daha parlak
      } else {
        fill(red(this.laneColors[i]), green(this.laneColors[i]), blue(this.laneColors[i]), 0.3 * 255); // Diğer şeritler düşük opaklık
      }

      // Her şeriti çiz
      beginShape();
      vertex(-this.width / 2 + i * this.laneWidth, 0, 0); // Sol köşe
      vertex(-this.width / 2 + (i + 1) * this.laneWidth, 0, 0); // Sağ köşe
      vertex(-this.width / 2 + (i + 1) * this.laneWidth, 0, this.length); // Sağ arka köşe
      vertex(-this.width / 2 + i * this.laneWidth, 0, this.length); // Sol arka köşe
      endShape(CLOSE);
    }

    // Şerit çizgilerini çiz
    stroke(255); // Beyaz çizgiler
    strokeWeight(this.stripeWidth); // Şerit çizgilerinin kalınlığı
    for (let i = 0; i < this.stripes.length; i++) {
      line(this.stripes[i], 0, 0, this.stripes[i], 0, this.length); // X eksenindeki çizgiler
    }

    pop();
  }
}
