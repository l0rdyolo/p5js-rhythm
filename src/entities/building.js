class Building {
     constructor(x, z, height, width) {
       this.x = x;
       this.z = z;
       this.height = height;
       this.width = width;
       this.color = color(20, 0, random(50, 255));
       this.windowRows = floor(random(3, 6));
       this.windowCols = floor(random(2, 4));
       this.windows = this.createWindows();
     }
   
     createWindows() {
       let windows = [];
       for (let row = 0; row < this.windowRows; row++) {
         let windowRow = [];
         for (let col = 0; col < this.windowCols; col++) {
           let lightOn = random() > 0.3;
           windowRow.push(lightOn);
         }
         windows.push(windowRow);
       }
       return windows;
     }
   
     draw() {
       push();
       let perspectiveScale = map(this.z, -3000, 500, 0.5, 1.5);
       let width = this.width * perspectiveScale;
       let height = this.height * perspectiveScale;
       let alpha = map(this.z, -3000, 500, 50, 255);
       fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], alpha);
       translate(this.x, -height / 2, this.z);
       noStroke();
       box(width, height, width);
       this.drawWindows(width, height);
       pop();
     }
   
     drawWindows(width, height) {
       let windowWidth = width / (this.windowCols + 1);
       let windowHeight = height / (this.windowRows + 1);
       let windowPadding = 5;
   
       for (let row = 0; row < this.windowRows; row++) {
         for (let col = 0; col < this.windowCols; col++) {
           let windowX = -width / 2 + (col + 1) * windowWidth;
           let windowY = -height / 2 + (row + 1) * windowHeight;
           let lightOn = this.windows[row][col];
           fill(lightOn ? color(255, 255, 0, 200) : color(50, 50, 50, 100));
           rect(windowX - windowWidth / 2 + windowPadding, windowY - windowHeight / 2 + windowPadding, windowWidth - windowPadding * 2, windowHeight - windowPadding * 2);
         }
       }
     }
   
     move(speed) {
       this.z += speed;
       if (this.z > 500) {
         this.resetPosition();
       }
     }
   
     resetPosition() {
       this.z = -3000;
       this.height = random(100, 300);
       this.width = random(50, 100);
       this.color = color(20, 0, random(50, 255));
       this.windows = this.createWindows();
     }
   }
   