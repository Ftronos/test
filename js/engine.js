"use strict";

/**
 * Вызывет функцию, обновляющую экран с частотой 60 кадров/сек
 */
let _render = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            setTimeout(callback, 1000 / 60);
        };
})();

let _engine = function () {
    console.log('Игровой цикл не инициализирован');
};

/**
 * Запускает игру, если переданный параметр функция
 * @param game передаваемый параметр, должен быть функцией, запускающей другие функции
 */
let startGame = function (game) {
    // Если переданный параметр - функция, то запускаем игру
    if (typeof game === 'function') {
        _engine = game;
    };

    // Зацикливаем обновление игры
    gameLoop();
};

/**
 *
 * @param game
 */
let setGame = function (game) {
    if (typeof game === 'function') {
        _engine = game;
    };
}

/**
 * Проивзодит вычисления и обновляет игру
 */
let gameLoop = function () {
    //Произыводим вычисления
    _engine();

    // Перерисовываем карту
    _render(gameLoop);
};

// Переменная для проверки работы таймера
let timerIsInit = false;

/**
 * Раз в секунду вызывает функцию увеличения счётчика времени
 */
function initTimer() {
    setInterval(timerTick, 1000);
    timerIsInit = true;
};

function timerTick() {
    player.time++;
    document.querySelector('#timer').innerHTML = player.time;

    if (player.time > settings.maxTime) {
        alert('Игра закончена');

        window.location.reload();
    }
};