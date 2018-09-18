"use strict";

const game = {
    // Счёт игры
    score: null,
    // Время игры
    time: null,
    // Количество жизней
    hp: null,
    // Массив с историей событий
    eventHistory: [],
    player,
    grid,
    ball,
    condition,
    settings,

    /**
     * Запускает игру
     */
    init() {
        // Обнуляем начальные параметры
        this.reset();

        // Устанавливаем игру в статус "Играем"
        this.condition.setPlaying();

        // Устанавливаем полученные от пользователя параметры
        this.setParametrs();

        // Рисуем начальные фигуры
        init();

        // Делаем первоначальную заливку
        fillAll('#cccccc');


        // Перемещаем каретку на начальное положение
        this.player.init((width - player.width) / 2, height - 10, this.player.width, 'blue');

        // Перемещаем мяч в начальное положение
        this.ball.init(this.player.x + Math.ceil(this.player.width / 2),
            this.player.y - this.ball.radius, this.ball.radius, 'blue');

        // Генерируем сетку ячеек
        this.grid.generate(5, 5, 20, 'red');

        // Рисуем сетку ячеек
        this.grid.draw();

        // Рисуем игрока
        this.player.draw();

        // Рисуем мяч
        this.ball.draw();

        // Создаём переменную которая будет запускать игру с периодом отрисовки в 1 секунду деленную на скорость мяча
        let gameTickId = setInterval(this.gameTick, 1000 / (this.ball.speed * 60));
    },

    /**
     * Отрисовывает перемещает, а также отрисовывает игрока, мяч
     */
    gameTick() {
        // Проверяем будет ли столкновение на следующем шаге
       // this.ball.collision();
        // Передвигаем мяч
        ball.move();

        // Передвигаем каретку
        player.move(1);

        // Затираем всё поле
        fillAll('#cccccc');

        // Отрисовываем мяч
        ball.draw();

        // Отрисовываем игрока
        player.draw();
    },

    /**
     * Задаёт дефолтные настройки
     */
    reset() {
        // Обнуляем счёт
        this.score = 0;
        // Обнуляем время
        this.time = 0;
    },

    /**
     * Выставляет параметры, переданные пользователем
     */
    setParametrs() {
        // Устанавливаем максимальное время
        this.setMaxTime(60);

        // Устанавливаем счёт для победы
        this.setMaxCount(10);

        // Устанавливаем количество строк
        this.setRows(5);

        // Устанавливаем количество столбов
        this.setCols(5);

        // Устанавливаем количество жизней
        this.setHp(3);

        // Устанавливаем ширину каретки (% от общей ширины)
        this.setPlayerWidth(10);

        // Устанавливаем процент сдвига
        this.setMoveDistance(1);

        // Устанавливаем скорость мяча
        this.setSpeed(1);

        // Устанавливаем начальные значения в элементы счёта и жизней
        document.querySelector('#score').innerHTML = this.score;
        document.querySelector('#hp').innerHTML = this.hp;
    },

    /**
     * Выставляет максимальное возможное врем игры
     * @param time время игры
     */
    setMaxTime(time) {
        this.settings.maxTime = time;
    },

    /**
     * Выставляет количество ячеек для победы
     * @param count количество ячеек
     */
    setMaxCount(count) {
        this.settings.maxCount = count;
    },

    /**
     * Выставляет количество строк
     * @param rows количество строк
     */
    setRows(rows) {
        this.settings.rows = rows;
    },

    /**
     * Выставляет количество столбцов
     * @param cols количество столбцов
     */
    setCols(cols) {
        this.settings.cols = cols;
    },

    /**
     * Выставляет количество жизней
     * @param hp количество жизней
     */
    setHp(hp) {
        this.hp = hp;
    },

    /**
     * Выставляет ширину каретки
     * @param w ширина каретки
     */
    setPlayerWidth(w) {
        this.settings.width = w;
    },

    /**
     * Выставляет процент сдвига
     * @param d процент сдвига
     */
    setMoveDistance(d) {
        this.settings.moveDistance = d;
    },

    /**
     * Выставляет скорость мяча
     * @param speed скорость мяча
     */
    setSpeed(speed) {
        this.ball.speed = speed;
    }
};