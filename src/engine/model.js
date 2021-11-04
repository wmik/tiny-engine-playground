function Model({ pos, w, h, r, v, color }) {
  this.pos = pos;
  this.v = v;
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

window.Model = Model;
