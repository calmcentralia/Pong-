(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var RightPaddle = Pong.RightPaddle = function() {
    this.width = 10;
    this.height = 100;
    this.pos = 300;
    this.speed = 0;
    this.color = "#80FF80";
  };


  RightPaddle.prototype.draw = function(ctx) {
    ctx.clearRect(980, this.pos, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fillRect(980, this.pos, this.width, this.height);
  };

  RightPaddle.prototype.move = function(delta, keysDown) {
    that = this;
    Object.keys(keysDown).forEach(function(key) {
      if(key === "38" ) {
        that.speed = -5 * delta / (1000 / 60);
        that.pos+= that.speed;
      }
      if(key === "40" ) {
        that.speed = 5 * delta / (1000 / 60);
        that.pos+= that.speed;
      }
      if(that.pos >= 500) {
        that.pos = 500;
      }
      if(that.pos <= 0) {
        that.pos = 0;
      }
    });
  };

  })();
