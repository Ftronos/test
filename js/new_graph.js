"use strict";

/**
 * Инициализируем переменные
 * canvas - элемент где будет рисоваться поле
 * width - его ширина
 * height - его длина
 * ctx - контекст рисования
 */
let canvas, width, height, ctx;

/**
 * Записывает значения в глобальные переменные
 */
let init = function () {
    // Получаем элемент canvas
    canvas = document.querySelector('#canvas');
    // Получаем его ширину
    width = window.innerWidth / 2;
    canvas.width = `${width}`;
    // Получаем его длину
    height = width / 4 * 3;
    canvas.height = `${height}`;
    // задаём контекст рисования
    ctx = canvas.getContext('2d');
};

// let init = function () {
//     // Получаем элемент canvas
//     canvas = document.querySelector('#canvas');
//     // Получаем его ширину
//     width = canvas.width;
//     // Получаем его длину
//     height = canvas.height;
//     // задаём контекст рисования
//     ctx = canvas.getContext('2d');
// };

/**
 * Заливает элемент цветом
 * @param color Цвет для заливки
 */
let fillAll = function (color) {
    ctx.fillStyle = '#000000';

    // Заливаем элемент
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
};

let clearAll = function () {
    ctx.clearRect(0, 0, width, height);
};

/**
 * Рисует прямоугольник по переданным параметрам
 * @param x Начальная точка по x
 * @param y Начальная точка по y
 * @param w Ширина
 * @param h Высота
 * @param color Цвет заливки
 */
let drawRect = function (x, y, w, h, color) {
    let grd = ctx.createLinearGradient(x,y,x,y + h);
    grd.addColorStop(0,"#23bdff");
    grd.addColorStop(1,"#023dff");

    // Задаём цвет для заливки
    ctx.fillStyle = grd;
    // Рисуем прямоугольник
    ctx.fillRect(x, y, w, h);
};

/**
 * Рисует прямоугольник по переданным параметрам
 * @param x Начальная точка по x
 * @param y Начальная точка по y
 * @param w Ширина
 * @param h Высота
 * @param color Цвет заливки
 */
let drawPlayerRect = function (x, y, w, h, color) {
    let grd = ctx.createLinearGradient(x,y,x,y + h);
    grd.addColorStop(0,"#777777");
    grd.addColorStop(0.5,"#bbbbbb");
    grd.addColorStop(1,"#111111");

    // Задаём цвет для заливки
    ctx.fillStyle = grd;
    // Рисуем прямоугольник
    ctx.fillRect(x, y, w, h);
};

/**
 * Рисует круг по переданным параметрам
 * @param x Начальная точка по x
 * @param y Начальная точка по y
 * @param r Радиус
 * @param color Цвет заливки
 */
let drawCircle = function (x, y, r, color) {
    let grd = ctx.createLinearGradient(x - r,y - r,x + r,y + r);
    grd.addColorStop(0,"#eeeeee");
    grd.addColorStop(1,"#000000");
    // Задаём цвет для заливки
    ctx.fillStyle = grd;
    // Запускаем новый путь
    ctx.beginPath();
    // Рисуем окружность
    ctx.arc(x, y, r, 0, Math.PI * 2);
    // Заполняем получившуюся фигуру (круг) с текущим цветом заливки
    ctx.fill();
};

/**
 * Проверяет столкновение объектов по вертикали
 * @param x1 Координата по x первого элемента
 * @param y1 Координата по y первого второго
 * @param w1 Ширина первого второго
 * @param h1 Высота первого элемента
 * @param x2 Координата по x второго второго
 * @param y2 Координата по y второго второго
 * @param w2 Ширина второго второго
 * @param h2 Высота второго элемента
 * @returns {boolean}
 */

let isCollision = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return (x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        h1 + y1 > y2);
};