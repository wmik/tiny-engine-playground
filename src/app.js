let canvas = document.getElementById('world');

let boundaries = [
  new Boundary({
    start: new Vector({ x: 10, y: 200 }),
    end: new Vector({ x: 10, y: 300 }),
    color: 'lime',
    v: new Vector({ x: 0, y: 0 })
  }),
  new Boundary({
    start: new Vector({ x: 0, y: 100 }),
    end: new Vector({ x: 500, y: 100 }),
    color: 'lime',
    v: new Vector({ x: 0, y: 0 })
  }),
  new Boundary({
    start: new Vector({ x: 100, y: 200 }),
    end: new Vector({ x: 300, y: 200 }),
    color: 'lime',
    v: new Vector({ x: 0, y: 0 })
  }),
  new Boundary({
    start: new Vector({ x: 100, y: 200 }),
    end: new Vector({ x: 100, y: 300 }),
    color: 'lime',
    v: new Vector({ x: 0, y: 0 })
  }),
  new Boundary({
    start: new Vector({ x: 300, y: 200 }),
    end: new Vector({ x: 500, y: 300 }),
    color: 'lime',
    v: new Vector({ x: 0, y: 0 })
  })
];

let to = new Car({
  boundaries,
  rayColor: 'maroon',
  pos: new Vector({
    x: 40,
    y: 160
  }),
  r: 7,
  w: 30,
  h: 20,
  color: 'blue',
  v: new Vector({ x: randomIntFromInterval(10, 20), y: 0 })
});

let toLeft = new Boundary({
  start: new Vector({ x: to.pos.x, y: to.pos.y }),
  end: new Vector({ x: to.pos.x, y: to.pos.y + to.h * 1.5 }),
  color: 'yellow',
  v: new Vector({ x: to.v.x, y: 0 })
});

let toTop = new Boundary({
  start: new Vector({ x: to.pos.x, y: to.pos.y }),
  end: new Vector({ x: to.pos.x + to.w * 1.5, y: to.pos.y }),
  color: 'pink',
  v: new Vector({ x: to.v.x, y: 0 })
});

let toRight = new Boundary({
  start: new Vector({ x: to.pos.x + to.w * 1.5, y: to.pos.y }),
  end: new Vector({ x: to.pos.x + to.w * 1.5, y: to.pos.y + to.h * 1.5 }),
  color: 'red',
  v: new Vector({ x: to.v.x, y: 0 })
});

let toBottom = new Boundary({
  start: new Vector({ x: to.pos.x, y: to.pos.y + to.h * 1.5 }),
  end: new Vector({ x: to.pos.x + to.w * 1.5, y: to.pos.y + to.h * 1.5 }),
  color: 'purple',
  v: new Vector({ x: to.v.x, y: 0 })
});

let fro = new Car({
  rayColor: 'purple',
  rayPrecision: 5,
  boundaries: boundaries.concat(toLeft, toTop, toRight, toBottom),
  pos: new Vector({
    x: 300,
    y: 130
  }),
  r: 7,
  w: 30,
  h: 20,
  color: 'crimson',
  v: new Vector({ x: -randomIntFromInterval(5, 28), y: 0 })
});

let game = new Game({
  canvas,
  models: [to, toLeft, toTop, toRight, toBottom, fro, ...boundaries]
});

game.loop(0);

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
