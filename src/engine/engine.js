function TinyEngine({ ctx }) {
  this.ctx = ctx;
  this.entities = [];
}

TinyEngine.prototype.update = function (dt) {
  this.entities.forEach(function (entity) {
    entity.update(dt);
  }, this);
};

TinyEngine.prototype.render = function () {
  this.ctx.save();
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  this.entities.forEach(function (entity) {
    entity.render(this.ctx);
  }, this);
  this.ctx.restore();
};

window.TinyEngine = TinyEngine;
