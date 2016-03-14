(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var TYPES =["speed up paddle", "mega paddle", "disco mode", "speed ball"];

  var Powerup = Pong.Powerup = function (direction) {
    this.x = 500;
    this.y = Math.floor(600 * Math.random());
    this.velX = direction * 2;
    this.type = TYPES[Math.floor(TYPES.length * Math.random())];
    this.radius = 20;
    this.color = this.colorChoices();
  }

  Powerup.prototype.colorChoices = function() {
    switch (this.type) {
      case "speed up paddle":
        return "#3A9DBE";
        break;
      case "mega paddle":
        return "#3abe5b";
        break;
      case "disco mode":
        return "#f600f6";
        break;
      case "speed ball":
        return "#ff6500";
      }

    }

    Powerup.prototype.draw = function (ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    };

    Powerup.prototype.move = function (left, right, callback) {
      this.x += this.velX;
      var upperX = this.x - this.radius;
      var upperY = this.y - this.radius;
      var lowerX = this.x + this.radius;
      var lowerY = this.y + this.radius;

      if (this.x > 1000 || this.x < 0) {
        this.radius = 0;
        callback("delete");
      }

      if(upperX > 500 ) {
        if(upperX < ( 990 + right.width) && lowerX > 990 && upperY < (right.height + right.pos) && lowerY > right.pos) {
          this.radius = 0;
          callback("player2", this.type);
        }
      } else {
        if(upperX < (left.width) && lowerX > 0 && upperY < (left.height + left.pos) && lowerY > left.pos) {
          this.radius = 0;
          callback("player1", this.type);
        }
      }
    }
  }) ();
