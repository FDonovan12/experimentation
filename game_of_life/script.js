const sizePixel = 10;
let list = [[]];

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.addEventListener('click', (event) => {
        changeSquare(event);
    });
    const widthRange = document.getElementById('width');
    const heightRange = document.getElementById('height');
    getInputValue(widthRange);
    widthRange.addEventListener('input', () => {
        getInputValue(widthRange);
    });
    getInputValue(heightRange);
    heightRange.addEventListener('input', () => {
        getInputValue(heightRange);
    });
    initGameOfLife();
});

function printMousePos(event) {
    return 'clientX: ' + event.clientX + ' - clientY: ' + event.clientY;
}

function getInputValue(input) {
    console.log('getInputValue :');
    const value = input.value;
    const aria = input.ariaLabel;
    const label = document.getElementById(aria);
    label.textContent = value;
    setCanvasSize();
    printGameOfLife();
}

function setCanvasSize() {
    const canvas = document.getElementById('canvas');

    const widthValue = document.getElementById('width').value;
    canvas.width = widthValue * sizePixel + 1;

    const heightValue = document.getElementById('height').value;
    canvas.height = heightValue * sizePixel + 1;
    ctx = canvas.getContext('2d');
}

function initGameOfLife() {
    const canvas = document.getElementById('canvas');
    setCanvasSize();
    ctx = canvas.getContext('2d');
    const width = Math.trunc(canvas.width / sizePixel);
    const height = Math.trunc(canvas.height / sizePixel);
    ctx.fillRect(0, 0, width * sizePixel + 1, height * sizePixel + 1);
    list = Array.apply(null, Array(width)).map((e) =>
        Array.apply(null, Array(height)).map((e) => 0)
    );
    list[4][4] = 1;
    list[4][5] = 1;
    list[4][6] = 1;
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
