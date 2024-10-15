class LaneLine {
     constructor(positionX, depth, key, color = 'black') {
       this.positionX = positionX;  // Çizginin x koordinatı
       this.depth = depth;  // Çizginin uzunluğu
       this.key = key;  // Çizginin adı (a, b, c, d)
       this.color = color;  // Çizginin rengi
       this.active = false;  // Çizginin aktif olup olmadığını kontrol eder
     }
   
     draw() {
       strokeWeight(15);  // Çizginin kalınlığı
       stroke(this.active ? 'red' : this.color);  // Aktifse kırmızı, değilse siyah çiz
   
       push();
       translate(this.positionX, 95, 0);  // Çizgiyi pozisyonuna taşı
       rotateX(HALF_PI);  // 90 derece döndür
       line(0, -this.depth / 2, 0, this.depth / 2);  // Çizgi çizilir
       pop();
     }
   
     activate() {
       this.active = true;  // Çizgiyi kırmızı yapar
     }
   
     deactivate() {
       this.active = false;  // Çizgiyi normal rengine döndürür
     }
   }
   