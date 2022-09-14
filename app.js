const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "black";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentSetting = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let isMouseDown = false;
document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);

let isEveryBarRemoved = false;

const grid = document.querySelector(".grid");
const penCustomColor = document.querySelector("#input-pen-color");
const backgroundCustomColor = document.querySelector("#input-background-color");
const buttonRainbow = document.querySelector("#btn-rainbow");
const buttonOpacity = document.querySelector("#btn-opacity");
const buttonEraser = document.querySelector("#btn-eraser");
const buttonRemoveBars = document.querySelector("#btn-remove-bars");
const buttonClear = document.querySelector("#btn-clear");

penCustomColor.oninput = () => setCurrentSetting("pen-custom-color");
backgroundCustomColor.oninput = () => (grid.style.backgroundColor = backgroundCustomColor.value);
buttonRainbow.onclick = () => setCurrentSetting("rainbow");
buttonOpacity.onclick = () => setCurrentSetting("opacity");
buttonEraser.onclick = () => setCurrentSetting("eraser");
buttonRemoveBars.onclick = () => removeBars();
buttonClear.onclick = () => clearGrid();

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentSetting(newSetting) {
  activateButton(newSetting);
  currentSetting = newSetting;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function removeBars() {
  if (!isEveryBarRemoved) {
    grid.childNodes.forEach((child) => {
      child.style.border = "none";
    });
    isEveryBarRemoved = true;
  } else if (isEveryBarRemoved) {
    grid.childNodes.forEach((child) => {
      child.style.border = "1px solid black";
    });
    isEveryBarRemoved = false;
  }
}

function clearGrid() {
  // makeGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);

  grid.style.backgroundColor = "";
  grid.childNodes.forEach((child) => {
    child.style.backgroundColor = "";
  });
}

function makeGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-item");
    cell.addEventListener("mouseenter", changeColorSettings);
    cell.addEventListener("mousedown", changeColorSettings);
    grid.appendChild(cell);
  }
}

makeGrid(DEFAULT_SIZE);

function changeColorSettings(e) {
  if (e.type === "mouseenter" && !isMouseDown) return;
  if (currentSetting === "pen-custom-color") {
    e.target.style.backgroundColor = penCustomColor.value;
  } else if (currentSetting === "rainbow") {
    const rainbowColors = ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"];
    const randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    e.target.style.backgroundColor = randomColor;
  } else if (currentSetting === "opacity") {
    let currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
    if (currentOpacity <= 0.9) {
      e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
    } else if (e.target.style.backgroundColor == "rgb(0, 0, 0)") {
      return;
    } else {
      e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }
  } else if (currentSetting === "eraser") {
    e.target.style.backgroundColor = "";
  }
}

function activateButton(newMode) {
  if (currentSetting === "pen-custom-color") {
    penCustomColor.classList.remove("active");
  } else if (currentSetting === "background-custom-color") {
    backgroundCustomColor.classList.remove("active");
  } else if (currentSetting === "rainbow") {
    buttonRainbow.classList.remove("active");
  } else if (currentSetting === "opacity") {
    buttonOpacity.classList.remove("active");
  } else if (currentSetting === "eraser") {
    buttonEraser.classList.remove("active");
  } else if (currentSetting === "remove-bars") {
    buttonRemoveBars.classList.remove("active");
  } else if (currentSetting === "clear") {
    buttonClear.classList.remove("active");
  }

  if (newMode === "pen-custom-color") {
    penCustomColor.classList.add("active");
  } else if (newMode === "background-custom-color") {
    backgroundCustomColor.classList.add("active");
  } else if (newMode === "rainbow") {
    buttonRainbow.classList.add("active");
  } else if (newMode === "opacity") {
    buttonOpacity.classList.add("active");
  } else if (newMode === "eraser") {
    buttonEraser.classList.add("active");
  } else if (newMode === "remove-bars") {
    buttonRemoveBars.classList.add("active");
  } else if (newMode === "clear") {
    buttonClear.classList.add("active");
  }
}

function createNewGrid() {
  let inputValue = document.querySelector("#grid-size");
  inputValue.addEventListener("input", () => {
    rows = inputValue.value;
    columns = inputValue.value;
  });

  const buttonNewGrid = document.querySelector(".btn-set-grid-size");
  const errorMessage = document.querySelector("#error-message");
  buttonNewGrid.addEventListener("click", () => {
    document.querySelectorAll(".grid-item").forEach((e) => e.remove());
    if (inputValue.value <= 50) {
      errorMessage.style.opacity = 0;
      makeGrid(rows, columns);
      inputValue.value = "";
    } else {
      errorMessage.style.opacity = 1;
      errorMessage.style.transition = "0.3s ease-in-out";
      inputValue.value = "";
    }
  });
}

createNewGrid();
