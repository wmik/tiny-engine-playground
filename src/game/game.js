let dt;
let lastTimestamp = 0;
let fps;

/**
 * @param
 */
function Game({ canvas, models = [] }) {
  let ctx = canvas.getContext('2d');
  this.engine = new TinyEngine({ ctx });
  this.engine.models.push(...models);
}

Game.prototype.loop = function (timestamp) {
  dt = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  fps = Math.round(1 / dt);

  this.engine.update(dt);
  this.engine.render();

  window.requestAnimationFrame(this.loop.bind(this));
};

window.Game = Game;
