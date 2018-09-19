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

        // Устанавливаем обработчики событий
        this.setEventHandlers();

        // Запускаем игру
        if (this.startGame()) {
            // Создаём переменную которая будет запускать игру с периодом отрисовки в 1 секунду деленную на скорость мяча
            let gameTickId = setInterval(this.gameTick, 1000 / (this.ball.speed * 60));
        }
    },

    /**
     * Ставит обработчики события.
     */
    setEventHandlers() {
        // При нажатии кнопки, если статус игры "играем", то вызываем функцию смены направления у змейки.
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    /**
     * Обработчик события нажатия кнопки клавиатуры.
     * @param {KeyboardEvent} event
     */
    keyDownHandler(event) {
        // Если статус игры не "играем", значит обрабатывать ничего не нужно.
        if (!this.condition.isPlaying()) {
            return;
        }
        // Получаем направление каретки, больше мы не обрабатываем других нажатий.
        this.player.dx = this.getDirectionByCode(event.code);

        // Если каретка может сделать передвижение, то передвигаем
        if (this.player.canMove()) {
            player.move(1);
        }
    },

    /**
     * Отдает направление змейки в зависимости от переданного кода нажатой клавиши.
     * @param {string} code Код нажатой клавиши.
     * @returns {string} Направление змейки.
     */
    getDirectionByCode(code) {
        switch (code) {
            case 'KeyD':
            case 'ArrowRight':
                return 1;
            case 'KeyA':
            case 'ArrowLeft':
                return -1;
            default:
                return 0;
        }
    },

    /**
     * Запускает игру
     */
    startGame() {
        while(true) {
            let confirmation = +prompt('Введите 1 для начала игры');

            if (confirmation === 1) {
                return true;
            }
        }
    },

    /**
     * Основная функция, отвечающая за 1 тик игры, где происходит передвижение элементов, проверка на их столкновение
     * и отрисовка
     */
    gameTick() {
        // Проверяем будет ли столкновение на следующем шаге
        ball.collision();
        // Передвигаем мяч
        ball.move();

        // Передвигаем каретку
        player.move(0);

        // Затираем всё поле
        fillAll('#cccccc');

        // Отрисовываем сетку ячеек
        grid.draw();

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
        this.setSpeed(2);

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
    },

    /**
     * Обновляет счёт игры
     */
    updScore() {
        this.score += 1;
        document.querySelector('#score').innerHTML = this.score;
    }
};