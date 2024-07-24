window.addEventListener('click', (event) => {});

window.addEventListener('load', () => {
    drawSpiral();
});

function drawSpiral() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let point = { width: width / 2, height: height / 2 };

    let direction = 1;
    let nbPath = 1;
    let count = 1;
    const numberLine = (Math.max(width, height) / size_path) * 2;
    console.log(numberLine);
    const precedentPrimeNumber = [];
    for (let i = 0; i < numberLine; i++) {
        for (let j = 1; j <= nbPath; j++) {
            // const number = (i * (i + 1)) / 2 + j;
            const number = count;

            if (isPrime(number, precedentPrimeNumber)) {
                precedentPrimeNumber.push(count);
                printSquare(ctx, point, direction);
            }
            point = nextPoint(point, direction);
            count++;
        }
        direction = (direction + 1) % 4;
        if (i % 2 === 1) {
            nbPath++;
        }
    }
    console.log(count);
    console.log(precedentPrimeNumber.length);
}

function printSquare(ctx, point, direction) {
    switch (direction) {
        case 0:
            ctx.fillStyle = `rgb(${0},${0},${0})`;
            break;
        case 1:
            ctx.fillStyle = `rgb(${255},${0},${0})`;
            break;
        case 2:
            ctx.fillStyle = `rgb(${0},${255},${0})`;
            break;
        case 3:
            ctx.fillStyle = `rgb(${0},${0},${255})`;
            break;

        default:
            break;
    }
    ctx.fillStyle = `rgb(${0},${0},${0})`;
    ctx.fillRect(point.width, point.height, size_pixel, size_pixel);
}

function isPrime(number, precedentPrimeNumber) {
    // let isPrimeValue = true
    if (precedentPrimeNumber) {
        for (let i = 0; i < precedentPrimeNumber.length; i++) {
            const primeNumber = precedentPrimeNumber[i];
            if (number % primeNumber === 0) {
                return false;
            }
            if (primeNumber > Math.sqrt(number)) {
                return true;
            }
        }
    } else {
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                return false;
            }
        }
    }
    return number !== 1 && number !== -1;
}

function nextPoint(point, direction) {
    switch (direction) {
        case 0: //north
            point.height += size_path;
            break;
        case 1: //east
            point.width += size_path;
            break;
        case 2: //south
            point.height -= size_path;
            break;
        case 3: //west
            point.width -= size_path;
            break;

        default:
            break;
    }
    return point;
}

const size_pixel = 1;
const size_path = size_pixel;
