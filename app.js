const body = document.querySelector("body");
const container = document.createElement("div");
container.setAttribute("id", "container");
body.appendChild(container);
const button = document.createElement("button");
button.style.marginBottom = "20px";
button.innerText = "New Grid";
container.appendChild(button);
const grid = document.createElement("div");
grid.classList.add("grid");
container.appendChild(grid);

function makeGrid(rows, columns) {
  grid.style.setProperty("--grid-rows", rows);
  grid.style.setProperty("--grid-cols", columns);
  for (i = 0; i < rows * columns; i++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "grid-item";
    fillCell(cell);
  }
}

function fillCell(cell) {
  cell.addEventListener("mouseover", () => {
    cell.style.backgroundColor = "black";
  });
}

makeGrid(16, 16);

function createNewGrid() {
  button.addEventListener("click", () => {
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
