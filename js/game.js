(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var Game = Pong.Game = function () {
    this.balls = [];
    this.leftPaddle = [];
    this.rightPaddle = [];
    this.powerUps = [];
    this.addPaddles();
    this.addBall(this.leftPaddle, this.rightPaddle);
    this.player1 = 0;
    this.player2 = 0;
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 30;

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
    return [].concat(this.balls, this.leftPaddle, this.rightPaddle, this.powerUps);
  };


  Game.prototype.draw = function (ctx) {

    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
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
    that = this;
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

})();
