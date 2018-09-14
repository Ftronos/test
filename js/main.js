"use strict";

/**
 * Обект с кодами нажатых клавиш
 * @property 'A' Клавиша A;
 * @property 'D' Клавиша D;
 * @property 'LEFT' Стрелка вправо;
 * @property 'RIGHT' Стрелка влево;
 */
let keys = {
    'A': 65,
    'D': 68,
    'LEFT': 37,
    'RIGHT': 39,
};

/**
 * Обхект с клавишами, которые были нажаты во время игры, или нажаты в данный момент, сожержит код нажатой клавиши
 * клавиатуры и её статут в данный момент
 *
 */
let keyDown = {};

/**
 * Устанавливает клавише статус нажата
 * @param keyCode
 */
let setKey = function (keyCode) {
    keyDown[keyCode] = true;
};

/**
 * Убирает у клавишу статус нажата
 * @param keyCode
 */
let clearKey = function (keyCode) {
    keyDown[keyCode] = false;
};

/**
 * Проверяет нажата ли клавишу в данный момент
 * @param keyName
 * @returns {boolean}
 */
let isKeyDown = function (keyName) {
    return keyDown[keys[keyName]] === true;
};

/**
 * Проверяет нажатие любой клавиши
 * @returns {boolean}
 */
let isAnyKeyDown = function () {
    for(let k in keyDown) {
        if (keyDown[k]) {
            return true;
        }
    }
};

/**
 * При нажатии по клавиатуре получаем код клавише и передаём его для установки статуса в объект keyDown
 * @param e
 */
window.onkeydown = function (e) {
    setKey(e.keyCode);
};

/**
 * При отпускании клавиши получаем её код и передаём для установки статуса в объект keyDown
 * @param e
 */
window.onkeyup = function (e) {
    clearKey(e.keyCode);
};