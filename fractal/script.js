window.addEventListener('click', (event) => {
    prepareZoom(event);
    drawFractal(xmin, xmax, ymin, ymax, maxIterations);
});

window.addEventListener('load', () => {
    drawFractal(xmin, xmax, ymin, ymax, maxIterations);
});

let xmin = -1.5;
let xmax = 1.5;
let ymin = 1;
let ymax = -1;
const maxIterations = 64;

const zoomValue = 0.1;
let colorZoom = 1;
let zoom = false;

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
