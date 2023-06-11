class Paddle{
  constructor(pos, w, h, dir){
    this.pos = pos;
    this.pos.y = (pos.y/2) - (h/2);
    
    this.vel = createVector(0, 0);
    
    this.w = w;
    this.h = h;
    this.dir = dir;
    
    this.stray = 0.0;
    
    this.prevPos = createVector(0,0);
  }
  
  update(r, prevFrame, ball){
    this.prevPos = this.pos.copy();
    
    if(frameCount%3 == 0){
      if(ball.vel.x == this.dir){
        if(ball.pos.y-this.h/2 > this.pos.y) this.pos.y++;
        else this.pos.y--;
      } else { 
        if(this.pos.y > r.height/2-(sin(this.stray))*4) this.pos.y--;
        if(this.pos.y < r.height/2+(sin(this.stray*-1)*4)) this.pos.y++;
        
        this.stray+=TWO_PI/30;
      }
  
      if(this.pos.y < 0) this.pos.y = 0;
      if(this.pos.y > r.height-this.h) this.pos.y = r.height-this.h;
      
    }
    
    if(!this.prevPos.equals(this.pos)){
       if(this.prevPos.y > this.pos.y){
          if(prevFrame.get(int(this.pos.x), int(this.pos.y-1)) == color(255)){
              this.pos = this.prevPos.copy();
          }
       } else {
         if(prevFrame.get(int(this.pos.x), int(this.pos.y+this.h)) == color(255)){
            this.pos = this.prevPos.copy();
         }
       }
    }
    
    r.rect(this.pos.x, this.pos.y, this.w, this.h);
    return r;
  }
}