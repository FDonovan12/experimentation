// Définition de la zone de dessin

function oneRoll(subModule) {
    subModule = subModule.map((element) => element || Math.random() < 0.001);
    return subModule;
}

function whileRoll(params) {
    let subModule = [false, false, false, false, false, false];
    const cost = [10, 50, 200, 500, 1200, 2000];
    let count = 0;
    let costTotal = 0;
    while (subModule.filter((element) => element).length < 6) {
        costTotal += cost[subModule.filter((element) => element).length];
        subModule = oneRoll(subModule);
        count++;
        if (count > 1000000) {
            console.log('ERROR');

            break;
        }
    }
    // console.log("count :", count, subModule, costTotal);
    return { count: count, costTotal: costTotal };
}

function multipleWhileRoll(number) {
    let count = 0;
    let costTotal = 0;
    let xyValues = [];
    for (let i = 0; i < number; i++) {
        temp = whileRoll();
        costTotal += temp.costTotal;
        count += temp.count;
        // console.log("temp :", temp);
        xyValues.push({ x: i, y: temp.costTotal });
    }
    xyValues.sort((a, b) => a.y - b.y);
    for (var i = 0; i < xyValues.length; i++) {
        const temp = { x: i, y: xyValues[i].y };
        xyValues[i] = temp;
        // xyValues.forEach((element) => (element.x = i));
    }
    drawChartScatter(xyValues);
    console.log('temp :', count / number, costTotal / number);
}
function drawChartScatter(xyValues) {
    new Chart('canvas', {
        type: 'scatter',
        data: {
            datasets: [
                {
                    pointRadius: 4,
                    pointBackgroundColor: 'rgb(0,0,255)',
                    data: xyValues,
                },
            ],
        },
        options: {
            legend: { display: false },
        },
    });
}
function drawChartBar(xValues, yValues, barColors) {
    xValues = xValues ? xValues : ['Italy', 'France', 'Spain', 'USA', 'Argentina'];
    yValues = yValues ? yValues : [55, 49, 44, 24, 15];
    barColors = barColors ? barColors : ['red', 'green', 'blue', 'orange', 'brown'];

    if (barColors) {
        console.log('true');
    } else {
        console.log('false');
    }
    new Chart('canvas', {
        type: 'bar',
        data: {
            labels: xValues,
            datasets: [
                {
                    backgroundColor: barColors,
                    data: yValues,
                },
            ],
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'World Wine Production 2018',
            },
        },
    });
}
function printMousePos(event) {
    return 'clientX: ' + event.clientX + ' - clientY: ' + event.clientY;
}
function mandelbrot(z, maxIterations) {
    let c = { real: -0.75, imag: 0 };
    const absBase = Math.sqrt(z.real * z.real + z.imag * z.imag);

    for (let i = 0; i < maxIterations; i++) {
        z = {
            real: z.real * z.real - z.imag * z.imag + c.real,
            imag: 2 * z.real * z.imag + c.imag,
        };

        if (Math.sqrt(z.real * z.real + z.imag * z.imag) >= 4) {
            return i;
        }
    }
    return maxIterations;
}

function drawFractal(xmin, xmax, ymin, ymax, maxIterations) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let count = {};
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const c = {
                real: xmin + (x / width) * (xmax - xmin),
                imag: ymin + (y / height) * (ymax - ymin),
            };

            const iterations = mandelbrot(c, maxIterations);
            if (!count.hasOwnProperty(iterations)) {
                count[iterations] = 0;
            }
            count[iterations]++;

            const color = 255 * (((iterations + 0) / maxIterations) * (4 / colorZoom));
            const secondColor = color / 2;

            if (iterations != maxIterations) {
                switch (iterations % 3) {
                    case 0:
                        ctx.fillStyle = `rgb(${color}, ${secondColor}, ${secondColor})`;
                        break;
                    case 1:
                        ctx.fillStyle = `rgb(${secondColor}, ${color}, ${secondColor})`;
                        break;
                    case 2:
                        ctx.fillStyle = `rgb(${secondColor}, ${secondColor}, ${color})`;
                        break;
                    default:
                        break;
                }
                // ctx.fillStyle = `rgb(${color}, ${secondColor}, ${secondColor})`;
            } else {
                ctx.fillStyle = `rgb(0, 0, 0)`;
            }

            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function prepareZoom(event) {
    const canvas = document.getElementById('canvas');
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    midValue = { x: mouseX / width, y: mouseY / height };
    ctx.beginPath();
    ctx.lineWidth = '3';
    ctx.strokeStyle = 'red';
    ctx.rect(mouseX - width / 4, mouseY - height / 4, width / 2, height / 2);
    ctx.stroke();

    const zoomX = { min: midValue.x - zoomValue, max: midValue.x + zoomValue };
    const zoomY = { min: midValue.y - zoomValue, max: midValue.y + zoomValue };

    const deltaX = xmax - xmin;
    const deltaY = ymax - ymin;
    xmin = xmin + deltaX * zoomX.min;
    xmax = xmax - deltaX * (1 - zoomX.max);
    ymin = ymin + deltaY * zoomY.min;
    ymax = ymax - deltaY * (1 - zoomY.max);
    colorZoom = Math.abs(Math.log2(1 / zoomValue));
    colorZoom = colorZoom == Infinity ? 1 : colorZoom;
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
    // runGameOfLife(ctx, 10, 1000, sizePixel);
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
        runGameOfLife(ctx, 200, 100, sizePixel);
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
    // console.log('list', list);
    // return 2;
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
            if (!square) {
                ctx.fillStyle = `rgb(255, 255, 255)`;
            } else {
                ctx.fillStyle = `rgb(0, 0, 0)`;
            }
            // console.log(x * sizePixel, y * sizePixel, sizePixel, 1);

            ctx.fillRect(x * sizePixel + 1, y * sizePixel + 1, sizePixel - 1, sizePixel - 1);
        });
    });
}

function drawCircle() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = Math.trunc(canvas.width);
    const height = Math.trunc(canvas.height);
    const radius = (Math.min(width, height) / 2) * 0.9 - 1;
    const center = { x: width / 2, y: height / 2 };
    var X = canvas.width / 2;
    var Y = canvas.height / 2;
    const numberRay = 1000;
    for (let i = 1; i <= numberRay; i++) {
        const angle = ((2 * Math.PI) / numberRay) * i;
        let a = Math.trunc((radius / sizePixel) * Math.cos(angle) + center.x / sizePixel);
        let b = Math.trunc((radius / sizePixel) * Math.sin(angle) + center.y / sizePixel);
        ctx.fillStyle = `#FF0000`;
        ctx.fillRect(a * sizePixel, b * sizePixel, sizePixel, sizePixel);
        console.log(a, b);
    }
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#00FF00';
    ctx.stroke();
}

function beaconCirlce() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = Math.trunc(canvas.width);
    ball = document.getElementById('ball');
    const height = Math.trunc(canvas.height);
    const radius = (Math.min(width, height) / 2) * 0.9;
    const center = { x: width / 2, y: height / 2 };
    const numberRay = 10;
    for (let i = 1; i <= numberRay; i++) {
        const angle = ((2 * Math.PI) / numberRay) * i;
        const a = radius * Math.cos(angle) + center.x;
        const b = radius * Math.sin(angle) + center.y;
        ctx.beginPath(); // Start a new path
        ctx.moveTo(center.x, center.y); // Move the pen to (30, 50)
        ctx.lineTo(a, b); // Draw a line to (150, 100)
        console.log(a, b);

        ctx.lineWidth = sizePixel;
        ctx.strokeStyle = '#000000';
        ctx.stroke(); // Render the path
    }
}

function findBetterCenterForBeacon(radius, angle, limitDistance) {}
// Définition des paramètres

let xmin = -1.5;
let xmax = 1.5;
let ymin = 1;
let ymax = -1;
const maxIterations = 64;

const zoomValue = 0.1;
let colorZoom = 1;
let zoom = false;

const sizePixel = 10;
let list = null;

window.addEventListener('click', (event) => {
    // prepareZoom(event);
    // drawFractal(xmin, xmax, ymin, ymax, maxIterations);
    changeSquare(event, list);
});

window.addEventListener('load', () => {
    // drawFractal(xmin, xmax, ymin, ymax, maxIterations);
    // multipleWhileRoll(10000);
    initGameOfLife();
    // drawCircle();
    // beaconCirlce();
    console.log('end');
});
