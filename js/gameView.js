(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var GameView = Pong.GameView = function (game, ctx, music) {
    this.ctx = ctx;
    this.game = game;
    this.music = music;
  };

  GameView.prototype.start = function () {
      this.lastTime = 0;
      this.powerTime = 0;
      //start the animation

      window.setTimeout(this.startIt.bind(this), 50);
      requestAnimationFrame(this.beginGame.bind(this));
    };

  GameView.prototype.startIt = function () {
      requestAnimationFrame(this.beginGame.bind(this));
  };

  GameView.prototype.beginGame = function(time) {

    window.addEventListener("click", this.animate.bind(this, time) )
    this.ctx.clearRect(0, 0,Pong.Game.DIM_X, Pong.Game.DIM_Y);
    this.ctx.fillStyle = Pong.Game.BG_COLOR;
    this.ctx.fillRect(0, 0, Pong.Game.DIM_X, Pong.Game.DIM_Y);
    this.ctx.font = "80px Orbitron";
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = "center";
    this.ctx.fillText("Pong +", 500, 80);
    this.ctx.font = "20px Orbitron";
    this.ctx.fillText("Use w and s for Left Player.  Up and Down for Right Player", 500, 200);
    this.ctx.fillText("click to play", 500, 350);
    this.begin = true;
  }

  GameView.prototype.animate = function(time){
    if(this.begin) {
      window.removeEventListener("click", this.animate.bind(this, time) );
      this.begin = false;
    }
    if(this.game.checkIfWon(this.ctx)){
      return;
    }
    var timeDelta = time - this.lastTime;
    this.powerTime += timeDelta;
    if(this.powerTime > 13000) {
      this.game.addPowerup(Math.random() < 0.5 ? -1 : 1)
      this.powerTime = 0;
    }
    this.game.step(timeDelta);
    this.game.draw(this.ctx, timeDelta, this.music);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
})();
