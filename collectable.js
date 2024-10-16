class Collectable {
  #_startColor;
  #_endColor;
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.baseSize = 30;  // Collectable'ın temel boyutu
    this.size = this.baseSize;
    this.scaleOffset = random(1000);  // Ölçek animasyonu için başlangıç
    this.scaleSpeed = 0.05;  // Ölçekleme hızı
    this.colorStep = 0;  // Renk geçişi için başlangıç
    this.colorSpeed = 0.02;  // Renk geçiş hızı

    this.#_startColor = Color.NeonPink.rgb;
    this.#_endColor = Color.NeonGreen.rgb;
  }

  draw() {
    // Renk geçişi ayarı
    let startColor = color(this.#_startColor);  // NeonPink
    let endColor = color(this.#_endColor);  // NeonBlue
    let currentColor = lerpColor(startColor, endColor, sin(this.colorStep));  // Renk geçişi

    // Renk geçişi adımını artır
    this.colorStep += this.colorSpeed;

    // Basit nefes alma animasyonu (büyüme/küçülme)
    this.size = this.baseSize + sin(this.scaleOffset) * 5;  // Ölçekleme
    this.scaleOffset += this.scaleSpeed;

    push();
    translate(this.x, this.y, this.z);
    fill(currentColor);
    noStroke();
    sphere(this.size);  // Küreyi çiz
    pop();
  }

  move(speed) {
    this.z += speed;  // Z ekseninde oyuncuya doğru hareket eder
  }

  resetPosition() {
    this.z = -2000;  // Nesne ekran dışına çıktığında yeniden pozisyonlanır
  }

  collidesWith(player) {
    let d = dist(this.x, this.y, this.z, player.x, player.y, player.z);
    return d < this.size;  // Çarpışma kontrolü
  }
}
