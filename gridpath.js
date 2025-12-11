(function () {
    const COLS = 12;
    const ROWS = 5;
    const board = document.getElementById("board");


    const START = { r: 0, c: 0 };
    const END = { r: ROWS - 1, c: COLS - 1 };

    let walls = Array.from({})

    const presetWalls = [
        // set up in by rows and collumns.
        [0, 3], [0, 9],
        [1, 1], [1, 5],
        [2, 2], [2, 7], [2, 11],
        [3, 4]

    ];

    function createBoard() {
        board.innerHTML = "";
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.dataset.r = r;
                cell.dataset.c = c;

                if (r === START.r && c === START.c) {
                    cell.classList.add("start");
                    cell.textContent = "S";
                    const sub = document.createElement
                }
            }
        }
    }
})