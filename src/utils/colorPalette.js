class ColorPalette {
     constructor() {
       this.hueOffset = 0;
       this.hueSpeed = 0.1;
     }
   
     hsvToRgb(h, s, v) {
       let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
       return color(f(5), f(3), f(1));
     }
   
     waveColor(offset, frequency = 0.1) {
       const hue = (this.hueOffset + offset) % 360;
       this.hueOffset += this.hueSpeed;
   
       const saturation = 1;
       const brightness = 1;
   
       return this.hsvToRgb(hue, saturation, brightness);
     }
   

     updateHueSpeed(speed) {
       this.hueSpeed = map(speed, 7, 15, 0.1, 0.5);  
     }
   }
   