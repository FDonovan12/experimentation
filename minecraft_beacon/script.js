window.addEventListener('click', (event) => {});

window.addEventListener('load', () => {
    drawCircle();
    beaconCirlce();
});

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
