function Car(opts) {
  Entity.call(this, opts);
  this.rays = [];
  this.boundaries = opts.boundaries || [];
  this.rayPrecision = opts.rayPrecision || 10; // degree of approximation
  this.rayColor = opts.rayColor || 'transparent';

  for (let degree = 0; degree < 360; degree += this.rayPrecision) {
    this.rays.push(new Ray(this.position, degreeToRadians(degree)));
  }
}

Car.prototype = Object.create(Entity.prototype);
Car.prototype.constructor = Entity;

Car.prototype.render = function (ctx) {
  let img = this.game.assets.image.get('cars');

  if (img.complete) {
    let sx = 198;
    let sy = 31;
    let frameWidth = 50;
    let frameHeight = 27;

    ctx.drawImage(
      img,
      sx,
      sy,
      frameWidth,
      frameHeight,
      this.position.x,
      this.position.y,
      frameWidth,
      frameHeight
    );

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  } else {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    // ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  let closest = this.look(this.boundaries);

  if (closest.length) {
    closest.forEach(function (close) {
      ctx.moveTo(this.position.x, this.position.y + this.height / 2);
      ctx.lineTo(close.x, close.y);
      ctx.lineWidth = 0.125;
      ctx.strokeStyle = this.rayColor;
      ctx.stroke();
      ctx.closePath();
    }, this);
  }
};

Car.prototype.update = function (dt) {
  this.position.add(this.velocity.clone().multiply(dt));
};

Car.prototype.turn = function (ctx) {
  ctx.translate(this.position.x + this.width, this.position.y + this.height);
  ctx.rotate(degreeToRadians(180));
  ctx.translate(-this.position.x, -this.position.y);
};

Car.prototype.look = function (lines) {
  let closeset = [];

  for (let index = 0; index < this.rays.length; index++) {
    let point;
    let closest = null;
    let record = Infinity;

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      let ray = this.rays[index];
      let line = lines[lineIndex];

      point = ray.cast(line);

      if (point) {
        let distance = Vector.distance(this.position, point);

        if (distance < record) {
          record = distance;
          closest = point;
        }
      }
    }

    if (closest) {
      closeset.push(closest);
    }
  }

  return closeset;
};

function degreeToRadians(degree) {
  return (degree / 180) * Math.PI;
}

window.Car = Car;
