class LaneLineManager {
     constructor(width, depth) {
       this.width = width;
       this.depth = depth;
       this.lines = [];
   
       // LaneLine örneklerini oluştur ve yöneticiye ekle
       this.lines.push(new LaneLine(-this.width / 2, this.depth, 'a'));   // a çizgisi (sol)
       this.lines.push(new LaneLine(-this.width / 6, this.depth, 'b'));   // b çizgisi (orta sol)
       this.lines.push(new LaneLine(this.width / 6, this.depth, 'c'));    // c çizgisi (orta sağ)
       this.lines.push(new LaneLine(this.width / 2, this.depth, 'd'));    // d çizgisi (sağ)
     }
   
     draw() {
       this.lines.forEach(line => line.draw());
     }
   
     activateLines(keys) {
       // Verilen çizgi anahtarlarına göre çizgileri kırmızıya döndür
       this.lines.forEach(line => {
         if (keys.includes(line.key)) {
           line.activate();
         }
       });
   
       // 1 saniye sonra çizgileri deaktive et
       setTimeout(() => {
         this.lines.forEach(line => line.deactivate());
       }, 1000);
     }
   }
   