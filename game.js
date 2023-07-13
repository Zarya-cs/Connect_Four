// Покраска ячеек таблицы в белый
let tds = document.querySelectorAll("td")
for (let td of tds) {
    td.classList.add("empty")
}
// Покраска хода на старте
let move = document.getElementById("moves")
move.classList.add("red")
let emptyCells = 42
let newGameBtn = document.getElementById("newGameBtn")
document.addEventListener('DOMContentLoaded', () => {

    let cells = Array.from(document.querySelectorAll('td')); //Получение всех ячеек таблицы
    let moves = document.getElementById('moves'); //Получение окна с ходом
    let currentPlayer = 'red'; //Старт с красного игрока
    let isGameOver = false;

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    function handleCellClick(event) {
        // функция проверяет пустоту ячейки и победу
        if (isGameOver) return;

        let cell = event.target; // назначение одного обработчика на все ячейки
        let index = cells.indexOf(cell);

        if (isCellEmpty(cell)) {
            placeChip(cell, index);
            emptyCells--
            if (checkWin()) {
                // проверка на победу
                isGameOver = true;
                alert(`Игра окончена! Победил игрок ${currentPlayer}`);

            }
            currentPlayer = (currentPlayer === 'red') ? 'yellow' : 'red';
            moves.style.backgroundColor = currentPlayer;
        }
    }

    function isCellEmpty(cell) {
        return cell.classList.contains('empty');
    }

    function placeChip(cell, index) {
        // функция вставки фишки
        for (let i = 35 + index; i >= index; i -= 7) {
            if (isCellEmpty(cells[i])) {
                cells[i].classList.remove('empty');
                cells[i].classList.add(currentPlayer);
                break;
            }
        }
    }

    function checkWin() {
        let winningCombinations = [
            // Горизонталь
            [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
            [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
            [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
            [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
            [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
            [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],

            // Вертикаль
            [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
            [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
            [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
            [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
            [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
            [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
            [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],

            // Диагональ слева-направо
            [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27],
            [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34],
            [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41],

            // Диагональ справа-налево
            [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24],
            [10, 16, 22, 28], [11, 17, 23, 29], [12, 18, 24, 30], [13, 19, 25, 31],
            [17, 23, 29, 35], [18, 24, 30, 36], [19, 25, 31, 37], [20, 26, 32, 38]
        ];
            let winnerCells
        if (emptyCells === 0) {
            isGameOver = true;
            alert("Игра окончена! Ничья");
        }
        for (let i = 0; i < winningCombinations.length; i++) {
            let combination = winningCombinations[i];
            let a = combination[0];
            let b = combination[1];
            let c = combination[2];
            let d = combination[3];

            if (cells[a].classList.contains(currentPlayer) &&
                cells[b].classList.contains(currentPlayer) &&
                cells[c].classList.contains(currentPlayer) &&
                cells[d].classList.contains(currentPlayer)) {
                winnerCells = [cells[a], cells[b], cells[c], cells[d]];
                winnerCells.forEach(cell => cell.classList.add("win"));
                return true;
            }
            newGameBtn.addEventListener('click', newGame);

            function newGame() {
                // Сброс ячеек игрового поля в начальное состояние
                cells.forEach(cell => {
                    cell.classList.remove('red', 'yellow', 'win');
                    cell.classList.add('empty');
                });
                // Сброс текущего игрока и количества пустых ячеек
                currentPlayer = 'red';
                emptyCells = 42;
                // Сброс окончания игры
                isGameOver = false;
                // Сброс цвета хода
                moves.style.backgroundColor = currentPlayer;
            }
        }
        return false;
    }
});