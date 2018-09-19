"use strict";

/**
 * Объект с сеткой выбиваемых ячеек
 * @property nodes Объект с текущими ячейками
 */
let grid = {
    nodes: [],
    cellsCount: null,

    /**
     * Добавляет новую ячейку врага и записывает в массив ячеек nodes
     * @param x Координата ячейки по x
     * @param y Координата ячейки по y
     * @param w Ширина ячейки
     * @param h Высота ячейки
     * @param c Цвет ячейки
     */
    add(x, y, w, h, c) {
        let tmp = new _Enemy(x, y, w, h, c);
        this.nodes.push(tmp);
    },

    /**
     * Создаёт сетку ячеек по переданным параметрам
     * @param rows Количество ячеек
     * @param cols ширина одной ячейки
     * @param h Высота одной ячейки
     * @param color Цвет ячейки
     */
    generate(rows, cols, h, color) {
        // Расстояние между ячейками
        let dW = 5,
            // Координата по горизонтали ячейки
            dX = dW,
            // Координата по вертикали первой ячейки
            dY = dW,
            // Количество ячеек помещающихся в одной строке
            dCountX = cols,
            // Ширина одной ячейки
            cellWidth = Math.ceil((width - dW * cols) / cols),
            // Отступ слева блока, который занимает одна строка я ячейками
            dAllW = Math.ceil((width - (cols * cellWidth + (cols - 1) * dW)) / 2);
        // Устанавливаем что отступ первой строки сверху должен быть таким же, как и слева у первой ячейки
        dY = dAllW;
        for (let i = 0; i < rows; i++) {
            // Обновляем координату слева
            dX = dW;
            for (let j = 0; j < dCountX; j++) {
                // Если ячейка первая, то коорината по x равно отступу первой строки слева, за минусом расстояния
                // между ячейками
                if (j === 0) {
                    dX += dAllW - dW;
                }
                // Добавляем ячейку
                this.add(dX, dY, cellWidth, h, color);
                dX += cellWidth + dW;
            }
            // Добавляем к координате по y высоту ячейки
            dY += h + dW;
        }

        this.cellsCount = rows * cols;
    },

    /**
     * Очищает массив ячеек
     */
    clear() {
        this.nodes = [];
    },

    /**
     * Убирает ячейку из массива ячеек
     * @param id Номер ячейки
     */
    destroy(id) {
        this.nodes.splice(id, 1);
    },

    /**
     * Отрисовывает сетку ячеек
     */
    draw() {
        for (let en in this.nodes) {
            this.nodes[en].draw();
        }
    },

    /**
     * Проверяет наличие ячеек в массиве nodes
     */
    gridIsEmpty() {
        // Если ячеек нет
        if (!this.nodes.length) {
            alert(`Поздравляем, вы выиграли!`);

            // Создаём запись о выигрыше
            let event = {name: 'player_win', time: player.time};
            // Записываем в массив событий
            settings.eventHistory.push(event);

            setResults();

            window.location.reload();
        }
    },
};

let _Enemy = function (x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
};

_Enemy.prototype.draw = function () {
    drawRect(this.x, this.y, this.width, this.height, this.color);
};