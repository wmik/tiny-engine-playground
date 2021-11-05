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

Vector.distance = function (a, b) {
  let dx = a.x - b.x;
  let dy = a.y - b.y;

  return Math.sqrt(dx * dx + dy * dy);
};

Vector.prototype.magnitude = function () {
  let { x, y } = this;

  return Math.sqrt(x * x + y * y);
};

Vector.prototype.add = function (n) {
  if (typeof n === 'number') {
    this.x += n;
    this.y += n;
  } else {
    this.x += n.x;
    this.y += n.y;
  }

  return this;
};

Vector.prototype.subtract = function (n) {
  if (typeof n === 'number') {
    this.x -= n;
    this.y -= n;
  } else {
    this.x -= n.x;
    this.y -= n.y;
  }

  return this;
};

Vector.prototype.divide = function (n) {
  if (typeof n === 'number') {
    this.x /= n;
    this.y /= n;
  } else {
    this.x /= n.x;
    this.y /= n.y;
  }

  return this;
};

Vector.prototype.multiply = function (n) {
  if (typeof n === 'number') {
    this.x *= n;
    this.y *= n;
  } else {
    this.x *= n.x;
    this.y *= n.y;
  }

  return this;
};

Vector.prototype.dotProduct = function (v) {
  return this.x * v.x + this.y * v.y;
};

Vector.prototype.crossProduct = function (v) {
  return this.x * v.y + this.y * v.x;
};

Vector.prototype.normalize = function () {
  let currentMagnitude = this.magnitude();

  if (currentMagnitude > 0) {
    this.divide(currentMagnitude);
  }

  return this;
};

Vector.prototype.clone = function () {
  return new Vector({ x: this.x, y: this.y });
};

Vector.prototype.set = function (x, y) {
  this.x = x;
  this.y = y;
  return this;
};

Vector.prototype.length = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

window.Vector = Vector;
