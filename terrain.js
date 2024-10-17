class Terrain {
     constructor(rows, cols, size, altitude, trench) {
       this.rows = rows;
       this.cols = cols;
       this.size = size;
       this.altitude = altitude;
       this.trench = trench;
       this.terrain = [];
       this.rowPosition = 0;
       this.flying = 0;
       this.flyingSpeed = 6;
   
       this.initializeTerrain();
     }
   
     initializeTerrain() {
       for (let y = 0; y < this.rows; y++) {
         this.terrain[y] = [];
         for (let x = 0; x < this.cols; x++) {
           this.terrain[y][x] = this.renderTerrainPoint(x, y);
         }
         this.rowPosition++;
       }
     }
   
     renderTerrainPoint(x, y) {
       let point;
   
       if (x === this.trench || x === (this.trench + 1)) {
         point = random(0, 0.2) * this.size;
       } else if (x === (this.trench - 1) || x === (this.trench + 2)) {
         point = map(noise(x, y), 0, 1, 0, 0.2) * this.altitude;
       } else {
         point = noise(x, y) * this.altitude;
       }
   
       return point;
     }
   
     update() {
       this.flying += this.flyingSpeed;
   
       if (this.flying >= this.size) {
         this.flying = 0;
         this.terrain.pop();
   
         const newRow = [];
         for (let x = 0; x < this.cols; x++) {
           newRow.push(this.renderTerrainPoint(x, this.rowPosition));
         }
         this.terrain.unshift(newRow);
         this.rowPosition++;
       }
     }
   
     display() {
       push();
       // Terrain'i hizalamak için daha doğru translate değerleri kullanıyoruz
       rotateX(PI / 2.12);
       translate(-220, -1600); // Zemin ve terrain hizalaması yapıldı
   
       for (let y = 0; y < this.rows - 1; y++) {
         beginShape(TRIANGLE_STRIP);
         for (let x = 0; x < this.cols; x++) {
           vertex(x * this.size, (y * this.size) + this.flying, this.terrain[y][x]);
           vertex(x * this.size, ((y + 1) * this.size) + this.flying, this.terrain[y + 1][x]);
         }
         endShape();
       }
   
       pop(); // Restore the transformation matrix to prevent affecting other objects
     }
   }
