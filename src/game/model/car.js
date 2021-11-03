function Car(opts) {
  Model.call(this, opts);
}

Car.prototype = Object.create(Model.prototype);
Car.prototype.constructor = Model;

Car.prototype.render = function (ctx) {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
  // ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
  ctx.fill();
};

Car.prototype.update = function (dt) {
  this.pos.x += this.vx * dt;
};

window.Car = Car;
