class Collectable {
  constructor(xOffset, yOffset, zOffset, size) {
    this.offset = createVector(xOffset, yOffset, zOffset);  // Platforma göre relatif pozisyon
    this.size = size;
    this.baseSize = size;  // Collectable'ın temel boyutu
    this.scaleOffset = random(1000);  // Ölçek animasyonu için başlangıç
    this.scaleSpeed = 0.05;  // Ölçekleme hızı
    this.colorStep = 0;  // Renk geçişi için başlangıç
    this.colorSpeed = 0.02;  // Renk geçiş hızı
  }

  move(platformPos) {
    // Collectable pozisyonunu platformun pozisyonuna göre günceller
    this.x = platformPos.x + this.offset.x;
    this.y = platformPos.y + this.offset.y;
    this.z = platformPos.z + this.offset.z;
  }

  draw() {
    // Basit nefes alma animasyonu (büyüme/küçülme)
    // this.size = this.baseSize + sin(this.scaleOffset) * 5;
    // this.scaleOffset += this.scaleSpeed;

    push();
    translate(this.x, this.y, this.z);  // Collectable'ı güncel pozisyonuna göre çizer
    fill(255, 0, 0);  // Rastgele bir renk örneği (kırmızı)
    noStroke();
    sphere(this.size);  // Collectable'ın şekli (küre)
    pop();
  }
}
