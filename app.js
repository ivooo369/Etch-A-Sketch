const grid = document.querySelector(".grid");

let isMouseDown = false;
document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);

let isMouseHover = false;
document.body.onmouseenter = () => (isMouseHover = true);
document.body.onmouseleave = () => (isMouseHover = false);

function makeGrid(rows, columns) {
  grid.style.setProperty("--grid-rows", rows);
  grid.style.setProperty("--grid-cols", columns);
  for (i = 0; i < rows * columns; i++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid-item";
    clickButtonBlack(cell);
    clickButtonRainbow(cell);
    clickButtonEraser(cell);
    clickButtonClear();
  }
}
clickGridSizeButtons();
makeGrid(15, 15);

function fillCellBlack(cell) {
  cell.addEventListener("mousemove", () => {
    if (isMouseDown) {
      cell.style.backgroundColor = "black";
    }
  });
}

function fillCellRainbow(cell) {
  const rainbowColors = ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"];
  const randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
  cell.addEventListener("mousemove", () => {
    if (isMouseDown) {
      cell.style.backgroundColor = `${randomColor}`;
    }
  });
}

function erase(cell) {
  cell.addEventListener("mousemove", () => {
    if (isMouseDown) {
      cell.style.backgroundColor = "white";
    }
  });
}

function clear() {
  grid.childNodes.forEach((child) => {
    child.style.backgroundColor = "white";
  });
}

function clickButtonBlack(cell) {
  const buttonBlack = document.querySelector(".btn-black");
  buttonBlack.addEventListener("click", () => {
    fillCellBlack(cell);
  });
}

function clickButtonRainbow(cell) {
  const buttonRainbow = document.querySelector(".btn-rainbow");
  buttonRainbow.addEventListener("click", () => {
    fillCellRainbow(cell);
  });
}

function clickButtonEraser(cell) {
  const buttonEraser = document.querySelector(".btn-eraser");
  buttonEraser.addEventListener("click", () => {
    erase(cell);
  });
}

function clickButtonClear() {
  const buttonClear = document.querySelector(".btn-clear");
  buttonClear.addEventListener("click", () => {
    clear();
  });
}

function clickGridSizeButtons() {
  const button10x10 = document.querySelector("#btn-10x10");
  button10x10.addEventListener("click", function () {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    makeGrid(10, 10);
  });

  const button15x15 = document.querySelector("#btn-15x15");
  button15x15.addEventListener("click", function () {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    makeGrid(15, 15);
  });

  const button20x20 = document.querySelector("#btn-20x20");
  button20x20.addEventListener("click", function () {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    makeGrid(20, 20);
  });

  const button25x25 = document.querySelector("#btn-25x25");
  button25x25.addEventListener("click", function () {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    makeGrid(25, 25);
  });

  const button30x30 = document.querySelector("#btn-30x30");
  button30x30.addEventListener("click", function () {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    makeGrid(30, 30);
  });
}

function createNewGrid() {
  const buttonNewGrid = document.querySelector(".btn-new-grid");
  buttonNewGrid.addEventListener("click", () => {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    let userInput = prompt("Enter a number");

    if (userInput > 100) {
      alert("Oops, It seems that the number is too big! Please, try again!");
      return;
    }
    rows = userInput;
    columns = userInput;
    makeGrid(rows, columns);
  });
}

createNewGrid();
