// variables for the modal and modal button
var modal = document.getElementById('modal');

var btn = document.getElementById("play-again");

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // this variable used to determine the enemy bug's x and y axis
    this.x = x;
    this.y = y;

    // set initial speed of enemy bug 
    this.speed = 600;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 510) {
        this.x = -50;
        this.speed = 400 + Math.floor(Math.random() * 800);
    };

    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.reset();
    };
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {

    // Variables for the player to move along x and y axis 
    this.x = x;
    this.y = y;

    // using the boy character for the game
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// function to map arrow keys on keyboard to move the player
Player.prototype.handleInput = function (keyPress) {

    // binds left arrow key to go left
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };

    // binds right arrow key to go right
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };

    // binds up arrow key to go up
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    // binds down arrow key to go down
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };

    // if player reaches the water path, modal will pop up prompting if the player wants to play again, which then resets the player
    if (this.y < 0) {
        modal.classList.add("show");
        
        setTimeout(() => {
            btn.onclick = function() {
                modal.classList.remove("show");
                player.reset();
            }
        }, 200);
    };
};

//reset function to place the player back to the beginning 
Player.prototype.reset = function () {
    this.x = 202;
    this.y = 405;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

// enemy placed on each stone block path
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// player starting location
var player = new Player(202, 405);

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