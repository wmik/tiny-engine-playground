function Model({ pos, w, h, r, vx, vy, color }) {
  this.pos = pos;
  this.vx = vx;
  this.vy = vy;
  this.r = r;
  this.h = h;
  this.w = w;
  this.color = color;
}

/**
 * @param {CanvasRenderingContext2D} ctx - canvas context object
 */
Model.prototype.render = function (ctx) {};

/**
 * @param {number} dt - time passed since last frame
 */
Model.prototype.update = function (dt) {};
