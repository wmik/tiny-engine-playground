let canvas = document.getElementById('world');

let boundaries = [
  // new Boundary({
  //   start: new Vector({ x: 500, y: 10 }),
  //   end: new Vector({ x: 500, y: 300 }),
  //   color: 'lime',
  //   vx: 0
  // }),
  // new Boundary({
  //   start: new Vector({ x: 100, y: 10 }),
  //   end: new Vector({ x: 100, y: 300 }),
  //   color: 'lime',
  //   vx: 0
  // }),
  // new Boundary({
  //   start: new Vector({ x: 100, y: 10 }),
  //   end: new Vector({ x: 400, y: 200 }),
  //   color: 'lime',
  //   vx: 0
  // })
];

let to = new Car({
  boundaries,
  pos: new Vector({
    x: 40,
    y: 160
  }),
  r: 7,
  w: 30,
  h: 20,
  color: 'blue',
  vx: randomIntFromInterval(10, 20)
});

let toLeft = new Boundary({
  start: new Vector({ x: to.pos.x, y: to.pos.y }),
  end: new Vector({ x: to.pos.x, y: to.pos.y + to.h * 1.5 }),
  color: 'yellow',
  vx: to.vx
});

let toTop = new Boundary({
  start: new Vector({ x: to.pos.x, y: to.pos.y }),
  end: new Vector({ x: to.pos.x + to.w * 1.5, y: to.pos.y }),
  color: 'pink',
  vx: to.vx
});

let toRight = new Boundary({
  start: new Vector({ x: to.pos.x + to.w * 1.5, y: to.pos.y }),
  end: new Vector({ x: to.pos.x + to.w * 1.5, y: to.pos.y + to.h * 1.5 }),
  color: 'red',
  vx: to.vx
});

let toBottom = new Boundary({
  start: new Vector({ x: to.pos.x, y: to.pos.y + to.h * 1.5 }),
  end: new Vector({ x: to.pos.x + to.w * 1.5, y: to.pos.y + to.h * 1.5 }),
  color: 'purple',
  vx: to.vx
});

let fro = new Car({
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
  vx: -randomIntFromInterval(5, 28)
});

let game = new Game({
  canvas,
  models: [to, fro, toLeft, toTop, toRight, toBottom, ...boundaries]
});

game.loop(0);

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
