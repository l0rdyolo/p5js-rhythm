class Background {
     constructor() {
       this.colors = {
         nightBlue: color(0), // Gece mavisi gökyüzü rengi
       };
   
       // Yıldızlı gökyüzünü oluştur
       this.canvasSky = this.drawSkyWithStars();
     }
   
     // Yıldızları içeren gökyüzünü çizme fonksiyonu
     drawSkyWithStars() {
       const horizon = height; // Yükseklik ayarı tüm ekranı kapsayacak
       const sky = createGraphics(width, height);
   
       // Gece mavisi gökyüzü oluştur
       sky.noFill();
       for (let i = 0; i <= horizon; i++) {
         sky.stroke(0);
         sky.line(0, i, width, i);
       }
   
       // Yıldızlar ekle
       sky.noStroke();
       sky.fill(255, 255, 255, random(100, 255)); // Beyaz yıldızlar
       for (let i = 0; i < 100; i++) {
         sky.ellipse(random(0, width), random(0, horizon / 2), random(1, 5)); // Farklı boyutlarda yıldızlar
       }
   
       return sky;
     }
   
     draw() {
       push();
       // Arka planı tüm oyun alanını kaplayacak şekilde genişletiyoruz
       translate(0, 0, -2000); // Kameradan uzaklaştırarak tam ekran yapıyoruz
       texture(this.canvasSky); // Yıldızlı gökyüzü dokusunu uygula
       noStroke();
       plane(width * 5, height * 5); // Ekran boyutuna göre daha büyük bir plane (düzlem) çiz
       pop();
     }
   }
   