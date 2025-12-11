(function () {
    const COLS = 12;
    const ROWS = 5;
    const board = document.getElementById("board");
    const solveBtn = document.getElementById("solve");
    const clearBtn = document.getElementById("clear");

    function getCell(r, c) {
        return board.querySelector('.cell[data-r="' + r + '"][data-c="' + c + '"]')
    }

    function isWall(r, c) {
        const elem = getCell(r, c);
        return !!(elem && elem.classList.contains("wall"));
    }

    function removeSmall(elem) {
        if (!elem) return;
        const sm = elem.querySelector(".small");
        if (sm) elem.removeChild(sm);
    }

    function clearNumbers() {
        const cells = board.querySelectorAll(".cell");
        for (let i = 0; i < cells.length; i++) {
            const elem = cells[i];
            removeSmall(elem);
            elem.removeAttribute("data-dp");

            if (elem.classList.contains("start")) elem.textContent = "S";
            else if (elem.classList.contains("end")) elem.textContent = "E";
            else if (elem.classList.contains("wall")) elem.textContent = "";
            elem.classList.remove("anim");
            elem.classList.remove("big-result");
        }
    }

    function buildOrder() {
        const order = [];
        for (let r = ROWS - 1; r >= 0; r--) {
            for (let c = COLS - 1; c >= 0; c--) {
                order.push({ r: r, c: c });
            }
        }
        return order;
    }

    function computeAnimated(delayMs) {
        solveBtn.disabled = true;
        clearBtn.disabled = true;

        const route = [];
        for (let r = 0; r < ROWS; r++) {
            route[r] = [];
            for (let c = 0; c < COLS; c++) {
                route[r][c] = 0;
            }
        }

        const order = buildOrder();
        let idx = 0;

        function step() {
            if (idx >= order.length) {

                // Start- og slutceller
                const startCell = getCell(0, 0);
                const endCell = getCell(ROWS - 1, COLS - 1);

                // Tilføj stor markering
                if (startCell) startCell.classList.add("big-result");
                if (endCell) endCell.classList.add("big-result");

                // Gen-aktivér knapper
                solveBtn.disabled = false;
                clearBtn.disabled = false;

                return;


            }

            const pos = order[idx];
            const r = pos.r;
            const c = pos.c;
            const cell = getCell(r, c);

            if (isWall(r, c)) {
                route[r][c] = 0;
                removeSmall(cell);
                cell.removeAttribute("data-dp");
                cell.classList.add("anim");
                setTimeout(function () { cell.classList.remove("anim"); }, Math.max(80, delayMs / 2));
                idx++;
                setTimeout(step, delayMs);
                return;
            }

            if (r === ROWS - 1 && c === COLS - 1) {
                route[r][c] = 1;
            } else {
                const down = (r + 1 < ROWS && !isWall(r + 1, c)) ? route[r + 1][c] : 0;
                const right = (c + 1 < COLS && !isWall(r, c + 1)) ? route[r][c + 1] : 0;
                route[r][c] = down + right;
            }

            // if (cell.classList.contains("start")) cell.textContent = "S";
            // if (cell.classList.contains("end")) cell.textContent = "E";

            removeSmall(cell);
            const small = document.createElement("div");
            small.className = "small";
            small.textContent = String(route[r][c]);
            cell.appendChild(small);

            cell.setAttribute("data-dp", String(route[r][c]));



            cell.classList.add("anim");
            setTimeout(function () { cell.classList.remove("anim"); }, Math.max(120, Math.floor(delayMs * 0.9)));

            idx++;
            setTimeout(step, delayMs)
        }
        step();
    }

    const DELAY_MS = 70;
    solveBtn.addEventListener("click", function () { computeAnimated(DELAY_MS); });
    clearBtn.addEventListener("click", function () { clearNumbers(); });

    (function animStyle() {
        const id = "gridpath-anim-style";
        if (document.getElementById(id)) return;
        const style = document.createElement("style");
        style.id = id;
        style.textContent = ".cell.anim{ box-shadow: 0 0 0 3px rgba(33,150,243,0.12) inset; transform: scale(1.02); transition: transform .12s ease; z-index:2; }";
        document.head.appendChild(style);
    }());


}());