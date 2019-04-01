const board = document.getElementById("board");
document.getElementById("range").oninput = function(evt) {
    console.log(this.value, evt);
    board.style.gridTemplateColumns = `repeat(${this.value * 10}, 1fr)`;
}