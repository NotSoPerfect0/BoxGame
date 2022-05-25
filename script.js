// Declarations & qol
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = (Math.floor(window.innerWidth/50) * 50) - 50;
canvas.height = (Math.floor(window.innerHeight/50) * 50) - 50;
let cw = canvas.width;
let ch = canvas.height;
const ts = 50;
let score = 0;
const flags = 2;
let flagList = [];

// Player object info
let x = 0;
let y = 0;
let xv = 50;
let yv = 50;
let color = "#00FF00";

window.addEventListener("resize", resize);
window.addEventListener("keydown", keyDown);

// Collectible info
let fx = Math.floor(Math.random() * (cw/50)) * 50;
let fy = Math.floor(Math.random() * (ch/50)) * 50;
let fColor = "#a020F0";

// Collectible Class
function Flag(fx, fy, fColor) {
	this.fx = fx;
	this.fy = fy;
	this.fColor = fColor;

	this.collect = function() {
	    this.fx = Math.floor(Math.random() * (cw/50)) * 50;
	    this.fy = Math.floor(Math.random() * (ch/50)) * 50;
	    score++;
	    console.log("Score: " + score)
	    document.title = "Score: " + score;
	}
	
	this.draw = function() {
		c.beginPath();
		c.rect(this.fx, this.fy, ts, ts);
		c.strokeStyle = this.fColor;
		c.stroke();
	}

	this.update = function() {
		if (x == this.fx && y == this.fy) {
			this.collect()
    	}

		this.draw()
	}
}

// Key Handling
function keyDown(event) {
    switch(event.key) {
        case "w":
            if (!y == 0) {
                y -= yv;
            }
            break;
        case "s":  
            if (y != (ch - ts)) {
                y += yv;
            }
            break;
        case "a":
            if (!x == 0) {
                x -= xv;
            }
            break;
        case "d":
            if (x != (cw - ts)) {
                x += xv;
            }
            break;
    }
}

// Resizes the canvas when the window is resized
function resize() {
    canvas.width = (Math.floor(window.innerWidth/50) * 50) - 50;
    canvas.height = (Math.floor(window.innerHeight/50) * 50) - 50;
    cw = canvas.width;
    ch = canvas.height;
    x = 0;
    y = 0;

	for (i = 0; i > flagList.length; i++) {
		flagList[i].fx = Math.floor(Math.random() * (cw/50)) * 50;
		flaglist[i].fy = Math.floor(Math.random() * (ch/50)) * 50;
	}
}

// Draws the canvas
function draw() {
	requestAnimationFrame(draw);
    c.clearRect(0, 0, cw, ch);
    c.beginPath();
    c.strokeStyle = color;
    c.rect(x, y, ts, ts);
    c.stroke();
	for (i = 0; i < flagList.length; i++) {
		flagList[i].update()
	}
}

window.onload = function() {
    resize()
    draw()

	for (i = 0; i < flags; i++) {
		fx = Math.floor(Math.random() * (cw/50)) * 50;
		fy = Math.floor(Math.random() * (ch/50)) * 50;
		fColor = "#a020F0";

		flagList.push(new Flag(fx, fy, fColor));
	}
}