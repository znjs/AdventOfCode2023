class GameInstance {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
}
class Game {
  constructor(id) {
    this.id = id;
    this.games = [];
  }
}

let game = new Game(1);
let g1 = new GameInstance(1, 2, 3);
game.games.push(g1);
console.log(game);
console.log(game.games[0]);
console.log(game.games[0].red);
