let canvas = document.getElementById('world');

let to = new Car({
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

let fro = new Car({
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

let game = new Game({ canvas, models: [to, fro] });

game.loop(0);

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
