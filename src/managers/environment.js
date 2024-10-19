class Environment {
  constructor(sky, terrain, ground) {
    this.sky = sky;         
    this.terrain = terrain; 
    this.ground = ground;   
  }

  update(gameSpeed) {
    this.terrain.update(gameSpeed);  // Terrain güncelleniyor
  }

  display(activeLaneIndex) {
    this.sky.display();     // Gökyüzü gösteriliyor
    this.terrain.display(); // Terrain gösteriliyor
    this.ground.draw(activeLaneIndex);  // Ground çiziliyor
  }
}
