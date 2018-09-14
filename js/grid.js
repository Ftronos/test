"use strict";

/**
 * Объект с сеткой выбиваемых ячеек
 * @property nodes Объект с текущими ячейками
 */
let grid = {
    nodes: [],

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
     * @param count Количество ячеек
     * @param w ширина одной ячейки
     * @param h Высота одной ячейки
     * @param color Цвет ячейки
     */
    generate(count, w, h, color) {
        // Расстояние между ячейками
        let dW = 5,
            // Координата по горизонтали ячейки
            dX = dW,
            // Координата по вертикали первой ячейки
            dY = dW,
            // Количество ячеек помещающихся в одной строке
            dCountX = Math.ceil(width / (w + dW)) - 1,
            // Отступ слева блока, который занимает одна строка я ячейками
            dAllW = Math.ceil((width - (w + dW)*dCountX) / 2);
        // Устанавливаем что отступ первой строки сверху должен быть таким же, как и слева у первой ячейки
        dY = dAllW;
        for (let i = 0; i < count; i++) {
            // Обновляем координату слева
            dX = dW;
            for (let j = 0; j < dCountX; j++) {
                // Если ячейка первая, то коорината по x равно отступу первой строки слева, за минусом расстояния
                // между ячейками
                if (j === 0) {
                    dX += dAllW - dW;
                }
                // Добавляем ячейку
                this.add(dX, dY, w, h, color);
                dX += w + dW;
            }
            // Добавляем к координате по y высоту ячейки
            dY += h + dW;
        }
    },

    /**
     * Создаёт сетку в ячеек в зависимости от переданного двумерного массива и параметров ячеек
     * @param map Объект со свойствами необходимой сетки и её ячеек
     */
    create(map) {
        // Устанавливаем координату по x так чтобы сетка была по центру
        let dOffsetX = (width - (map.tiles[0].length) * (map.width + map.offset)) / 2;

        // Проходимя по всем элементам двумерного массива
        for (let i in map.tiles) {
            for (let j in map.tiles[i]) {
                // Значение текущего элемента массива
                let tile = map.tiles[i][j]

                // Задаём координату по x
                let dx = dOffsetX + j * (map.width + map.offset);
                // задаём координату по y
                let dy = map.offset + i * (map.height + map.offset);

                // Если значение элемента не 0, то записываем его в массив ячеек
                if (tile) {
                    this.add(dx, dy, map.width, map.height, map.color);
                }
            }
        }
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

        // Проверяем остались ли ячейки
        this.gridIsEmpty();
    },

    /**
     * Проверяет наличие ячеек в массиве nodes
     */
    gridIsEmpty() {
        // Если ячеек нет
        if (!this.nodes.length) {
            alert(`Поздравляем, вы выиграли!`);

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