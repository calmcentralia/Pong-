(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }
  var FIRECOLORS = ["rgba(255,208,0,", "rgba(255,165,0,", "rgba(255,101,0,", "rgba(255,59,0,", "rgba(255, 17, 0,"]
  var Ball = Pong.Ball = function (effects) {
    this.x = 500;
    this.y = 300;
    this.velX = 5;
    this.velY = 0;
    this.radius = 7;
    this.fire = false;
    this.fireEffect = effects[0];
    this.fireEffect.loop = false;
    this.rightPing = effects[1];
    this.leftPing = effects[2];
    this.point = effects[3];
  };


  Ball.prototype.draw = function (ctx) {
    if(this.fire) {
      this.makeFireball(ctx);
    }
    else {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
  };
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
      this.point.play();
      var temp = this.velX;
      if(!this.fire) {
        temp = 7;
      }
      this.velY = 0;
      this.velX = 0;
      this.x = 500;
      this.y = 300;
      var that = this;
      window.setTimeout(function(){that.velX= temp;}, 1000)
      callback("player 1")
    }

    if (this.x < 0) {
      this.point.play();
      var temp = this.velX;
      if (!this.fire){
        temp = -7;
      }
      this.velY = 0;
      this.velX = 0;
      this.x = 500;
      this.y = 300;
      var that = this;
      window.setTimeout(function(){that.velX= temp;}, 1000)
      callback("player 2")
    }

    if(upperX > 500 ) {
      if(upperX < (1000) && lowerX > 1000-right.width && upperY < (right.height + right.pos) && lowerY > right.pos) {
        this.rightPing.play()
        this.velX = -this.velX;
        this.velY += (right.speed/ 2);
        this.x += this.velX;
      }
    } else {
      if(upperX < (left.width) && lowerX > 0 && upperY < (left.height + left.pos) && lowerY > left.pos) {
        this.leftPing.play()
        this.velX = -this.velX;
        this.velY = (left.speed/ 2);
        this.x += this.velX;
      }
    }
  }

  Ball.prototype.handlePowerup = function (action) {
    this.velX > 0 ? this.velX = 10 : this.velX = -10;
    this.fire = true;
    this.fireEffect.play();
    var that = this;
    window.setTimeout(function(){
      that.velX > 0 ? that.velX = 5 : that.velX = -5;
      that.fire = false;
          }, 8000)
  };

  Ball.prototype.makeFireball = function (ctx) {
    var particles = [];
    for (var i = 0; i < 100; i++) {
      particles.push(new Particle(this.x, this.y));
    }

    for (var i = 0; i < particles.length; i++) {

      var p = particles[i];
      ctx.beginPath();
      p.opacity = Math.round(p.remainingLife/p.life*100)/100;
      var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, p.radius);
      gradient.addColorStop(0, p.color + p.opacity + ")");
      gradient.addColorStop(0.5, p.color + p.opacity + ")");
      gradient.addColorStop(1, p.color + "0)");
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, p.radius, Math.PI*2, false);
      ctx.fill();

      p.remainingLife--;
      p.radius--;

      p.x += p.speed.x;
      p.y += p.speed.y;
      if(p.remainingLife < 0 || p.radius < 0)
			{
				particles[i] = new particle(this.x, this.y);
			}

    }



  }

  var Particle = function(x,y) {
    this.x = x;
    this.y = y;
    this.speed = {x: -2.5+Math.random()*5, y: -15+Math.random()*10};
    this.radius = 7 + Math.random()*14;
    this.life = 20 + Math.random() * 10;
    this.remainingLife = this.life;
    this.color = FIRECOLORS[Math.floor(FIRECOLORS.length * Math.random())];
  }


}) ();
