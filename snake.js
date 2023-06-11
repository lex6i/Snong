class Snake{
  constructor(r){
    this.pos = createVector(r.width/2, 10);
    this.leng = 4;
    this.dir = createVector(-1, 0);
    this.score = 0;
    this.segments = [];
    this.hit = false;
    
  }

  update(r, b){
    let prev = this.pos.copy();
    
    this.segments.unshift(prev.copy());

    while(this.segments.length>this.leng){
      this.segments.pop();
    }
    
    for(let i = 0; i < this.segments.length; i++){
      r.rect(this.segments[i].x, this.segments[i].y, 1, 1);
    }
    
    this.pos.x += this.dir.x;
    this.pos.y += this.dir.y;
    
    if(
        this.pos.x >= r.width || 
        this.pos.x < 0 ||
        this.pos.y >= r.height ||
        this.pos.y < 0
    ){
      this.hit = true; 
    }

    let c = r.get(this.pos.x, this.pos.y);
    
    if(this.pos.equals(b.pos)){
        this.leng++;
        this.score++;
        b.respawn(r);
     } else if(c[0]==255){
       this.hit = true;
     }

    r.rect(this.pos.x, this.pos.y, 1, 1);
    return r;
  }
}
