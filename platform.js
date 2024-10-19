class Platform {
     constructor(startX, startY, gap, collectableSize, obstacleSize) {
       this.startX = startX;
       this.startY = startY;
       this.gap = gap; // Aradaki boşluk
       this.collectableSize = collectableSize;
       this.obstacleSize = obstacleSize;
       this.collectables = [];
       this.obstacles = [];
   
       this.setup();
     }
   
     setup() {
       // Collectable'ları diz
       for (let i = 0; i < 3; i++) {
         this.collectables.push(new Collectable(this.startX + i * (this.collectableSize + this.gap), this.startY, this.collectableSize));
       }
   
       // Collectable'ların sonuna obstacle ekle
       this.obstacles.push(new Obstacle(this.startX + 3 * (this.collectableSize + this.gap), this.startY, this.obstacleSize));
     }
   
     draw() {
       push();
       rotateY(HALF_PI); // 90 derece (π/2) Y ekseni etrafında döndürme
   
       this.collectables.forEach(collectable => {
         collectable.draw();
       });
   
       this.obstacles.forEach(obstacle => {
         obstacle.draw();
       });
   
       pop();
     }
   }
   