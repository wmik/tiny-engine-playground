function Entity({ position, width, height, radius, velocity, color }) {
  this.position = position;
  this.velocity = velocity;
  this.radius = radius;
  this.height = height;
  this.width = width;
  this.color = color;
}

/**
 * @param {CanvasRenderingContext2D} ctx - canvas context object
 */
Entity.prototype.render = function (ctx) {};

/**
 * @param {number} dt - time passed since last frame
 */
Entity.prototype.update = function (dt) {};

window.Entity = Entity;
