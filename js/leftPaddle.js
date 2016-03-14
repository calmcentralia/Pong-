(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var LeftPaddle = Pong.LeftPaddle = function() {
    this.width = 10;
    this.height = 100;
    this.pos = 250;
    this.speed = 0;
    this.color = "#FF4D4D";
    this.baseSpeed = 5;
  };


  LeftPaddle.prototype.draw = function(ctx) {
    ctx.clearRect(10, this.pos, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fillRect(10, this.pos, this.width, this.height);
  };

  LeftPaddle.prototype.move = function(delta, keysDown) {
    var splat = this;
    if (Object.keys(keysDown).length === 0) {
      this.speed = 0;
    }
    Object.keys(keysDown).forEach(function(key) {
      if(key === "87" ) {
        splat.speed = -splat.baseSpeed * delta / (1000 / 60);
        splat.pos += splat.speed;
      }
      if(key === "83") {
        splat.speed = splat.baseSpeed * delta / (1000 / 60);
        splat.pos+= splat.speed;
      }
      if(splat.pos + (splat.height) >= 600) {
        splat.pos = 600 - splat.height;
      }
      if(splat.pos <= 0) {
        splat.pos = 0;
      }
    });
  };

  LeftPaddle.prototype.handlePowerup = function(action) {
    var current = this;
    if (action === "speed up paddle") {
      this.baseSpeed = 8;
      window.setTimeout(function(){current.baseSpeed = 5}, 12000);
    }

    else if(action === "mega paddle") {
      this.width = 30;
      this.height = 200;
      window.setTimeout(function(){current.width = 10; current.height = 100;}, 12000);

    }
  }

  })();
