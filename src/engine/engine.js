export function TinyEngine({ ctx }) {
  this.ctx = ctx;
  this.models = [];
}

TinyEngine.prototype.update = function (dt) {
  this.models.forEach(function (model) {
    model.update(dt);
  }, this);
};

TinyEngine.prototype.render = function () {
  this.ctx.save();
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  this.models.forEach(function (model) {
    model.render(this.ctx);
  }, this);
  this.ctx.restore();
};
