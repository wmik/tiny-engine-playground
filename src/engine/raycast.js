function Ray(position, angle) {
  this.position = position;
  this.direction = Vector.fromAngle(angle);
}

Ray.prototype.cast = function (line) {
  let x1 = line.start.x;
  let y1 = line.start.y;
  let x2 = line.end.x;
  let y2 = line.end.y;

  let x3 = this.position.x;
  let y3 = this.position.y;
  let x4 = this.position.x + this.direction.x;
  let y4 = this.position.y + this.direction.y;

  let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  // if denominator is zero then the ray and line are parallel
  if (denominator === 0) {
    return new Vector({ x: 0, y: 0 });
  }

  // numerator divided by denominator
  let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

  if (t > 0 && t < 1 && u > 0) {
    let intersectionX = x1 + t * (x2 - x1);
    let intersectionY = y1 + t * (y2 - y1);

    return new Vector({ x: intersectionX, y: intersectionY });
  }
};

window.Ray = Ray;
