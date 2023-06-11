class Ball{
	constructor(pos, vel){
		this.pos = pos;
		this.vel = vel;
		this.prevPos = pos;

		this.score1 = 0;
		this.score2 = 0;
	}

	update(r){
		this.prevPos = this.pos.copy();
		if(frameCount%4==0){
			this.pos.x += this.vel.x;
			this.pos.y += this.vel.y;

			if(this.pos.y >= r.height){
				this.pos.y -= this.vel.y;
				this.vel.y *= -1;
				this.pos.y += this.vel.y;
			}

			if(this.pos.y < 0){
				this.pos.y -= this.vel.y;
				this.vel.y *= -1;
				this.pos.y += this.vel.y;
			}

			if(this.pos.x >= r.width){
				this.score2++;
				this.respawn(r);
			}

			if(this.pos.x < 0){
				this.score1++;
				this.respawn(r);
			}

			let c = r.get(int(this.pos.x), int(this.pos.y));
			if(c[1] == 255){
				let vBlock = 
					r.get(
						int(this.pos.x), 
						int(this.pos.y+(this.vel.y*-1))
					)[0]==255;
				let hBlock =
					r.get(
						int(this.pos.x + (this.vel.x*-1)), 
						int(this.pos.y)
					)[0]==255;

				this.pos.x -= this.vel.x;
				this.pos.y -= this.vel.y;

				if(vBlock && hBlock){
					this.vel.x *= -1;
					this.vel.y *= -1;
				} else if (hBlock){
					this.vel.y *= -1;
				} else if (vBlock){
					this.vel.x *= -1;
				} else {
					this.vel.x *= -1;
					this.vel.y *= -1;
				}

				this.pos.x += this.vel.x;
				this.pos.y += this.vel.y;
			}



		}
		r.rect(this.pos.x, this.pos.y, 1, 1);
		return r;
	}

	respawn(r){
		this.pos.x = r.width/2;
		this.pos.y = r.height/2;

		this.vel.x = random(1)<0.5 ? 1 : -1;
		this.vel.y = random(1)<0.5 ? 1 : -1;
	}
}
