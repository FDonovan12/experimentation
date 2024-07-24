window.addEventListener('click', (event) => {});

window.addEventListener('load', () => {
    startTime = performance.now();
    drawSpiral();
    endTime = performance.now();
    console.log(endTime - startTime);
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
            ctx.fillStyle = `rgb(0,0,0)`;
            break;
        case 1:
            ctx.fillStyle = `rgb(255,0,0)`;
            break;
        case 2:
            ctx.fillStyle = `rgb(0,255,0)`;
            break;
        case 3:
            ctx.fillStyle = `rgb(0,0,255)`;
            break;

        default:
            break;
    }
    ctx.fillStyle = `rgb(0,0,0)`;
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

function createArray(sizeArray, mode) {
    const array = Array.from({ length: sizeArray }, () => Math.floor(Math.random() * sizeArray));
    array[mode] = 2 * sizeArray;
    return array;
}

function compareFilterAndForIf() {
    const nbInstance = 1000;
    const sizeArrays = [10, 100, 500, 1000];

    const timeFilter = [[], [], []];
    const timeForIf = [[], [], []];
    const timeForIfBreak = [[], [], []];
    const countFilter = [[], [], []];
    const countForIf = [[], [], []];
    const countForIfBreak = [[], [], []];
    let countTimeIsZero = 0;

    for (let i = 0; i < sizeArrays.length; i++) {
        const sizeArray = sizeArrays[i];
        for (let j = 0; j < 3; j++) {
            const mode = Math.floor((j * (sizeArray - 1)) / 2);
            let sum = 0;
            let sum2 = 0;
            let sum3 = 0;
            let count = 0;
            let count2 = 0;
            let count3 = 0;
            for (let k = 0; k < nbInstance; k++) {
                const array = createArray(sizeArray, mode);
                // console.log(j, mode, array);
                startTime = performance.now();
                const result = array.filter((element) => element === 2 * sizeArray);
                endTime = performance.now();
                sum += endTime - startTime;
                if (endTime - startTime === 0) {
                    countTimeIsZero++;
                    count++;
                }

                const array2 = createArray(sizeArray, mode);
                startTime = performance.now();
                for (let m = 0; m < array2.length; m++) {
                    const element = array2[m];
                    // count++;
                    if (element === 2 * sizeArray) {
                        // break;
                    }
                }
                endTime = performance.now();
                sum2 += endTime - startTime;
                if (endTime - startTime === 0) {
                    countTimeIsZero++;
                    count2++;
                }

                const array3 = createArray(sizeArray, mode);
                startTime = performance.now();
                for (let m = 0; m < array2.length; m++) {
                    const element = array2[m];
                    // count2++;
                    if (element === 2 * sizeArray) {
                        break;
                    }
                }
                endTime = performance.now();
                sum3 += endTime - startTime;
                if (endTime - startTime === 0) {
                    countTimeIsZero++;
                    count3++;
                }
                // console.log(sum3, endTime - startTime, endTime, startTime);
            }
            timeFilter[j].push(sum);
            timeForIf[j].push(sum2);
            timeForIfBreak[j].push(sum3);
            countFilter[j].push(count);
            countForIf[j].push(count2);
            countForIfBreak[j].push(count3);
        }
    }
    console.log(timeFilter);
    console.log(timeForIf);
    console.log(timeForIfBreak);
    console.log(countFilter);
    console.log(countForIf);
    console.log(countForIfBreak);
    console.log(countTimeIsZero);
    console.log(3 * nbInstance * 3 * sizeArrays.length);
}
// compareFilterAndForIf();
secondCompareFilterAndForIf();
console.log('end');

function secondCompareFilterAndForIf() {
    const nbInstance = 1000;
    const sizeArrays = [10, 100, 500, 1000];

    const timeFilter = [[], [], []];
    const timeForIf = [[], [], []];
    const timeForIfBreak = [[], [], []];
    const countFilter = [[], [], []];
    const countForIf = [[], [], []];
    const countForIfBreak = [[], [], []];
    let countTimeIsZero = 0;

    for (let i = 0; i < sizeArrays.length; i++) {
        const sizeArray = sizeArrays[i];
        for (let j = 0; j < 3; j++) {
            const mode = Math.floor((j * (sizeArray - 1)) / 2);
            timeFilter[j].push(runFilter(nbInstance, sizeArray, mode));
            timeForIf[j].push(runForIf(nbInstance, sizeArray, mode));
            timeForIfBreak[j].push(runForIfBreak(nbInstance, sizeArray, mode));
        }
    }
    console.log(timeFilter);
    console.log(timeForIf);
    console.log(timeForIfBreak);
}

function runFilter(nbInstance, sizeArray, mode) {
    sum = 0;
    startTime = performance.now();
    for (let k = 0; k < nbInstance; k++) {
        const array = createArray(sizeArray, mode);
        const result = array.filter((element) => element === 2 * sizeArray);
    }
    endTime = performance.now();
    return endTime - startTime;
}

function runForIf(nbInstance, sizeArray, mode) {
    startTime = performance.now();
    for (let k = 0; k < nbInstance; k++) {
        const array = createArray(sizeArray, mode);
        for (let m = 0; m < array.length; m++) {
            const element = array[m];
            if (element === 2 * sizeArray) {
                // break;
            }
        }
    }
    endTime = performance.now();
    return endTime - startTime;
}

function runForIfBreak(nbInstance, sizeArray, mode) {
    startTime = performance.now();
    for (let k = 0; k < nbInstance; k++) {
        const array = createArray(sizeArray, mode);
        for (let m = 0; m < array.length; m++) {
            const element = array[m];
            if (element === 2 * sizeArray) {
                break;
            }
        }
    }
    endTime = performance.now();
    return endTime - startTime;
}
