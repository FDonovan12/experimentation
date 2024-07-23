window.addEventListener('click', (event) => {});

window.addEventListener('load', () => {
    const hanoiInput = document.querySelector('#hanoiInput');
    hanoiTowerResolution(parseInt(hanoiInput.value));
    hanoiInput.addEventListener('change', () => {
        hanoiTowerResolution(parseInt(hanoiInput.value));
    });
});

function hanoiTowerResolution(nbRings) {
    console.log('\nstart\n');
    const initFirstTower = Array.from(Array(nbRings).keys()).reverse();
    const tab = [initFirstTower, [], []];
    printHanoiTower(tab);
    if (typeof nbRings === 'string') {
        throw new Error();
    }
    console.log(tab);
    hanoiTowerResolutionRecursive(tab, nbRings, 0, 2);
    console.log(tab);
}
function hanoiTowerResolutionRecursive(tab, nbRings, fromTower, toTower) {
    printHanoiTower(tab);
    if (nbRings === 1) {
        const lasElementFromTower = tab[fromTower].pop();
        if (lasElementFromTower === undefined) {
            throw new Error();
        }
        tab[toTower].push(lasElementFromTower);
    } else {
        const otherTower = [0, 1, 2].filter((tower) => tower != fromTower && tower != toTower)[0];
        hanoiTowerResolutionRecursive(tab, nbRings - 1, fromTower, otherTower); // 2, 0, 1 -> (1, 0, 2 | 1, 0, 1 | 1, 2, 1)
        hanoiTowerResolutionRecursive(tab, 1, fromTower, toTower); // 1, 0, 2
        hanoiTowerResolutionRecursive(tab, nbRings - 1, otherTower, toTower); // 2, 1, 2 -> (1, 1, 1 | 1, 1, 2 | 1, 1, 2)
    }
    printHanoiTower(tab);
}

function printHanoiTower(hanoi) {
    console.log(`${hanoi[0]} | ${hanoi[1]} | ${hanoi[2]}`);
}
