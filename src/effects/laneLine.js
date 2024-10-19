class LaneLine {
  constructor(positionX, depth, key, color = Color.DeepBlack.hex) {
    this.positionX = positionX;  // Çizginin x koordinatı
    this.depth = depth;  // Çizginin uzunluğu
    this.key = key;  // Çizginin adı (a, b, c, d)
    this.color = color;  // Çizginin varsayılan rengi
    this.active = false;  // Çizginin aktif olup olmadığını kontrol eder
    
    // Yanıp sönme sırasında geçilecek renkler Color paletinden alınır
    this.colors = [Color.lineEffect.x1, Color.lineEffect.x2, Color.lineEffect.x3];  
    this.currentColorIndex = 0;  // Şu anki renk indeksi
    this.blinkingInterval = null;  // Yanıp sönme işlemi için interval ID
  }

  draw() {
    strokeWeight(15);  // Çizginin kalınlığı
    stroke(this.active ? this.colors[this.currentColorIndex] : this.color);  // Aktifse yanıp sönen renkler, değilse varsayılan çizgi rengi

    push();
    translate(this.positionX, 95, 0);  // Çizgiyi pozisyonuna taşı
    rotateX(HALF_PI);  // 90 derece döndür
    line(0, -this.depth / 2, 0, this.depth / 2);  // Çizgi çizilir
    pop();
  }

  activate() {
    this.active = true;  // Çizgiyi aktif yapar
    this.startBlinking();  // Yanıp sönme başlatılır
  }

  deactivate() {
    this.active = false;  // Çizgiyi normal rengine döndürür
    clearInterval(this.blinkingInterval);  // Yanıp sönme durdurulur
    this.blinkingInterval = null;
    this.currentColorIndex = 0;  // Renk indeksini sıfırla
  }

  startBlinking() {
    // Yanıp sönme işlemi için renkler arasında geçiş yap
    this.blinkingInterval = setInterval(() => {
      this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    }, 300);  // Her 300 milisaniyede bir renk değişir
  }
}
