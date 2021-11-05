function Car(opts) {
  Entity.call(this, opts);
  this.rays = [];
  this.maxSpeed = opts.maxSpeed;
  this.destination = opts.destination || new Vector({ x: 0, y: 0 });
  this.mass = opts.mass || 1;
  this.maxForce = opts.maxForce || 5;
  this.arrivalThreshold = opts.arrivalThreshold || 100;
  this.steeringForce = new Vector({ x: 0, y: 0 });
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

    this.turn(ctx);
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
      ctx.beginPath();
      ctx.moveTo(
        this.position.x + this.width / 2,
        this.position.y + this.height / 2
      );
      ctx.lineTo(close.x, close.y);
      ctx.lineWidth = 1;
      ctx.strokeStyle = this.rayColor;
      ctx.stroke();
      ctx.closePath();
    }, this);
  }
};

Car.prototype.update = function (dt) {
  this.destination = new Vector(this.game.input.mouse);

  if (Vector.distance(this.position, this.destination) > 10) {
    this.arrive(this.destination);
  } else {
    this.idle();
  }

  let steeringForceLen = this.steeringForce.length();
  let min = 0;

  this.steeringForce
    .divide(steeringForceLen || 1)
    .multiply(Math.max(min, Math.min(this.maxForce, steeringForceLen)));
  this.steeringForce.divide(this.mass);
  this.velocity.add(this.steeringForce);
  this.steeringForce.set(0, 0);
  this.forward(dt);
};

Car.prototype.forward = function (dt) {
  this.position.add(this.velocity.clone().multiply(dt)); // this.position.x += this.velocity.x * dt;
};

Car.prototype.backward = function (dt) {
  this.position.subtract(this.velocity.clone().multiply(dt)); // this.position.x -= this.velocity.x * dt;
};

Car.prototype.seek = function (target) {
  let desiredVelocity = target.clone().subtract(this.position);

  desiredVelocity.normalize().multiply(this.maxSpeed).subtract(this.velocity);
  this.steeringForce.add(desiredVelocity);
};

Car.prototype.flee = function (target) {
  let desiredVelocity = target.clone().subtract(this.position);

  desiredVelocity.normalize().multiply(this.maxSpeed).subtract(this.velocity);
  this.steeringForce.subtract(desiredVelocity);
};

Car.prototype.arrive = function (target) {
  let desiredVelocity = target.clone().subtract(this.position);

  desiredVelocity.normalize();

  let distance = Vector.distance(this.position, target);

  if (distance > this.arrivalThreshold) {
    desiredVelocity.normalize().multiply(this.maxSpeed);
  } else {
    desiredVelocity
      .normalize()
      .multiply((this.maxSpeed * distance) / this.arrivalThreshold);
  }

  desiredVelocity.subtract(this.velocity);
  this.steeringForce.add(desiredVelocity);
};

Car.prototype.pursue = function (entity) {
  let lookAheadTime =
    Vector.distance(this.position, entity.position) / this.maxSpeed;
  let predictedTarget = entity.position
    .clone()
    .add(entity.velocity.clone().normalize().multiply(lookAheadTime));

  this.seek(predictedTarget);
};

Car.prototype.evade = function (entity) {
  let lookAheadTime =
    Vector.distance(this.position, entity.position) / this.maxSpeed;
  let predictedTarget = entity.position
    .clone()
    .subtract(entity.velocity.clone().normalize().multiply(lookAheadTime));

  this.flee(predictedTarget);
};

Car.prototype.idle = function () {
  this.velocity.normalize().multiply(0);
  this.steeringForce.set(0, 0);
};

Car.prototype.turn = function (ctx) {
  // let firstAngle = Math.atan2(this.position.y, this.position.x);
  // let secondAngle = Math.atan2(this.destination.y, this.destination.x);
  // let angle = secondAngle - firstAngle;

  // let angle = Math.acos(
  //   this.destination.dotProduct(this.position) /
  //     (this.destination.magnitude() * this.position.magnitude())
  // );

  let angle = Math.atan2(
    this.position.y - this.destination.y,
    this.position.x - this.destination.x
  );

  ctx.translate(this.position.x + this.width, this.position.y + this.height);
  ctx.rotate(degreeToRadians(180));
  ctx.rotate(angle);
  ctx.translate(-this.position.x - this.width, -this.position.y - this.height);
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
