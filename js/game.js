(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var Game = Pong.Game = function () {
    this.balls = [];
    this.leftPaddle = [];
    this.rightPaddle = [];
    this.powerups = [];
    this.addPaddles();
    this.addBall(this.leftPaddle, this.rightPaddle);
    this.player1 = 0;
    this.player2 = 0;
    this.disco = false;
    this.discoTime = 0;
    this.discoDelay = 0;
    this.bg = ""
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 30;

  Game.RANDOMCOLOR = function () {
    var hexDigits = "0123456789ABCDEF";
    var color = "#"
    for (var i = 0; i < 6; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }
    return color;
  }

  var keysDown = {};
  window.addEventListener("keydown", function(e) {

    keysDown[e.keyCode] = true;
  });

  window.addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
  });
  Game.prototype.addBall = function() {
    var ball = new Pong.Ball();
    this.balls.push(ball);
  }
  Game.prototype.addPaddles = function () {
    var lPaddle = new Pong.LeftPaddle();
    this.leftPaddle.push(lPaddle);
    var rPaddle = new Pong.RightPaddle();
    this.rightPaddle.push(rPaddle);

  };
  Game.prototype.allItems = function () {
    return [].concat(this.balls, this.leftPaddle, this.rightPaddle, this.powerups);
  };


  Game.prototype.draw = function (ctx, delta) {
    if(this.disco) {
      this.discoDelay += delta;
      this.discoTime += delta;
      if (this.discoDelay> 500) {
        this.bg = Game.RANDOMCOLOR();
        this.discoDelay = 0;
      }
      if(this.discoTime > 16000) {
        this.discoTime = 0;
        this.disco = false;
      }
    } else {
      this.bg = Game.BG_COLOR;
    }

    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = this.bg;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.font = "48px Calibri";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.fillText(this.player1, 400, 50);
    ctx.fillText("|", 500, 50);
    ctx.fillText(this.player2, 600, 50);


    this.allItems().forEach(function (object) {
      object.draw(ctx);
    });
  };


  Game.prototype.moveItems = function (delta) {
    var that = this;

    this.allItems().forEach(function (object) {
      if(object instanceof Pong.RightPaddle || object instanceof Pong.LeftPaddle) {
        object.move(delta, keysDown);
      }
      if(object instanceof Pong.Ball) {

        object.move(that.leftPaddle[0], that.rightPaddle[0], function(flag) {

          if(flag === "player 1") {
            that.player1 += 1;
          } else if(flag=== "player 2") {
            that.player2 += 1;
          }

        });
      }
      if(object instanceof Pong.Powerup) {

        object.move(that.leftPaddle[0], that.rightPaddle[0], function(flag, action) {
          if (action === "disco mode")
          {that.disco = true;}
          else if (action === "speed ball")
          that.balls[0].handlePowerup(action);
          else{
        switch (flag) {
          case "delete":
            that.powerups=[];
            break;
          case "player1":
            that.leftPaddle[0].handlePowerup(action);
            break;
          case "player2":
            that.rightPaddle[0].handlePowerup(action);
            break;
              }
            }
        });
      }
    });
  };

  Game.prototype.checkIfWon = function(ctx) {
    if(this.player1 >= 15) {
      ctx.font = "100px Calibri";
      ctx.fillStyle = 'white';
      ctx.textAlign = "center";
      ctx.fillText("Player 1 Wins", 500, 300);
      return true;
    } else if(this.player2 >= 15) {
      ctx.font = "100px Calibri";
      ctx.fillStyle = 'white';
      ctx.textAlign = "center";
      ctx.fillText("Player 2 Wins", 500, 300);
      return true;
    } else {
      return false;
    }
  }

  Game.prototype.step = function (delta) {
    this.moveItems(delta);
  };

  Game.prototype.addPowerup = function (direction) {
    var powerup = new Pong.Powerup(direction);
    this.powerups.push(powerup);

  };

})();
