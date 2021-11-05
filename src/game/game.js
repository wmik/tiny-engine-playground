let dt;
let lastTimestamp = 0;
let fps;

/**
 * @param
 */
function Game({ canvas, entities = [] }) {
  this.stage = canvas;
  let ctx = canvas.getContext('2d');
  this.engine = new TinyEngine({ ctx });
  this.assets = {
    image: new ImageStore()
  };
  this.input = new InputManager(this);

  // init
  entities.forEach(function (entity) {
    entity.game = this;
  }, this);
  this.engine.entities.push(...entities);
}

Game.prototype.loop = function (timestamp) {
  dt = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  fps = Math.round(1 / dt);

  this.engine.update(dt);
  this.engine.render();

  window.requestAnimationFrame(this.loop.bind(this));
};

function ImageStore() {
  this.store = new Map();
}

ImageStore.prototype.set = function (key, value) {
  let img = new Image();
  img.src = value;

  this.store.set(key, img);
};

ImageStore.prototype.get = function (key) {
  return this.store.get(key);
};

function InputManager(game) {
  this.mouse = { x: 0, y: 0 };
  this.hover = false;
  this.stage = game.stage.getBoundingClientRect();

  game.stage.addEventListener(
    'mouseover',
    this.handleMouseOver.bind(this),
    false
  );
  game.stage.addEventListener(
    'mousemove',
    this.handleMouseMove.bind(this),
    false
  );
  game.stage.addEventListener(
    'mouseout',
    this.handleMouseOut.bind(this),
    false
  );
}

InputManager.prototype.handleMouseMove = function (e) {
  this.mouse = {
    x: e.clientX - this.stage.left,
    y: e.clientY - this.stage.top
  };
};

InputManager.prototype.handleMouseOver = function (e) {
  this.hover = true;
};

InputManager.prototype.handleMouseOut = function (e) {
  this.hover = false;
};

window.Game = Game;
