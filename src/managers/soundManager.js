class SoundManager {
     constructor(music, baseSpeed, maxSpeed) {
       this.music = music;
       this.amplitude = new p5.Amplitude();

       this.setup();
     }
     
     setup() {
       this.music.loop();
     }
   }
   