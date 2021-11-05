function Boundary({ start, end, ...opts }) {
  Entity.call(this, opts);
  this.start = start;
  this.end = end;
}

Boundary.prototype = Object.create(Entity.prototype);
Boundary.prototype.constructor = Entity;

Boundary.prototype.render = function (ctx) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.start.x, this.start.y);
  ctx.lineTo(this.end.x, this.end.y);
  ctx.stroke();
  ctx.closePath();
};

Boundary.prototype.update = function (dt) {
  this.start.x += this.velocity.x * dt;
  this.end.x += this.velocity.x * dt;
};

window.Boundary = Boundary;
