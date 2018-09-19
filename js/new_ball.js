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
        this.x += this.dx;
        // Обновляем координату по y путём умножения скорости на направление
        this.y += this.dy;
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
                    // Движение вправо вверх
                    this.collisionSetDirection(this.x + this.radius, enemy.x + 1, 'dx', i);

                    this.collisionSetDirection(this.y - this.radius, enemy.y + enemy.height - 1, 'dy', i);
                }

                if (this.dx === 1 && this.dy === 1) {
                    // Движение вправо вниз
                    this.collisionSetDirection(this.x + this.radius, enemy.x + 1, 'dx', i);

                    this.collisionSetDirection(this.y + this.radius, enemy.y + 1, 'dy', i);
                }

                if (this.dx === -1 && this.dy === -1) {
                    // Движение влево вверх
                    this.collisionSetDirection(this.x - this.radius, enemy.x + enemy.width - 1, 'dx', i);

                    this.collisionSetDirection(this.y - this.radius, enemy.y + enemy.height - 1, 'dy', i);
                }

                if (this.dx === -1 && this.dy === 1) {
                    // Движение влево вниз
                    this.collisionSetDirection(this.x - this.radius, enemy.x + enemy.width - 1, 'dx', i);

                    this.collisionSetDirection(this.y + this.radius, enemy.y + 1, 'dy', i);
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
            this.dx = 1;
            this.dy = -1;
            // Запускам мяч снова с положения середины каретки
            ball.init(player.x + Math.ceil(player.width / 2), player.y - 5, 5, 'blue');
        }
    },

    collisionSetDirection(coord1, coord2, dir, cell) {
        if (coord1 === coord2) {
            if (dir === 'dx') {
                this.dx *= -1;
            } else {
                this.dy *= -1;
            }
            grid.destroy(cell);

            game.updScore();
        }
    },
};