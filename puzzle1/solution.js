const { readFile } = require("fs");
const path = require("path");

const filename = "input.txt";
const filePath = path.join(__dirname, filename);

const replaceCharNums = (str) => {
  let mapper = {
    one: "o1ne",
    two: "t2wo",
    three: "th3ree",
    four: "fo4ur",
    five: "fi5ve",
    six: "s6ix",
    seven: "se7ven",
    eight: "ei8ght",
    nine: "ni9ne",
  };
  let newStr = str;
  for (let [key, value] of Object.entries(mapper)) {
    newStr = newStr.replaceAll(key, value);
  }
  return newStr;
};

const getFirstAndLastNumbers = (str) => {
  str = replaceCharNums(str);
  let char = str.split("");
  let first = null;
  let last = null;
  for (let i of char) {
    if (isNaN(Number(i))) {
      continue;
    } else {
      first = Number(i);
      break;
    }
  }
  char = char.reverse();
  for (let i of char) {
    if (isNaN(Number(i))) {
      continue;
    } else {
      last = Number(i);
      break;
    }
  }
  return Number(`${first}${last}`);
};

readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  // console.log(data);
  let sum = 0;
  let lines = data.split("\n");
  for (let line of lines) {
    if (line === "") continue;
    sum += getFirstAndLastNumbers(line);
  }
  console.log(sum);
});
