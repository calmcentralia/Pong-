(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var GameView = Pong.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
  };

  GameView.prototype.start = function () {
      this.lastTime = 0;
      //start the animation
      requestAnimationFrame(this.animate.bind(this));
    };

  GameView.prototype.animate = function(time){
    if(this.game.checkIfWon(this.ctx)){
      return;
    }
    var timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
})();
