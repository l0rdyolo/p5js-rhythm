class Collideable {
     constructor(xOffset, yOffset, zOffset, size, parent) {
       this.parent = parent;
       this.offset = createVector(xOffset, yOffset, zOffset);  
       this.size = size;
       this.position = this.offset.copy().add(this.parent.position);  

       this._isCollided = false;
     }
   
     move(platformPos) {
       this.position = this.offset.copy().add(platformPos);  
     }
   
     getBoundingBox() {
       return {
         minX: this.position.x - this.size / 2,
         maxX: this.position.x + this.size / 2,
         minY: this.position.y - this.size / 2,
         maxY: this.position.y + this.size / 2,
         minZ: this.position.z - this.size / 2,
         maxZ: this.position.z + this.size / 2
       };
     }
   
     isCollide(target) {
       let box1 = this.getBoundingBox();
       let box2 = target.getBoundingBox();
   
       return !(
         box1.maxX < box2.minX ||
         box1.minX > box2.maxX ||
         box1.maxY < box2.minY ||
         box1.minY > box2.maxY ||
         box1.maxZ < box2.minZ ||
         box1.minZ > box2.maxZ
       );
     }

     draw(){
        if(this._isCollided) return;
     }

     collide(target){
      this._isCollided;
     }
   }
   