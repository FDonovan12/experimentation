const sizePixel = 10;
let list = Array.apply(null, Array(100)).map((e) => Array.apply(null, Array(100)).map((e) => 0));

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.addEventListener('click', (event) => {
        changeSquare(event);
    });

    const widthRange = document.getElementById('width');
    widthRange.addEventListener('input', () => {
        initGameOfLife(widthRange);
    });

    const heightRange = document.getElementById('height');
    heightRange.addEventListener('input', () => {
        initGameOfLife(heightRange);
    });
    initGameOfLife();
});

function printMousePos(event) {
    return 'clientX: ' + event.clientX + ' - clientY: ' + event.clientY;
}

function setGetInputValue(input) {
    const value = input.value;
    const aria = input.ariaLabel;
    const label = document.getElementById(aria);
    label.textContent = value;
    return parseInt(value);
}

function setCanvasSize(height, width) {
    canvas.width = width * sizePixel + 1;
    canvas.height = height * sizePixel + 1;
}

// function setListSize(height, width) {
//     list = Array.apply(null, Array(100)).map((e) => Array.apply(null, Array(100)).map((e) => 0));
// }

function initGameOfLife() {
    const canvas = document.getElementById('canvas');

    const widthRange = document.getElementById('width');
    const heightRange = document.getElementById('height');

    const width = setGetInputValue(widthRange);
    const height = setGetInputValue(heightRange);

    setCanvasSize(height, width);
    // setListSize(height, width);

    list[4][4] = 1;
    list[4][5] = 1;
    list[4][6] = 1;

    ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, width * sizePixel + 1, height * sizePixel + 1);

    printGameOfLife();
}

function changeSquare(event) {
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const width = Math.trunc(mouseX / sizePixel);
    const height = Math.trunc(mouseY / sizePixel);
    if (width < list.length && height < list[0].length) {
        list[width][height] = 1 - list[width][height];
        printGameOfLife();
    }
}

function runGameOfLife(delay, numberLoop) {
    for (let i = 0; i < numberLoop; i++) {
        setTimeout(() => {
            list = list.map((row, x) => row.map((square, y) => realoadSquare(x, y)));
            printGameOfLife();
        }, delay * i);
    }
}

function realoadSquare(x, y) {
    square = list[x][y];
    count = countAroundSquare(x, y);
    if (square && [2, 3].includes(count)) {
        return 1;
    }
    if (!square && [3].includes(count)) {
        return 1;
    }
    return 0;
}

function countAroundSquare(x, y) {
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

function printGameOfLife() {
    list.forEach((row, x) => {
        row.forEach((square, y) => {
            if (square) {
                ctx.fillStyle = `rgb(0, 0, 0)`;
            } else {
                ctx.fillStyle = `rgb(255, 255, 255)`;
            }
            ctx.fillRect(x * sizePixel + 1, y * sizePixel + 1, sizePixel - 1, sizePixel - 1);
        });
    });
}
