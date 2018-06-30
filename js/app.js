// Enemies our player must avoid
const Enemy = function(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //x axis
    this.x += this.speed * dt;

    //condition for off the canvas sprites
    if(this.x > 500){
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random()*200);
    }

    //if player and enemies collide
    if(player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
        player.x = 200;
        player.y = 400;  
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function (x,y){
    this.x = x;
    this.y = y;

    this.player = 'images/char-boy.png';
}   

Player.prototype.update = function(dt){

}

Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

Player.prototype.handleInput = function (pressedKey){

    if(pressedKey === 'left' && this.x > 0){
        this.x -= 101;
    }
    if(pressedKey === 'right' && this.x < 400){
        this.x += 101;
    }
    if(pressedKey === 'up' && this.y > 0){
        this.y -= 84.16;
    }
    if(pressedKey === 'down' && this.y < 400){
        this.y +=84.16
    }

    //reset position of play once reached top of page
    if(this.y < 0){
        setTimeout(()=>{
            this.x = 200;
            this.y = 400;
        }, 200);
    }

}



// declare empty array to place all enemies
let allEnemies = [];

//enemies' position on tiles
const enemyPosition = [60, 150, 230];

enemyPosition.forEach((yPosition)=>{
    const enemy = new Enemy(0, yPosition, 200);
    allEnemies.push(enemy);
})

//starting position of the player
const player = new Player(200, 400);



// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
