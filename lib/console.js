// Require the lib, get a working terminal
let term = require('terminal-kit').terminal;
function terminate() {
    term.grabInput(false);
    setTimeout(function() {
        process.exit();
    }, 100);
}
const _ = require('lodash');
const boxes = require('cli-boxes');
term.grabInput();
term.fullscreen(true);
// Move the cursor at the upper-left corner
term.moveTo(1, 1, 'Sudoku');

// Width and height of the terminal
// term('The terminal size is %dx%d', term.width, term.height);
let activeCell = { x: 2, y: 1 };
let keyActions = {
    CTRL_C: terminate,
    UP: () => {
        previous = _.cloneDeep(activeCell);
        term.up(1);
    },
    DOWN: () => {
        let previous = _.cloneDeep(activeCell);
        activeCell.y += 1;
        console.log(activeCell);
        moveCursorToCell(grid.getCell(activeCell));
        displayCell(grid.getCell(previous));
    },
    LEFT: () => {
        term.left(1);
    },
    RIGHT: () => {
        term.right(1);
    }
};

term.on('key', function(name, matches, data) {
    //term.moveTo(1, 2, '\'key\' event:', name);

    if (keyActions[name]) {
        keyActions[name]();
    } else {
    }
});

term.on('terminal', function(name, data) {
    console.log('\'terminal\' event:', name, data);
});

const Grid = require('./model/grid');

let gridOffset = { x: 5, y: 5 };
drawHLine({ x: 10, y: 4 }, { x: 79, y: 4 });
// drawHLine({ x: 10, y: 8 }, { x: 79, y: 4 });
// drawHLine({ x: 10, y: 12 }, { x: 79, y: 4 });
drawHLine({ x: 10, y: 16 }, { x: 79, y: 4 });
// drawHLine({ x: 10, y: 20 }, { x: 79, y: 4 });
// drawHLine({ x: 10, y: 24 }, { x: 79, y: 4 });
drawHLine({ x: 10, y: 28 }, { x: 79, y: 4 });
// drawHLine({ x: 10, y: 32 }, { x: 79, y: 4 });
// drawHLine({ x: 10, y: 36 }, { x: 79, y: 4 });
drawHLine({ x: 10, y: 40 }, { x: 79, y: 4 });
let grid = new Grid();

for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
        let position = { x, y };
        let cell = grid.getCell(position);
        displayCell(cell);
    }
}

moveCursorToCell(grid.getCell(activeCell));

function displayCell(cell) {
    let offset = getScreenPosition(cell.getPosition());
    let candidaates = cell.getCandidiates();
    for (let i = 1; i < 10; i++) {
        let column = Math.floor((i - 1) / 3);
        let row = i - 1 - column * 3;
        term.moveTo((offset.x + column) * 2, offset.y + row);
        if (
            activeCell.x === cell.getPosition().x &&
            activeCell.y === cell.getPosition().y
        ) {
            term.bgBlue();
        } else {
            term.bgDefaultColor();
        }
        term.white(i);
    }
}

function getScreenPosition(cellPosition) {
    let x = cellPosition.x;
    let y = cellPosition.y;
    let offset = { x: x * 4 + gridOffset.x, y: y * 4 + gridOffset.y };
    offset.x += Math.floor(x / 3); // extra space horizontal
    // offset.x = offset.x;
    return offset;
}

function moveCursorToCell(cell) {
    let screenPosition = getScreenPosition(cell.getPosition());
    term.moveTo(screenPosition.x * 2, screenPosition.y);
}

function drawLines() {}

function drawHLine(start, end) {
    for (x = start.x; x < end.x; x++) {
        term.moveTo(x, start.y, boxes.double.horizontal);
    }
}
