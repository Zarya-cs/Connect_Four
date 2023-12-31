// Параметры игрового поля
let rows = 6; // количество рядов
let cols = 7; // количество столбцов
let moves = document.getElementById("moves")
moves.classList.add("red")
let currentPlayer = 'red'; //Старт с красного игрока
let chip = "";
let chipOffset = 0;
emptyCells = rows * cols;
let winningCombinations = [];
let board = document.getElementById("board");
// Создание двумерного массива для хранения состояния игрового поля
let gameBoard = new Array(rows);
let isGameOver = false
let newGameBtn = document.getElementById("newGameBtn")
let newChip = document.createElement("div")
newChip.classList.add("newChip")
newChip.classList.add(currentPlayer)
let startNewGame = function () {
// Генерация игрового поля
    for (let i = 0; i < rows; i++) {
        gameBoard[i] = new Array(cols).fill("empty");
    }
    board.innerHTML = "";
    chip = document.createElement("div")
    chip.classList.add("chip")
    chip.classList.add("hover-chip")
    chip.classList.add(currentPlayer)
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-row", String(i));
            cell.setAttribute("data-col", String(j));
            cell.classList.add("empty");
            row.appendChild(cell);
            cell.onmouseover = function () {
                if (!isGameOver) {
                    document.querySelector(".hover-chip").style.left = `${j * 100}px`
                }
            }
        }
        board.appendChild(row);
        board.appendChild(chip)
    }
    winningCombinations = winningCombo()
    isGameOver = false
    document.getElementById("result").innerHTML = ``;
    board.classList.remove("boom")
}
newGameBtn.addEventListener('click', startNewGame);
startNewGame()

    board.addEventListener("click", function (event) {
        let cell = event.target;
        let col = parseInt(cell.getAttribute("data-col"));
        if (placeChip(col)) {
            emptyCells--
            // Обновление состояния игрового поля и отрисовка фишки
            updateBoard();
        }
    })

    function isCellEmpty(cell) {
        if (typeof cell === "string") {
            return cell === "empty";
        }
    }

function placeChip(col) {
    if (isGameOver) {
        return false
    }
    let success = false
    // функция вставки фишки
    for (let i = gameBoard.length - 1; i >= 0; i--) {
        if (isCellEmpty(gameBoard[i][col])) {
            let board = document.querySelector(`#board`)
            let row = Array.from(board.children)[i]
            let cell = Array.from(row.children)[col]
            let chip = document.querySelector(".hover-chip")

            chipOffset = chip.style.left
            chip.style.top = `${cell.getBoundingClientRect().y - document.getElementById("board").getBoundingClientRect().y - 4}px`
            setTimeout(() => {
                chip.remove()
            }, 150)

                cell.classList.remove('empty');
                cell.classList.add(currentPlayer);
                gameBoard[i][col] = currentPlayer
                success = true
                break;
            }
        }
        return success
    }
function updateBoard() {
    // Проверка на выигрышную комбинацию

    if (!checkWin()) {

        let newChip = document.createElement("div")
        newChip.classList.add("chip")
        newChip.classList.add("hover-chip")
        newChip.classList.add(currentPlayer === "red" ? "yellow" : "red")
        let chip = document.querySelector(".hover-chip")
        // Смена текущего игрока
        if (currentPlayer === "red") {
            currentPlayer = "yellow"
            moves.classList.remove("red")
            moves.classList.add("yellow")
            chip.classList.remove("red")
            chip.classList.add("yellow")
        } else {
            currentPlayer = "red"
            moves.classList.remove("yellow")
            moves.classList.add("red")
            chip.classList.remove("yellow")
            chip.classList.add("red")
        }

        newChip.style.left = chipOffset
        board.appendChild(newChip)
    }
}
function checkWin() {
    // Проверка каждой комбинации на наличие выигрышной
    for (let i = 0; i < winningCombinations.length; i++) {
        let combo = winningCombinations[i];
        let cell1 = gameBoard[combo[0][0]][combo[0][1]];
        let cell2 = gameBoard[combo[1][0]][combo[1][1]];
        let cell3 = gameBoard[combo[2][0]][combo[2][1]];
        let cell4 = gameBoard[combo[3][0]][combo[3][1]];
        if (
            cell1 !== "empty" &&
            cell1 === cell2 &&
            cell2 === cell3 &&
            cell3 === cell4
        ) {
            isGameOver = true
            outlineWin(winningCombinations[i]).then()
            let winner = currentPlayer === "red" ? "красный" : "жёлтый"
            document.getElementById("result").innerHTML = `Игра окончена! Победил ${winner} игрок`;
            board.classList.add("boom")
            return true;
        }
    }
    if (emptyCells === 0) {
        isGameOver = true
        document.getElementById("result").innerHTML = `Игра окончена! Ничья!`;
        return true;
    }
    return false;
}

function winningCombo() {
    let winningCombinations = [];

    // Горизонтальные комбинации
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols - 3; j++) {
            winningCombinations.push([
                [i, j],
                [i, j + 1],
                [i, j + 2],
                [i, j + 3],
            ]);
        }
    }

    // Вертикальные комбинации
    for (let i = 0; i < rows - 3; i++) {
        for (let j = 0; j < cols; j++) {
            winningCombinations.push([
                [i, j],
                [i + 1, j],
                [i + 2, j],
                [i + 3, j],
            ]);
        }
    }

    // Диагональные комбинации слева-направо
    for (let i = 0; i < rows - 3; i++) {
        for (let j = 0; j < cols - 3; j++) {
            winningCombinations.push([
                [i, j],
                [i + 1, j + 1],
                [i + 2, j + 2],
                [i + 3, j + 3],
            ]);
        }
    }

    // Диагональные комбинации справа-налево
    for (let i = 0; i < rows - 3; i++) {
        for (let j = cols - 1; j >= 3; j--) {
            winningCombinations.push([
                [i, j],
                [i + 1, j - 1],
                [i + 2, j - 2],
                [i + 3, j - 3],
            ]);
        }
    }
    return winningCombinations
}

async function outlineWin(combo) {
    for (let i in combo) {
        let board = document.querySelector(`#board`)
        let row = Array.from(board.children)[combo[i][0]]
        let cell = Array.from(row.children)[combo[i][1]]

        cell.style.border = "5px solid limegreen"
    }
}
