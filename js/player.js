"use strict";

/**
 * Объект игрока (каретки)
 * @property level Уровень сложности
 * @property hp Количество жизней
 * @property x Координата по x
 * @property y Координата по y
 * @property width Ширина каретки
 * @property height Высота каретки
 * @property color Цвает каретки
 * @property speed Скорость каретки
 * @property dx Перемещение по горизонтали
 * @property score Счёт игрока
 * @property time Время игры, сек
 */
let player = {
    level: 1,
    hp: 1000,
    x: 50,
    y: null,
    width: 100,
    height: 10,
    color: 'yellow',
    speed: 2,
    dx: 0,
    score: 0,
    time: 0,

    /**
     * Обновляет счёт игры
     * @param score На сколько увеличивать счёт
     */
    updScore(score) {
        this.score += score;
        // Перезаписываем счёт игры в тег c id score
        document.querySelector('#score').innerHTML = this.score;
    },

    /**
     * Обновляем количество жизней
     * @param hp На сколько уменьшить количество жизней
     */
    updHp(hp) {
        this.hp -= hp;
        // Перезаписываем количество жизней в тег c id hp
        document.querySelector('#hp').innerHTML = this.hp;
    },

    /**
     * Отрисвывает каретку
     */
    draw() {
        drawRect(this.x, this.y, this.width, this.height, this.color)
    },

    /**
     * Передвигает каретку
     */
    move() {
        // Если нажата клавиша влево
        if (isKeyDown('LEFT')) {
            // Уменьшаем значение координаты каретки на число равное скорости каретки
            this.x -= this.speed;
            // Устанавливаем перемещение по горизонтали как отрицательное
            this.dx = -1;
        }
        // Если нажата клавиша влево
        else if (isKeyDown('RIGHT')) {
            // Увеличиваем значение координаты каретки на число равное скорости каретки
            this.x += this.speed;
            // Устанавливаем перемещение по горизонтали как положительное
            this.dx = 1;
        } else {
            // Устанавливаем что картка не перемещается
            this.dx = 0;
        }
    },

    /**
     * Перезаписывает свойства объекта в зависимости от переданных параметров
     * @param x Координата по x
     * @param w Цирина
     * @param color Цвет
     */
    init(x, y, w, color) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.color = color;

        // Устанавливаем начальные значения в элементы счёта и жизней
        document.querySelector('#score').innerHTML = this.score;
        document.querySelector('#hp').innerHTML = this.hp;
    }
};