"use strict";

/**
 * Объект мяча
 * @property speedY скорость по вертикали
 * @property speedX скорость по горизонтали
 * dx Направление движения по x
 * dy Направление движения по y
 * color Цвет
 * x Координата по x
 * y Координата по y
 * radius Радиус мяча
 */
let ball = {
    settings,
    speed: null,
    dx: 1,
    dy: -1,
    color: 'blue',
    x: 0,
    y: 0,
    radius: 5,

    setBallSpeed(ballSpeed) {
        this.speedX = ballSpeed;
        this.speedY = ballSpeed;
    },

    /**
     * Устанавливает параметры мяча в начальные значения
     */
    clear() {
        this.speedX = 1;
        this.speedY = 1;
        // По умолчанию мяч движется впрваво
        this.dx = 1;
        // По умолчанию мяч движется вверх
        this.dy = -1;
    },

    /**
     * Отрисовывает мяч
     */
    draw() {
        drawCircle(this.x, this.y, this.radius, this.color)
    },

    /**
     * Обновляет парметры мяча в зависимости от переданных значений
     * @param x Координата по x
     * @param y Координата по y
     * @param radius Радиус
     * @param color Цвет
     */
    init(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    },

    /**
     * Передвигает мяч путём обновления его координат
     */
    move() {
        // Обновляем координату по x путём умножения скорости на направление
        this.x += this.speedX * this.dx;
        // Обновляем координату по y путём умножения скорости на направление
        this.y += this.speedY * this.dy;
    },

    /**
     * Обрабатывает столкновение с краем карты, кареткой и ячейками
     */
    collision() {
        // Проходимся по массиву ячеек
        for (let i in grid.nodes) {
            // Записываем в локальную переменную текущий элемент массива
            let enemy = grid.nodes[i];

            // Прверяем было ли столкновение с ячейкой
            if (isCollision(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2,
                enemy.x, enemy.y, enemy.width, enemy.height)) {
                if (this.dx === 1 && this.dy === -1) {
                    // Проходимся по всем точкам где был шарик до столкновения
                    for (let j = 0; j < this.speedX + 1; j++) {
                        // Создаём локальные предыдущие координаты
                        let prevX = this.x + this.radius - j;
                        let prevY = this.y - this.radius + j;

                        // Если столкнулись с левой границей
                        if (prevX === enemy.x) {
                            // Меняем направление по x
                            this.dx *= -1;
                            // Убираем ячейку с которой столкнулись
                            grid.destroy(i);
                            // Создаём запись об уничтожении ячейки
                            let event = {name: 'block_destroyed', time: player.time};
                            // Записываем в массив событий
                            settings.eventHistory.push(event);
                            // Увеличиваем счёт пользователя
                            player.updScore(1);
                            // Выходим из цикла
                            return;
                        }

                        // Если толкнулись с нижней границей
                        if (prevY === enemy.y + enemy.height) {
                            // Меняем направление по y
                            this.dy *= -1;
                            // Убираем ячейку с которой столкнулись
                            grid.destroy(i);
                            // Создаём запись об уничтожении ячейки
                            let event = {name: 'block_destroyed', time: player.time};
                            // Записываем в массив событий
                            settings.eventHistory.push(event);
                            // Увеличиваем счёт пользователя
                            player.updScore(1);
                            // Выходим из цикла
                            return;
                        }
                    }
                    // Столкновение либо с нижней границей, либо с левой
                }

                if (this.dx === 1 && this.dx === 1) {
                    // Проходимся по всем точкам где был шарик до столкновения
                    for (let j = 0; j < this.speedX + 1; j++) {
                        // Создаём локальные предыдущие координаты
                        let prevX = this.x + this.radius - j;
                        let prevY = this.y + this.radius - j;

                        // Если столкнулись с левой границей
                        if (prevX === enemy.x) {

                            this.dx *= -1;

                            grid.destroy(i);
                            // Создаём запись об уничтожении ячейки
                            let event = {name: 'block_destroyed', time: player.time};
                            // Записываем в массив событий
                            settings.eventHistory.push(event);

                            player.updScore(1);

                            return;
                        }

                        if (prevY === enemy.y) {
                            // Столкнулись с нижней границей
                            this.dy *= -1;

                            grid.destroy(i);
                            // Создаём запись об уничтожении ячейки
                            let event = {name: 'block_destroyed', time: player.time};
                            // Записываем в массив событий
                            settings.eventHistory.push(event);

                            player.updScore(1);

                            return;
                        }
                    }
                    // Столкновение либо с верхней границей, либо с левой
                }

                if (this.dx === -1 && this.dy === -1) {
                    // Проходимся по всем точкам где был шарик до столкновения
                    for (let j = 0; j < this.speedX + 1; j++) {
                        let prevX = this.x - this.radius + j;
                        let prevY = this.y - this.radius + j;

                        if (prevX === enemy.x + enemy.width) {
                            // Столкнулись с левой границей
                            this.dx *= -1;

                            grid.destroy(i);
                            // Создаём запись об уничтожении ячейки
                            let event = {name: 'block_destroyed', time: player.time};
                            // Записываем в массив событий
                            settings.eventHistory.push(event);

                            player.updScore(1);

                            return;
                        }

                        if (prevY === enemy.y + enemy.height) {
                            // Столкнулись с нижней границей
                            this.dy *= -1;

                            grid.destroy(i);

                            player.updScore(1);

                            return;
                        }
                    }
                    // Столкновение либо с нижней границей, либо с правой гранцей
                }

                if (this.dx === -1 && this.dy === 1) {
                    // Проходимся по всем точкам где был шарик до столкновения
                    for (let j = 0; j < this.speedX + 1; j++) {
                        let prevX = this.x - this.radius + j;
                        let prevY = this.y + this.radius - j;

                        if (prevY === enemy.y) {
                            // Столкнулись с нижней границей
                            this.dy *= -1;

                            grid.destroy(i);

                            player.updScore(1);

                            return;
                        }

                        if (prevX === enemy.x + enemy.width) {
                            // Столкнулись с левой границей
                            this.dx *= -1;

                            grid.destroy(i);

                            player.updScore(1);

                            return;
                        }


                    }
                    // Столкновение либо с верхней границей, либо с правой гранцей
                }
            }
        }

        // Проверяем столкновение с картекой
        if (isCollision(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2,
            player.x, player.y, player.width, player.height)) {
            this.dy *= -1;
        }

        // Если мяч столкнулся с вертикальными краями карты
        if (this.x + this.radius >= width || this.x - this.radius <= 0) {
            // Меняем направление его движения по x на противоположное
            this.dx *= -1;
        }

        // Если мяч столкнулся с верхней границей карты
        if (this.y - this.radius <= 0) {
            // Меняем направление его движения по y на положительное
            this.dy = 1;
        }

        // Если мяч столкнулся с нижней границей карты
        if (this.y + this.radius >= height) {
            // Уменьшаем количество жизней
            player.updHp(1);
            // Создаём запись о потере мяча
            let event = {name: 'ball_lost', time: player.time};
            // Записываем в массив событий
            settings.eventHistory.push(event);

            this.dx = 1;
            // Запускам мяч снова с положения середины каретки
            ball.init(player.x + Math.ceil(player.width / 2), player.y - 5, 5, 'blue');

            // Если жизней не осталось
            if (player.hp < 0) {
                alert('Вы потратили все жизни');

                // Создаём запись о проигрыше
                let event = {name: 'game_is_over', time: player.time};
                // Записываем в массив событий
                settings.eventHistory.push(event);

                setResults();

                window.location.reload();
            }
        }
    },
};