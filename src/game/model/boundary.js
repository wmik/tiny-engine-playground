function Boundary({ start, end, color, ...opts }) {
  Model.call(this, opts);
  this.start = start;
  this.end = end;
  this.color = color;
}

Boundary.prototype = Object.create(Model.prototype);
Boundary.prototype.constructor = Model;

Boundary.prototype.render = function (ctx) {
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(this.start.x, this.start.y);
  ctx.lineTo(this.end.x, this.end.y);
  ctx.strokeStyle = this.color;
  ctx.stroke();
};

Boundary.prototype.update = function (dt) {
  this.start.x += this.vx * dt;
  this.end.x += this.vx * dt;
};

window.Boundary = Boundary;
