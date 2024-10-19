class SoundVisualizer {
     constructor(music, width, height) {
       this.music = music;  // Müzik objesi
       this.amplitude = new p5.Amplitude();  // Ses seviyesi analizi
       this.fft = new p5.FFT();  // Frekans spektrumu analizi
       this.tempoHistory = [];  // Ses seviyesi verileri için
       this.width = width;  // Görüntüleyicinin genişliği
       this.height = height;  // Görüntüleyicinin yüksekliği
       this.visualizerDiv = document.getElementById('soundVisualizer');  // HTML div'i
       this.maxSpeed = 10;  // Maksimum oyun hızı
       this.baseSpeed = 2;  // Minimum oyun hızı
       this.setupVisualizerDiv();
     }
   
     setup() {
       this.music.loop();  // Müzik döngüye alınır
     }
   
     // Div'in canvas üzerine overlay olarak yerleşmesini sağlayan ayar
     setupVisualizerDiv() {
       this.visualizerDiv.style.position = 'absolute';
       this.visualizerDiv.style.top = '0';
       this.visualizerDiv.style.left = '0';
       this.visualizerDiv.style.zIndex = '10';  // Üstte durmasını sağlamak için
       this.visualizerDiv.style.pointerEvents = 'none';  // Etkileşim engellemek için
       this.visualizerDiv.style.width = `${this.width}px`;
       this.visualizerDiv.style.height = `${this.height}px`;
     }
   
     draw() {
       // Amplitude ile ses seviyesini analiz et
       let level = this.amplitude.getLevel();
       this.tempo = level;
   
       this.tempoHistory.push(level);
   
       // Çok fazla veri varsa eski verileri çıkar
       if (this.tempoHistory.length > this.width) {
         this.tempoHistory.splice(0, 1);
       }
   
       // Div'i temizle
       this.visualizerDiv.innerHTML = '';
   
       // SVG yapısı oluştur ve ses dalgalarını çiz
       let svgNS = 'http://www.w3.org/2000/svg';
       let svg = document.createElementNS(svgNS, 'svg');
       svg.setAttribute('width', this.width);
       svg.setAttribute('height', this.height);
   
       let polyline = document.createElementNS(svgNS, 'polyline');
       polyline.setAttribute('stroke', 'lime');
       polyline.setAttribute('fill', 'none');
       polyline.setAttribute('stroke-width', 2);
   
     //   let points = '';
     //   for (let i = 0; i < this.tempoHistory.length; i++) {
     //     let y = map(this.tempoHistory[i], 0, 0.5, this.height, 0);
     //     points += `${i},${y} `;
     //   }
     //   polyline.setAttribute('points', points.trim());
     //   svg.appendChild(polyline);
   
     //   this.visualizerDiv.appendChild(svg);
     }
   
     // Oyun hızını ses seviyesiyle ayarlayan fonksiyon
     calculateGameSpeed() {
       let level = this.amplitude.getLevel();  // Amplitude'den gelen seviyeyi al
       // Oyunun hızını ses seviyesine göre ayarla (min ve max limitler)
       let gameSpeed = map(level, 0, 1, this.baseSpeed, this.maxSpeed);
       return gameSpeed;
     }
   
     getTempo() {
       return this.tempo || 0;
     }
   }
   