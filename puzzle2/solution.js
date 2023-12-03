const {
  readFile,
  readlink,
  appendFile,
  truncate,
  writeFile,
} = require("fs/promises");

const path = require("path");

const inputFileName = "input.txt";
const inputFilePath = path.join(__dirname, inputFileName);

const outputFileName = "output.json";
const outputFilePath = path.join(__dirname, outputFileName);

class GameInstance {
  constructor(red, green, blue) {
    this.red = +red;
    this.green = +green;
    this.blue = +blue;
  }
}
class Game {
  constructor(id) {
    this.id = +id;
    this.games = [];
  }
}

function isValidGame(game) {
  const RED_MAX = 12;
  const GREEN_MAX = 13;
  const BLUE_MAX = 14;
  let isValid = true;
  for (let gameInstance of game.games) {
    for (let [key, value] of Object.entries(gameInstance)) {
      switch (key) {
        case "red":
          if (value > RED_MAX) {
            isValid = false;
          }
          break;
        case "green":
          if (value > GREEN_MAX) {
            isValid = false;
          }
          break;
        case "blue":
          if (value > BLUE_MAX) {
            isValid = false;
          }
          break;
      }
    }
  }
  return isValid;
}

function getGameInstances(gameStr) {
  //   console.log(gameStr);
  let gameInstances = gameStr.split(";").map((game) => game.trim());
  //   console.log(gameInstances);
  let gameInstanceObjects = [];
  gameInstances.forEach((game) => {
    let balls = game.split(",").map((ball) => ball.trim());
    // console.log(balls);
    let red = 0;
    let green = 0;
    let blue = 0;
    balls.forEach((ball) => {
      let [count, color] = ball.split(" ");
      switch (color) {
        case "red":
          red += count;
          break;
        case "green":
          green += count;
          break;
        case "blue":
          blue += count;
          break;
      }
    });
    gameInstanceObjects.push(new GameInstance(red, green, blue));
  });
  //   console.log(gameInstanceObjects);
  return gameInstanceObjects;
}

function getGameObject(line) {
  let [gameMeta, gamesString] = line.split(":");
  let [_, gameId] = gameMeta.split(" ");
  let game = new Game(gameId);
  let gameObjs = getGameInstances(gamesString);
  game.games = gameObjs;
  return game;
}

(async () => {
  let file = await readFile(inputFilePath, "utf8");
  let lines = file.split("\n");

  let games = [];
  for (let line of lines) {
    let game = getGameObject(line);
    games.push(game);
  }
  let validGames = [];
  for (let game of games) {
    if (isValidGame(game)) {
      validGames.push(game.id);
    }
  }

  console.log(validGames, "valid games");
  console.log(
    validGames.reduce((a, b) => a + b, 0),
    "sum of valid games"
  );
  truncate(outputFilePath, 0);
  writeFile(outputFilePath, JSON.stringify(games));
})();
