# [Pong +](http://pongchamp.herokuapp.com)

## Technologies Used

Built using Javascript, HTML Canvas, and HTML Audio

## How to Play

A twist on the Atari classic, the left paddle uses w and s to move, while the right paddle uses up and down.  Collect a variety of powerups for additional effects.

## Implementation Details

Hit detection is determined by passing the paddles to the ball object.  Locations are checked against each other to decide whether a point is scored or the ball is reflected.

```javascript
//player 1 scores
if (this.x > 1000) {
  this.point.play();
  var temp = this.velX;
  if(!this.fire) {
    temp = 5;
  }
  this.velY = 0;
  this.velX = 0;
  this.x = 500;
  this.y = 300;
  var that = this;
  window.setTimeout(function(){that.velX= temp;}, 1000);
  callback("player 1");
}

//player 2 scores
if (this.x < 0) {
  this.point.play();
  var temp = this.velX;
  if (!this.fire){
    temp = -5;
  }
  this.velY = 0;
  this.velX = 0;
  this.x = 500;
  this.y = 300;
  var that = this;
  window.setTimeout(function(){that.velX= temp;}, 1000);
  callback("player 2");
}
//checks to see if the right paddle hits the ball and reverses x direction and adds y velocity based on paddle speed
if(upperX > 500 ) {
  if(upperX < (1000) && lowerX > 1000-right.width && upperY < (right.height + right.pos) && lowerY > right.pos) {
    this.rightPing.play();
    this.velX = -this.velX;
    this.velY += (right.speed/ 2);
    this.x += this.velX;
  }
//checks the same for the left paddle  
} else {
  if(upperX < (left.width) && lowerX > 0 && upperY < (left.height + left.pos) && lowerY > left.pos) {
    this.leftPing.play();
    this.velX = -this.velX;
    this.velY = (left.speed/ 2);
    this.x += this.velX;
  }
}
```

## Future Features
 - multi ball powerup that splits the ball in 2
 - Additional sound design tweaks
 - ball y velocity dependent on the part of the paddle that hits it
