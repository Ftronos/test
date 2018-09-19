"use strict";

const game = {
    // Счёт игры
    score: null,
    // Время игры
    time: 0,
    // Количество жизней
    hp: null,
    // Массив с историей событий
    eventHistory: [],
    // Всего ячеек на начало игры
    cellsCount: null,
    gameTickId: null,
    timerTickId: null,
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

        // Рисуем начальные фигуры
        init();

        // Устанавливаем полученные от пользователя параметры
        this.setParametrs();

        // Делаем первоначальную заливку
        fillAll('#cccccc');

        // Перемещаем каретку на начальное положение
        this.player.init((width - player.width) / 2, height - 10, this.player.width, 'blue');

        // Перемещаем мяч в начальное положение
        this.ball.init(this.player.x + Math.ceil(this.player.width / 2),
            this.player.y - this.ball.radius, this.ball.radius, 'blue');

        // Генерируем сетку ячеек
        this.grid.generate(5, 5, 20, 'red');

        // Записываем общее количество ячеек
        this.cellsCount = this.grid.nodes.length;

        // Рисуем сетку ячеек
        this.grid.draw();

        // Рисуем игрока
        this.player.draw();

        // Рисуем мяч
        this.ball.draw();

        // Устанавливаем обработчики событий
        this.setEventHandlers();
    },

    /**
     * Ставит обработчики события.
     */
    setEventHandlers() {
        // При нажатии кнопки, если статус игры "играем", то вызываем функцию смены направления у змейки.
        document.addEventListener('keydown', event => this.keyDownHandler(event));
        // При нажатии кнопки стоп поставить игру на паузу
        document.querySelector('#playButton').addEventListener('click', () => this.playClickHandler());
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
    },

    /**
     * Обработчик события нажатия на кнопку playButton.
     */
    playClickHandler() {
        // Если сейчас статус игры "играем", то игру останавливаем, если игра остановлена, то запускаем.
        if (this.condition.isPlaying()) {
            this.stop();
        } else if (this.condition.isStopped()) {
            this.play();
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
        // while(true) {
        //     let confirmation = +prompt('Введите 1 для начала игры');
        //
        //     if (confirmation === 1) {
        //         return true;
        //     }
        // }
    },

    /**
     * Увеличивает текущее время игры на 1
     */
    timerTick() {
        game.time += 1;

        if (game.time >= settings.maxTime) {
            // Создаём запись об окончании игры
            game.pushEvent('timeIsOut');
            game.finish();
        }
    },

    /**
     * Основная функция, отвечающая за 1 тик игры, где происходит передвижение элементов, проверка на их столкновение
     * и отрисовка
     */
    gameTick() {
        // Передвигаем мяч
        ball.move();

        // Проверяем столкновение
        ball.collision();

        game.checkCells();

        // Выводим время
        game.drawTime(game.time);

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
     * Отрисовывает время
     */
    drawTime() {
        document.querySelector('#timer').innerHTML = this.time;
    },

    /**
     * Проверяет выиграли ли мы по сбитым ячейкам
     */
    checkCells() {
      if (grid.nodes.length === 0 || grid.nodes.length === this.cellsCount - settings.maxCount) {
          game.finish();
      }
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
        this.setMaxTime(600);

        // Устанавливаем счёт для победы
        this.setMaxCount(1000);

        // Устанавливаем количество строк
        this.setRows(5);

        // Устанавливаем количество столбов
        this.setCols(5);

        // Устанавливаем количество жизней
        this.setHp(600);

        // Устанавливаем ширину каретки (% от общей ширины)
        this.setPlayerWidth(20);

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
        this.player.width = w * 0.01 * width;
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
    },

    /**
     * Обновляет жизни игрока
     */
    updHp() {
        // Уменьшаем количество жизней на 1
        this.hp -= 1;
        // Отрисовываем новое количество жизней
        document.querySelector('#hp').innerHTML = this.hp;

        // Если жизней не осталось
        if (!this.hp) {
            // Завершаем игру
            this.finish();
        }
    },

    /**
     * Ставим статус игры в "играем".
     */
    play() {
        // Ставим статус в 'playing'.
        this.condition.setPlaying();
        this.timerTickId = setInterval(this.timerTick, 1000);
        this.gameTickId = setInterval(this.gameTick, 1000 / (this.ball.speed * 60));
    },

    /**
     * Ставим статус игры в "стоп".
     */
    stop() {
        // Ставим статус в 'stopped'.
        this.condition.setStopped();
        clearInterval(this.timerTickId);
        clearInterval(this.gameTickId);
    },

    /**
     * Ставим статус игры в "финиш".
     */
    finish() {
        // Ставим статус в 'finished'.
        this.condition.setFinished();
        // Отключаем отрисовку игры
        clearInterval(this.timerTickId);
        // Отключаем таймер
        clearInterval(this.gameTickId);

        // Создаём запись об окончании игры
        this.pushEvent('gameOver');
    },

    /**
     * Создаёт запись в журнале о событии
     * @param name
     */
    pushEvent(name) {
        let event = {name: name, time: this.time};

        this.eventHistory.push(event);
    },

    getResults() {
        let resultObj = {
            balls: this.hp,
            time: this.time,
            points: this.score,
            fullTime: this.settings.maxTime,
        };

        return resultObj;
    },

    getHistory() {
        return this.eventHistory;
    }
};