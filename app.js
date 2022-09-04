const body = document.querySelector("body");
const cell = document.querySelector(".grid-item");
const grid = document.querySelector(".grid");
const penCustomColor = document.querySelector("#input-pen-color");
const backgroundCustomColor = document.querySelector("#input-background-color");

let isMouseDown = false;
document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);

function makeGrid(rows, columns) {
  grid.style.setProperty("--grid-rows", rows);
  grid.style.setProperty("--grid-cols", columns);
  for (i = 0; i < rows * columns; i++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid-item";
    chosePenColor(cell);
    choseBackgroundColor();
    clickButtonBlack(cell);
    clickButtonRainbow(cell);
    clickButtonEraser(cell);
    clickButtonClear();
  }
}

makeGrid(15, 15);

function setPenColor(cell) {
  cell.addEventListener("mouseenter", () => {
    if (isMouseDown) {
      cell.style.backgroundColor = penCustomColor.value;
    }
  });
}

function chosePenColor(cell) {
  penCustomColor.addEventListener("input", function () {
    setPenColor(cell);
  });
}

function setBackgroundColor() {
  body.addEventListener("click", () => {
    grid.style.backgroundColor = backgroundCustomColor.value;
  });
}

function choseBackgroundColor() {
  backgroundCustomColor.addEventListener("input", function () {
    setBackgroundColor();
  });
}

function fillCellBlack(cell) {
  cell.addEventListener("mouseenter", () => {
    if (isMouseDown) {
      cell.style.backgroundColor = "black";
    }
  });
}

function clickButtonBlack(cell) {
  const buttonBlack = document.querySelector("#btn-black");
  buttonBlack.addEventListener("click", () => {
    fillCellBlack(cell);
  });
}

function fillCellRainbow(cell) {
  cell.addEventListener("mouseenter", () => {
    const rainbowColors = ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"];
    const randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    if (isMouseDown) {
      cell.style.backgroundColor = randomColor;
    }
  });
}

function clickButtonRainbow(cell) {
  const buttonRainbow = document.querySelector("#btn-rainbow");
  buttonRainbow.addEventListener("click", () => {
    fillCellRainbow(cell);
  });
}

function erase(cell) {
  cell.addEventListener("mouseenter", () => {
    if (isMouseDown) {
      cell.style.backgroundColor = "";
    }
  });
}

function clickButtonEraser(cell) {
  const buttonEraser = document.querySelector("#btn-eraser");
  buttonEraser.addEventListener("click", () => {
    erase(cell);
  });
}

function clear() {
  grid.childNodes.forEach((child) => {
    child.style.backgroundColor = "white";
  });
}

function clickButtonClear() {
  const buttonClear = document.querySelector("#btn-clear");
  buttonClear.addEventListener("click", () => {
    clear();
  });
}

function createNewGrid() {
  let inputValue = document.querySelector("#grid-size");
  inputValue.addEventListener("input", () => {
    rows = inputValue.value;
    columns = inputValue.value;
  });

  const buttonNewGrid = document.querySelector(".btn-set-grid-size");
  buttonNewGrid.addEventListener("click", () => {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    if (inputValue.value <= 50) {
      makeGrid(rows, columns);
    } else {
      const errorMessage = document.querySelector("#error-message");
      errorMessage.style.visibility = "visible";
      errorMessage.classList.add("error-message-visible");
    }
  });
}

createNewGrid();
