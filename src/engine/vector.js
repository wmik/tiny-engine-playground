// https://gist.github.com/wmik/01c4cf601245b15b44b7183715684fbf

function Vector({ x, y }) {
  this.x = x;
  this.y = y;
}

Vector.fromAngle = function (angle, vector) {
  vector = vector || new Vector({});
  vector.x = Math.cos(angle);
  vector.y = Math.sin(angle);

  return vector;
};

Vector.distance = function (from, to) {
  let dx = from.x - to.x;
  let dy = from.y - to.y;

  return Math.sqrt(dx * dx + dy * dy);
};

Vector.prototype.magnitude = function () {
  let { x, y } = this;

  return Math.sqrt(x * x + y * y);
};

Vector.prototype.divide = function (n) {
  if (typeof n === 'number') {
    this.x /= n;
    this.y /= n;
  } else {
    this.x /= n.x;
    this.y /= n.y;
  }
};

Vector.prototype.normalize = function () {
  let currentMagnitude = this.magnitude();

  if (currentMagnitude > 0) {
    this.divide(currentMagnitude);
  }
};

window.Vector = Vector;
