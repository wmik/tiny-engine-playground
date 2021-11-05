let canvas = document.getElementById('world');

let boundaries = [
  new Boundary({
    start: new Vector({ x: 10, y: 200 }),
    end: new Vector({ x: 10, y: 300 }),
    color: 'lime',
    velocity: new Vector({ x: 0, y: 0 })
  }),
  new Boundary({
    start: new Vector({ x: 0, y: 100 }),
    end: new Vector({ x: 500, y: 100 }),
    color: 'lime',
    velocity: new Vector({ x: 0, y: 0 })
  }),
  new Boundary({
    start: new Vector({ x: 100, y: 200 }),
    end: new Vector({ x: 300, y: 200 }),
    color: 'lime',
    velocity: new Vector({ x: 0, y: 0 })
  }),
  new Boundary({
    start: new Vector({ x: 100, y: 200 }),
    end: new Vector({ x: 100, y: 300 }),
    color: 'lime',
    velocity: new Vector({ x: 0, y: 0 })
  }),
  new Boundary({
    start: new Vector({ x: 300, y: 200 }),
    end: new Vector({ x: 500, y: 300 }),
    color: 'lime',
    velocity: new Vector({ x: 0, y: 0 })
  })
];

let to = new Car({
  boundaries,
  rayColor: 'maroon',
  position: new Vector({
    x: 40,
    y: 160
  }),
  radius: 7,
  width: 30,
  height: 20,
  color: 'blue',
  velocity: new Vector({ x: randomIntFromInterval(10, 20), y: 0 })
});

let toLeft = new Boundary({
  start: new Vector({ x: to.position.x, y: to.position.y }),
  end: new Vector({ x: to.position.x, y: to.position.y + to.height * 1.5 }),
  color: 'yellow',
  velocity: new Vector({ x: to.velocity.x, y: 0 })
});

let toTop = new Boundary({
  start: new Vector({ x: to.position.x, y: to.position.y }),
  end: new Vector({ x: to.position.x + to.width * 1.5, y: to.position.y }),
  color: 'pink',
  velocity: new Vector({ x: to.velocity.x, y: 0 })
});

let toRight = new Boundary({
  start: new Vector({ x: to.position.x + to.width * 1.5, y: to.position.y }),
  end: new Vector({
    x: to.position.x + to.width * 1.5,
    y: to.position.y + to.height * 1.5
  }),
  color: 'red',
  velocity: new Vector({ x: to.velocity.x, y: 0 })
});

let toBottom = new Boundary({
  start: new Vector({ x: to.position.x, y: to.position.y + to.height * 1.5 }),
  end: new Vector({
    x: to.position.x + to.width * 1.5,
    y: to.position.y + to.height * 1.5
  }),
  color: 'purple',
  velocity: new Vector({ x: to.velocity.x, y: 0 })
});

let fro = new Car({
  rayColor: 'purple',
  rayPrecision: 5,
  boundaries: boundaries.concat(toLeft, toTop, toRight, toBottom),
  position: new Vector({
    x: 300,
    y: 130
  }),
  radius: 7,
  width: 30,
  height: 20,
  color: 'crimson',
  velocity: new Vector({ x: -randomIntFromInterval(5, 28), y: 0 })
});

let game = new Game({
  canvas,
  entities: [to, toLeft, toTop, toRight, toBottom, fro, ...boundaries]
});

game.assets.image.set('cars', 'src/assets/cars.png');

game.loop(0);

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
