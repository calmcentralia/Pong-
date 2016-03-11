(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var Ball = Pong.Ball = function (l,r) {

    this.x = 500;
    this.y = 300;
    this.velX = 8;
    this.velY = 0;
    this.radius = 7;
  };


  Ball.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
  };

  Ball.prototype.move = function(left, right, callback) {
    this.x += this.velX;
    this.y += this.velY;

    var upperX = this.x - this.radius;
    var upperY = this.y - this.radius;
    var lowerX = this.x + this.radius;
    var lowerY = this.y + this.radius;

    if((this.y - this.radius) <= 0) {
      this.y = this.radius;
      this.velY = -this.velY;
    } else if((this.y + this.radius) >= 600) {
      this.y = 600 - this.radius;
      this.velY = -this.velY;
    }

    if (this.x > 1000) {
      this.velY = 0;
      this.velX = 8;
      this.x = 500;
      this.y = 300;
      callback("player 1")
    }

    if (this.x < 0) {
      this.velY = 0;
      this.velX = -8;
      this.x = 500;
      this.y = 300;
      callback("player 2")
    }

    if(upperX > 500 ) {
      if(upperX < ( 990 + right.width) && lowerX > 990 && upperY < (right.height + right.pos) && lowerY > right.pos) {
        this.velX = -this.velX;
        this.velY += (right.speed/ 2);
        this.x += this.velX;
      }
    } else {
      if(upperX < (left.width) && lowerX > 0 && upperY < (left.height + left.pos) && lowerY > left.pos) {
        this.velX = -this.velX;
        this.velY = (left.speed/ 2);
        this.x += this.velX;
      }
    }
  }
}) ();
