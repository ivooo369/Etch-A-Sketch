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
    clickButtonOpacity(cell);
    clickButtonEraser(cell);
    clickButtonClear();
  }
}

makeGrid(15, 15);

function chosePenColor(cell) {
  penCustomColor.addEventListener("input", () => {
    cell.addEventListener("mouseenter", () => {
      if (isMouseDown) {
        cell.style.backgroundColor = penCustomColor.value;
      }
    });
  });
}

function choseBackgroundColor() {
  backgroundCustomColor.addEventListener("input", () => {
    body.addEventListener("click", () => {
      grid.style.backgroundColor = backgroundCustomColor.value;
    });
  });
}

function clickButtonBlack(cell) {
  const buttonBlack = document.querySelector("#btn-black");
  buttonBlack.addEventListener("click", () => {
    cell.addEventListener("mouseenter", () => {
      if (isMouseDown) {
        cell.style.backgroundColor = "black";
      }
    });
  });
}

function clickButtonRainbow(cell) {
  const buttonRainbow = document.querySelector("#btn-rainbow");
  buttonRainbow.addEventListener("click", () => {
    cell.addEventListener("mouseenter", () => {
      const rainbowColors = ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"];
      const randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
      if (isMouseDown) {
        cell.style.backgroundColor = randomColor;
      }
    });
  });
}

function clickButtonOpacity(cell) {
  const buttonOpacity = document.querySelector("#btn-opacity");
  buttonOpacity.addEventListener("click", () => {
    cell.addEventListener("mouseenter", function () {
      if (isMouseDown) {
        if (this.style.backgroundColor.match(/rgba/)) {
          let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
          if (currentOpacity <= 0.9) {
            this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
            // this.classList.add("gray");
          }
        } else if (this.style.backgroundColor == "rgb(0, 0, 0)") {
          return;
        } else {
          this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        }
      }
    });
  });
}

function clickButtonEraser(cell) {
  const buttonEraser = document.querySelector("#btn-eraser");
  buttonEraser.addEventListener("click", () => {
    cell.addEventListener("mouseenter", () => {
      if (isMouseDown) {
        cell.style.backgroundColor = "";
        // cell.style.opacity = 1;
      }
    });
  });
}

function clickButtonClear() {
  const buttonClear = document.querySelector("#btn-clear");
  buttonClear.addEventListener("click", () => {
    grid.childNodes.forEach((child) => {
      child.style.backgroundColor = "#ffffff";
      // child.style.opacity = 1;
    });
  });
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
