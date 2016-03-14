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
      requestAnimationFrame(this.animate.bind(this));
    };

  GameView.prototype.animate = function(time){
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
