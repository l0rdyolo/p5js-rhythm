class Sky {
     constructor(width, height, horizon) {
       this.width = width;
       this.height = height;
       this.horizon = horizon;
       this.canvasSky = this.createSky();
       this.canvasSun = this.createSun();
     }
   
     createSky() {
       const sky = createGraphics(this.width, this.height);
       sky.noSmooth(); // Disable anti-aliasing for gradient
   
       // Draw gradient sky
       sky.noFill(); // No fill for the gradient
       for (let i = 0; i <= this.horizon; i++) {
         const inter = map(i, 0, this.horizon, 0, 1);
         const c = lerpColor(color(8, 44, 127), color(0, 0, 0), inter); // Gradient effect
         sky.stroke(c);
         sky.line(0, i, this.width, i);
       }
   
       // Add stars
       sky.noStroke(); // Remove stroke to avoid unwanted lines
       for (let i = 0; i < 100; i++) {
         const starColor = color(255, 255, 255, random(100, 255));
         sky.fill(starColor);
         sky.ellipse(random(0, this.width), random(0, this.horizon), random(1, 5));
       }
   
       return sky;
     }
   
     createSun() {
       const sun = createGraphics(500, 500);
       sun.smooth(); // Enable anti-aliasing for the sun
   
       sun.noFill(); // No fill for the sun gradient
       for (let i = 0; i <= sun.height; i++) {
         if (i % 10 >= 0 && i % 10 < 5) {
           sun.stroke(color(255, 0, 253)); // Neon pink
         } else {
           sun.stroke(color(0, 29, 95)); // Dark blue
         }
   
         const s = i * 2;
         const r = sun.width;
         const lineWidth = Math.sqrt((2 * s * r) - (s * s));
         const offset = (sun.width / 2) - (lineWidth / 2);
         sun.line(offset, i, lineWidth + offset, i);
       }
       return sun;
     }
   
     display() {
       // Display sky
       texture(this.canvasSky);
       noStroke();  // Remove any unnecessary strokes
       plane(this.width, this.height);
     }
   
     displaySun() {
       // Display sun
       texture(this.canvasSun);
       noStroke();  // Remove any strokes
       plane(1500);
     }
   }
   