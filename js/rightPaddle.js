(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var RightPaddle = Pong.RightPaddle = function() {
    this.width = 10;
    this.height = 100;
    this.pos = 250;
    this.speed = 0;
    this.color = "#80FF80";
    this.baseSpeed = 5;
  };


  RightPaddle.prototype.draw = function(ctx) {
    ctx.clearRect(1000 - this.width - 10, this.pos, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fillRect(1000 - this.width - 10, this.pos, this.width, this.height);
  };

  RightPaddle.prototype.move = function(delta, keysDown) {
    splat = this;
    if (Object.keys(keysDown).length === 0) {
      this.speed = 0;
    }
    Object.keys(keysDown).forEach(function(key) {
      if(key === "38" ) {
        splat.speed = -splat.baseSpeed * delta / (1000 / 60);
        splat.pos+= splat.speed;
      }
      if(key === "40" ) {
        splat.speed = splat.baseSpeed * delta / (1000 / 60);
        splat.pos+= splat.speed;
      }
      if(splat.pos >= 500) {
        splat.pos = 500;
      }
      if(splat.pos <= 0) {
        splat.pos = 0;
      }
    });
  };

  RightPaddle.prototype.handlePowerup = function(action) {
    var current = this;
    if (action === "speed up paddle") {
      this.baseSpeed = 8;
      window.setTimeout(function(){current.baseSpeed = 5}, 8000);
    } else if(action === "mega paddle") {
      this.width = 30;
      this.height = 200;
      window.setTimeout(function(){current.width = 10; current.height = 100;}, 8000);
    }
  }

  })();
