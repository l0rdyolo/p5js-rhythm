class Building {
     constructor(x, z, width, height) {
       this.x = x;
       this.z = z;  // Binaların başlangıç z pozisyonu (oyuncuya doğru hareket edecek)
       this.width = width;
       this.height = height;
       this.color = color(20, 0, random(50, 255));  // Dinamik neon renkler
       this.windowRows = floor(random(3, 6));  // Pencere satır sayısı (yükseklik boyunca)
       this.windowCols = floor(random(2, 4));  // Pencere sütun sayısı (genişlik boyunca)
       this.windows = this.createWindows();  // Pencereler oluşturulur
     }
   
     // Pencerelerin oluşturulması
     createWindows() {
       let windows = [];
       for (let row = 0; row < this.windowRows; row++) {
         let windowRow = [];
         for (let col = 0; col < this.windowCols; col++) {
           let lightOn = random() > 0.3;  // Her pencere %70 olasılıkla sarı ışık saçacak
           windowRow.push(lightOn);
         }
         windows.push(windowRow);
       }
       return windows;
     }
   
     // Bina çizimi
     draw() {
       push();
       translate(this.x, -this.height / 2, this.z);  // Bina zeminden yükselir
       fill(this.color);
       noStroke();
       box(this.width, this.height, this.width);  // Bina bir kutu (box) olarak çizilir
   
       // Pencereleri çizelim
       this.drawWindows();
       pop();
     }
   
     // Pencereleri çizme fonksiyonu (3D yüzeylerde)
     drawWindows() {
       let windowWidth = this.width / (this.windowCols + 1);  // Pencereler arasında boşluk bırakılır
       let windowHeight = this.height / (this.windowRows + 1);
       let windowPadding = 5;  // Pencere kenar boşlukları
   
       // Bina ön yüzeyine pencereleri ekleyelim
       for (let row = 0; row < this.windowRows; row++) {
         for (let col = 0; col < this.windowCols; col++) {
           let windowX = -this.width / 2 + (col + 1) * windowWidth;
           let windowY = -this.height / 2 + (row + 1) * windowHeight;
           let lightOn = this.windows[row][col];  // Işık yanıyor mu kontrolü
           
           fill(lightOn ? color(255, 255, 0, 200) : color(50, 50, 50, 100));  // Işık açık mı (sarı), yoksa kapalı mı (koyu gri)
           noStroke();
           
           // Pencereleri bina ön yüzeyine çiz
           push();
           translate(windowX - windowWidth / 2 + windowPadding, windowY - windowHeight / 2 + windowPadding, this.width / 2 + 1);  // Ön yüzeye yerleştir
           plane(windowWidth - windowPadding * 2, windowHeight - windowPadding * 2);  // 2D pencereyi bina ön yüzeyine çiz
           pop();
         }
       }
     }
   
     // Binanın oyuncuya doğru hareket etmesi
     move(speed) {
       this.z += speed;
     }
   
     // Bina ekran dışına çıktığında pozisyon sıfırlama
     resetPosition() {
       this.z = -3000;  // Bina geriye resetlenir ve yeniden ekrana gelir
       this.height = random(100, 300);  // Farklı yüksekliklerde binalar oluşturulur
       this.width = random(50, 100);  // Farklı genişliklerde binalar oluşturulur
       this.color = color(20, 0, random(50, 255));  // Dinamik neon renkler
       this.windows = this.createWindows();  // Yeni pencereler oluşturulur
     }
   }
   