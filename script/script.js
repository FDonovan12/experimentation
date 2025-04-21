function oneRoll(subModule) {
    subModule = subModule.map((element) => element || Math.random() < 0.001);
    return subModule;
}

function whileRoll(params) {
    let subModule = [false, false, false, false, false, false];
    // const cost = [10, 50, 200, 500, 1200, 2000];
    const cost = [10, 40, 160, 500, 1000, 2000];
    let count = 0;
    let costTotal = 0;
    while (subModule.filter((element) => element).length < 6) {
        costTotal += cost[subModule.filter((element) => element).length];
        subModule = oneRoll(subModule);
        count++;
        if (count > 1000000) {
            console.error('ERROR');

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

window.addEventListener('load', () => {
    // multipleWhileRoll(10000);
    console.log('end');
});
