// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
   this.x=x;
   this.y=y;
   this.speed=speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   this.x+=this.speed*dt;
   if(this.x>505){
     this.x=0;
   }

   collision(this);

    // You should multiply any movement by the  dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

//Collision function checks to see if the enemy and the player have made a contact
function collision(enemy){

 if(Math.abs(player.x-enemy.x)<40&&Math.abs(player.y-enemy.y)<40){
   console.log("Colide");

       player.x=202;
       player.y=380;
 }

  if(player.x<0){
    player.x=0;
  }
  if(player.y<0){

    player.x=202;
    player.y=380;
    alert("You won!");
  }
if(player.x>404){
  player.x=404;
}
 if(player.y>380){
   player.y=380;
 }
 console.log("player location:       "+"Bugg location" );
 console.log("x: "+player.x+" bugx:"+enemy.x);
 console.log("y: "+player.y+" bugy"+enemy.y);
   //Below are corner cases, checking so that the player doesnt fall
   // off grid

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var player=function(x,y,speed){
  this.x=x;
  this.y=y;
  this.sprite='images/char-boy.png';
}

player.prototype.update=function(dt,pos){

}

player.prototype.render= function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput=function(key){

  if(key=='left'){

  player.x=player.x-101;
  }
  if(key=='up'){
  player.y-=85;
  }
  if(key=='right'){
   player.x+=101;
  }
  if(key=='down'){
   player.y+=85;
  }

};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies=[];
var player = new player(202.5, 383, 50);
var enemy=new Enemy(0,Math.random()*200+50,Math.random()*200);
var enemy2=new Enemy(0,Math.random()*70+50,Math.random()*170);

allEnemies.push(enemy);
allEnemies.push(enemy2);
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


//Next step:
//1. Create a score board
//2. add more enemies according to score
//3. Add debuggin toolsS. If touch a bug with debug tool on,
//  we then  get rid of
