class Platform {
     constructor(startX, startY, startZ, gap, collectableSize, obstacleSize) {
       this.position = createVector(startX, startY, startZ);  // Platformun merkezi pozisyonu
       this.gap = gap;  // Aradaki boşluk
       this.collectableSize = collectableSize;
       this.obstacleSize = obstacleSize;
       this.collectables = [];
       this.obstacles = [];
       this.resetX = 400;  // Platformun X'te resetleneceği pozisyon
   
       this.setup();
     }
   
     setup() {
       // Collectable'ları diz
       for (let i = 0; i < 3; i++) {
         let xOffset = i * (this.collectableSize + this.gap);
         this.collectables.push(new Collectable(xOffset, 0, 0, this.collectableSize));  // Platforma göre relatif pozisyon
       }
   
       // Collectable'ların sonuna obstacle ekle
       let obstacleXOffset = 3 * (this.collectableSize + this.gap);
       this.obstacles.push(new Obstacle(obstacleXOffset, 0, 0, this.obstacleSize));  // Platforma göre relatif pozisyon
     }
   
     move(speed) {
       this.position.x += speed;
   
       this.collectables.forEach((collectable, i) => {
         collectable.move(this.position.x);
       });
   
       this.obstacles.forEach((obstacle) => {
         obstacle.move(this.position.x);
       });
   
       if (this.position.x < -1000) {
         this.resetPosition();
       }
     }
   
     draw() {
       push();
       rotateY(HALF_PI);  
       
       this.collectables.forEach((collectable) => {
         collectable.draw(this.position);
       });
   
       this.obstacles.forEach((obstacle) => {
         obstacle.draw(this.position);
       });
   
       pop();
     }
   
     resetPosition() {
       this.position.x = this.resetX;
     }
   }
   