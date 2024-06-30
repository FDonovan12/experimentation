window.addEventListener('load', () => {
    initGameOfLife();
});

window.addEventListener('click', (event) => {
    changeSquare(event, list);
});
// Définition des paramètres
const sizePixel = 10;
let list = null;

function printMousePos(event) {
    return 'clientX: ' + event.clientX + ' - clientY: ' + event.clientY;
}

function initGameOfLife() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = Math.trunc(canvas.width / sizePixel) - 1;
    const height = Math.trunc(canvas.height / sizePixel) - 1;
    ctx.fillRect(0, 0, width * sizePixel + 1, height * sizePixel + 1);
    list = Array(6).map((e) => Array(5).map((e) => 0));
    list = Array.apply(null, Array(width)).map((e) =>
        Array.apply(null, Array(height)).map((e) => 0)
    );
    list[4][4] = 1;
    list[4][5] = 1;
    list[4][6] = 1;
    printGameOfLife(ctx, list, sizePixel);
}

function changeSquare(event, list) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const width = Math.trunc(mouseX / sizePixel);
    const height = Math.trunc(mouseY / sizePixel);
    if (width < list.length && height < list[0].length) {
        list[width][height] = 1 - list[width][height];
        printGameOfLife(ctx, list, sizePixel);
    } else {
        runGameOfLife(ctx, 150, 100, sizePixel);
    }
}

function runGameOfLife(ctx, delay, numberLoop, sizePixel) {
    for (let i = 0; i < numberLoop; i++) {
        setTimeout(() => {
            list = list.map((row, x) => row.map((square, y) => realoadSquare(list, x, y)));
            printGameOfLife(ctx, list, sizePixel);
        }, delay * i);
    }
}

function realoadSquare(list, x, y) {
    square = list[x][y];
    count = countAroundSquare(list, x, y);
    if (square && [2, 3].includes(count)) {
        return 1;
    }
    if (!square && [3].includes(count)) {
        return 1;
    }
    return 0;
}

function countAroundSquare(list, x, y) {
    sum = -list[x][y];
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && j >= 0 && i < list.length && j < list[0].length) {
                sum += list[i][j];
            }
        }
    }
    return sum;
}

function printGameOfLife(ctx, list, sizePixel) {
    list.forEach((row, x) => {
        row.forEach((square, y) => {
            if (square) {
                ctx.fillStyle = `rgb(0, 0, 0)`;
            } else {
                ctx.fillStyle = `rgb(255, 255, 255)`;
            }
            // console.log(x * sizePixel, y * sizePixel, sizePixel, 1);

            ctx.fillRect(x * sizePixel + 1, y * sizePixel + 1, sizePixel - 1, sizePixel - 1);
        });
    });
}
