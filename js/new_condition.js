"use strict";

const condition = {
    status: 'stoped',

    /**
     * Устанавливает статус ыв "playing"
     * @param status Статус игры
     */
    setPlaying() {
        this.status = 'playing';
    },

    /**
     * Устанавливает статус в "stopped".
     */
    setStopped() {
        this.condition = 'stopped';
    },

    /**
     * Устанавливает статус в "finished".
     */
    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    /**
     * Проверяет является ли статус "stopped".
     * @returns {boolean} true, если статус "stopped", иначе false.
     */
    isStopped() {
        return this.condition === 'stopped';
    },
}