var level = 1,
		highlevel = 0,
		score = 0,
		highscore = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
		this.width = 80;
		this.height = 50;
		this.posX = Math.floor(Math.random() * 1010) - 100; // -100 allows for a negative starting position.
		this.posY;
		this.speed;
		this.set();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, level) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
		if (this.posX > 1111 && (this.row == 1 || this.row == 3 || this.row == 5))
				this.set();
		else if (this.posX < -90 && (this.row == 2 || this.row == 4))
				this.set();
		
		if (this.row == 2 || this.row == 4)
				this.posX -= (this.speed + 1);
		else
				this.posX += (this.speed + 1);
}

Enemy.prototype.set = function() {
		this.row = Math.floor(Math.random() * 5 + 1);
		switch (this.row) {
				case 1:
						this.posY = 60;
						this.posX = -100;
						this.speed = 4 + level;
						break;
				case 2:
						this.posY = 144;
						this.posX = 1150;
						this.speed = 4;
						break;
				case 3:
						this.posY = 228;
						this.posX = -100;
						this.speed = 5 + level;
						break;
				case 4:
						this.posY = 314;
						this.posX = 1150;
						this.speed = 3;
						break;
				case 5:
						this.posY = 396;
						this.posX = -100;
						this.speed = 3 + level;
						break;
		}
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

		this.set();
		this.sprite = 'images/char-horn-girl.png';
		this.width = 80;
		this.height = 50;
}

Player.prototype.set = function() {

		this.row = -1;
		this.posX = 505;
		this.posY = 570;
		this.successFlag = false;
}

Player.prototype.update = function() {

		// reset position upon success
		if (this.successFlag) {
				this.set();
				level++;
		}
		if (this.row == 6) {
				this.successFlag = true;
				score += 50;
		}
}

Player.prototype.render = function() {
		
		ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
		ctx.font = "36pt Impact";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
		ctx.clearRect(0, -101, 1200, 151);
		ctx.strokeText("Level " + level, 900, 50);
		ctx.strokeText("Score " + score, 0, 50);
		ctx.clearRect(0, 752, 1200, 400);
		ctx.strokeText("High Score " + highscore, 0, 800);
		ctx.strokeText("Highest Level " + highlevel, 745, 800);
}

Player.prototype.handleInput = function(keypressed) {

		switch (keypressed) {
				case "up":
						if (this.posY > 50) { // make sure you can't move outside the grid
								this.posY -= 83; // through trial and error 83 is the appropriate number of pixels to move
								this.row++;
						}
						break;
				case "right":
						if (this.posX < 800)
								this.posX += 101; // through trial and error 101 is the appropriate number of pixels to move
						break;
				case "down":
						if (this.posY < 500) {
								this.posY += 83;
								this.row--;
						}
						break;
				case "left":
						if (this.posX > 100)
								this.posX -= 101;
						break;
		}
}

Player.prototype.die = function() {
		if (level > highlevel)
				highlevel = level - 1;
		level = 1;
		if (score > highscore)
				highscore = score;
		score = 0;
		this.set();
}

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 10; i++)
		allEnemies.push(new Enemy());
// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
