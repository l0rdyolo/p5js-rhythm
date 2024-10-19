class Environment {
  constructor(sky, terrain, ground) {
    this.sky = sky;         // Sky instance
    this.terrain = terrain; // Terrain instance
    this.ground = ground;   // Ground instance
  }

  update(gameSpeed) {
    this.terrain.update(gameSpeed);  // Terrain güncelleniyor
    // Ground burada güncellenebilir (ihtiyaç varsa)
  }

  display(activeLaneIndex , gameSpeed) {
    this.sky.display();     // Gökyüzü gösteriliyor
    this.terrain.display(); // Terrain gösteriliyor
    this.ground.draw(activeLaneIndex);  // Ground çiziliyor
  }
}
