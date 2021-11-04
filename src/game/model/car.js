function Car(opts) {
  Model.call(this, opts);
  this.rays = [];
  this.boundaries = opts.boundaries || [];
  this.rayPrecision = opts.rayPrecision || 10; // degree of approximation

  for (let degree = 0; degree < 360; degree += this.rayPrecision) {
    this.rays.push(new Ray(this.pos, degreeToRadians(degree)));
  }
}

Car.prototype = Object.create(Model.prototype);
Car.prototype.constructor = Model;

let img = new Image();
img.src = 'src/assets/cars.png';

Car.prototype.render = function (ctx) {
  if (img.complete) {
    let sx = 198;
    let sy = 31;
    let frameWidth = 50;
    let frameHeight = 27;

    if (this.vx < 0) {
      ctx.translate(this.pos.x + this.w, this.pos.y + this.h);
      ctx.rotate(degreeToRadians(180));
      ctx.translate(-this.pos.x, -this.pos.y);
    }

    ctx.drawImage(
      img,
      sx,
      sy,
      frameWidth,
      frameHeight,
      this.pos.x,
      this.pos.y,
      frameWidth,
      frameHeight
    );

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  } else {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
    // ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  let closest = this.look(this.boundaries);

  if (closest.length) {
    closest.forEach(function (close) {
      let x = this.vx < 0 ? this.pos.x : this.pos.x + this.w;

      ctx.moveTo(x, this.pos.y + this.h / 2);
      ctx.lineTo(close.x, close.y);
      ctx.lineWidth = 0.125;
      ctx.strokeStyle = 'purple';
      ctx.stroke();
    }, this);
  }
};

Car.prototype.update = function (dt) {
  this.pos.x += this.vx * dt;
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
        let distance = Vector.distance(this.pos, point);

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
