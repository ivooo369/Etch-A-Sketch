const body = document.querySelector("body");
const container = document.createElement("div");
container.setAttribute("id", "container");
body.appendChild(container);

function makeRows(rows, columns) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", columns);
  for (i = 0; i < rows * columns; i++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
    fillCell(cell);
  }
}

makeRows(16, 16);

function fillCell(cell) {
  cell.addEventListener("mouseover", () => {
    cell.style.backgroundColor = "black";
  });
}
