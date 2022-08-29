const grid = document.querySelector(".grid");

let isMouseDown = false;
document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);

let isMouseHover = false;
document.body.onmousenter = () => (isMouseHover = true);
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
makeGrid(16, 16);

function fillCellBlack(cell) {
  cell.addEventListener("mouseover", () => {
    cell.style.backgroundColor = "black";
  });
}

function fillCellRainbow(cell) {
  const rainbowColors = ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"];
  const randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
  cell.addEventListener("mouseenter", () => {
    if (isMouseDown) {
      cell.style.backgroundColor = `${randomColor}`;
    }
  });
}

function erase(cell) {
  cell.addEventListener("mouseover", () => {
    cell.style.backgroundColor = "white";
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
  const button8x8 = document.querySelector("#btn-8x8");
  button8x8.addEventListener("click", function () {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    makeGrid(8, 8);
  });

  const button16x16 = document.querySelector("#btn-16x16");
  button16x16.addEventListener("click", function () {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    makeGrid(16, 16);
  });

  const button24x24 = document.querySelector("#btn-24x24");
  button24x24.addEventListener("click", function () {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    makeGrid(24, 24);
  });

  const button32x32 = document.querySelector("#btn-32x32");
  button32x32.addEventListener("click", function () {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    makeGrid(32, 32);
  });

  const button40x40 = document.querySelector("#btn-40x40");
  button40x40.addEventListener("click", function () {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    makeGrid(40, 40);
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
