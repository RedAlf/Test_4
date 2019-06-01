"use strict"

import "./style.scss";

const sideLength = 8;
let field = document.getElementsByClassName('field')[0];

// Функция очищает поле от уже имеющихся зеленых и синих клеток
function ClearField() {
    let greenCells = document.getElementsByClassName('greenCell');
    let blueCell = document.getElementsByClassName('blueCell')[0];

    for (let i = 0; i < greenCells.length;) {
        greenCells[i].classList.remove('greenCell');
    };

    if (blueCell) {
        blueCell.classList.remove('blueCell');
    }
}

// Функция выделяет клетки зеленым цветом
function HighLight(x, y) {
    let greenCell = document.getElementsByClassName('x' + `${x}` + 'y' + `${y}`)[0];
    greenCell.classList.toggle('greenCell');
}

// Функция определяет клетки, в которые можно совершить ход
function FindMatches(xStart, yStart) {
    for (let i = 1; i < 3; i++) {
        for (let j = 1; j < 3; j++) {
            if (i !== j) {
                if (yStart - j > -1) {
                    if (xStart - i > -1) {
                        HighLight(xStart - i, yStart - j);
                    }
                    if (xStart + i < sideLength) {
                        HighLight(xStart + i, yStart - j);
                    }
                }
                if (yStart + j < sideLength) {
                    if (xStart - i > -1) {
                        HighLight(xStart -i , yStart + j);
                    }
                    if (xStart + i < sideLength) {
                        HighLight(xStart + i, yStart + j);
                    }
                }
            }
        }
    }
}

// Инициализация шахматного поля
function Initialisation() {
    for (let i = 0; i < sideLength; i++ ) {
        for ( let j = 0; j < sideLength; j++ ) {
            let cell = document.createElement('div');
            cell.classList.add('x' + `${i}` + 'y' + `${j}`);
            cell.onclick = function() {
                ClearField();
                this.classList.toggle('blueCell');
                FindMatches(i, j);
            };
            if ( (i + j + 2) % 2 === 0 ) {
                cell.classList.add('whiteCell');
                field.appendChild(cell);
            } else {
                cell.classList.add('blackCell');
                field.appendChild(cell);
            }
        }
    }
}

Initialisation();