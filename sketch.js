let r, prevFrame; // renderer
let ball, pad1, pad2, snake;

let font;

let isPlaying = false;
let scoreMenu = false;

let highScore = null;
let newHighScore = false;

let result = null;

function preload(){
	pixelFont = loadFont('assets/ARCADECLASSIC.TTF');
}

function setup() {
	createCanvas(540, 360);
	r = createGraphics(46,26);
	noSmooth();
	frameRate(15);

	textFont(pixelFont);

	pad1 = new Paddle(
		createVector(1, r.height),
		1, 6, -1
	);

	pad2 = new Paddle(
		createVector(r.width-2, r.height),
		1, 6, 1
	);

	ball = new Ball(
		createVector(r.width/2, r.height/2),
		createVector(
			random(1) < 0.5 ? 1 : -1,
			random(1) < 0.5 ? 1 : -1
		)
	);

	snake = new Snake(r);


	highScore = getLocalHighscore();
    if(!highScore) highScore = 0;
	console.log(highScore);

}

async function draw() {
	//	if(result || result == 0){
	//		if(result == "new"){
	//			newHighScore = true;
	//			highScore = snake.score;
	//			console.log("new high score" + result);
	//		}else {
	//			newHighScore = false;
	//			highScore = result;
	//		}
	//
	//		isPlaying = false;
	//		scoreMenu = true;
	//		result = null;


	//console.log(highScore);

	if(isPlaying){
		prevFrame = r;

		r.background(0);

		////Draw background;
		r.fill(111);
		let x = r.width/2;
		for(let y =0; y < r.height; y++){
			if(y%2==0){
				r.rect(x, y, 1, 1); 
			}
		}

		r.rect(0,0, r.width, 0);

		//s = font.drawNumbers(s, ball.score1, 17, 2, true);
		//s = font.drawNumbers(s, ball.score2, 26, 2, false);

		r.fill(255);
		r.noStroke();

		r = pad1.update(r, prevFrame, ball);
		r = pad2.update(r, prevFrame, ball);
		r = snake.update(r, ball);
		r = ball.update(r);

		background(0);
		image(r, 0, 0, width, height);

		if(snake.hit){
			isPlaying = false;
			scoreMenu = true;
			if(highScore < snake.score){
				newHighScore = true;
				highScore = snake.score;
				setLocalHighscore(highScore);
			}
		}
	} else if(scoreMenu){
		background(0);
		fill(255);
		textAlign(CENTER);
		textSize(60);
		text("You  lost", width/2, height/2);
		textSize(25);
		text("score  " + snake.score, width/2, height/2 + 40);
		text("press  space  to  restart", width/2, height/2 + 150);
		console.log(newHighScore);
		if(newHighScore){
			text("New  hi Score!", width/2, height-50);
		} else {
			text("Hi score   " + highScore, width/2, height-50);
		}
	} else { 
		background(0);
		fill(255);
		textAlign(CENTER);
		textSize(60);
		text("Snong", width/2, height/2);
		textSize(25);
		text("press  space  to  start", width/2, height/2 + 150);
		text("Hi score   " + highScore, width/2, height-50);
	}
}



function keyPressed(){
	let up    = createVector( 0, -1);
	let down  = createVector( 0,  1);
	let left  = createVector(-1,  0);
	let right = createVector( 1,  0);

	if(
		keyCode == 38 &&
		!snake.dir.equals(down)
	)   snake.dir = up;
	if(
		keyCode == 40 &&
		!snake.dir.equals(up)
	)   snake.dir = down;
	if(
		keyCode == 37 &&
		!snake.dir.equals(right)
	)   snake.dir = left;
	if(
		keyCode == 39 &&
		!snake.dir.equals(left)
	)   snake.dir = right;
	if(
		key == ' ' &&
		!isPlaying 
	){
		scoreMenu = false;
		isPlaying = true;
		newHighScore = false;
		reset();
	}
}

function reset(){
	pad1 = new Paddle(
		createVector(1, r.height),
		1, 6,
		-1
	);

	pad2 = new Paddle(
		createVector(r.width-2, r.height),
		1, 6,
		1
	);

	ball = new Ball(
		createVector(r.width/2, r.height/2),
		createVector(
			random(1) < 0.5 ? 1 : -1,
			random(1) < 0.5 ? 1 : -1
		)
	);

	snake = new Snake(r);

}

function getLocalHighscore() {
	value = getItem("snongHighscore");
	if(isNaN(value)) value = 0;
	return value;
}

function setLocalHighscore(hs) {
	highScore = hs;
	storeItem("snongHighscore", hs);
}
