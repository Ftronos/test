"use strict";

/**
 * Объект игрока (каретки)
 * @property x Координата по x
 * @property y Координата по y
 * @property width Ширина каретки
 * @property height Высота каретки
 * @property color Цвает каретки
 * @property speed Скорость каретки
 * @property dx Перемещение по горизонтали
 */
const player = {
    x: 50,
    y: null,
    width: 100,
    height: 10,
    color: 'yellow',
    speed: 2,
    dx: 0,

    /**
     * Отрисовывает каретку
     */
    draw() {
        drawRect(this.x, this.y, this.width, this.height, this.color);
    },

    /**
     * Проверяет возможно ли перемещение каретки
     */
    canMove() {
        // Проверяем где окажется каретка в следующий момент времени
        let nextPosition = this.x + this.dx;
        // Если она окажется вне игровой области то шаг не может быть сделан
        if (nextPosition + this.width > width || nextPosition < 0) {
          return false;
        }

        return true;
    },

    /**
     * Передвигает каретку
     */
    move(distance) {
        this.x += this.dx * distance * 0.01 * width;
    },

    /**
     * Передвигает каретку на заданное количество процентов влево
     * @param distance количество процентов на которое надо передвинуть каретку
     */
    moveLeft(distance) {
        this.x -= distance * 0.01 * width;
    },

    /**
     * Передвигает каретку на заданное количество процентов вправо
     * @param distance количество процентов на которое надо передвинуть каретку
     */
    moveRight(distance) {
        this.x += distance* 0.01 * width;
    },

    /**
     * Передвигает каретку на заданное количество процентов скачком
     * @param distance количество процентов на которое надо передвинуть каретку
     */
    moveLeap(distance) {
        this.x = distance * 0.01 * width;
    },

    /**
     * Перезаписывает свойства объекта в зависимости от переданных параметров
     * @param x Координата по x
     * @param y Координата по y
     * @param w Цирина
     * @param color Цвет
     */
    init(x, y, w, color) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.color = color;
    },
};