"use strict";

const condition = {
    status: 'stopped',

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
        this.status = 'stopped';
    },

    /**
     * Устанавливает статус в "finished".
     */
    setFinished() {
        this.status = 'finished';
    },

    isPlaying() {
        return this.status === 'playing';
    },

    /**
     * Проверяет является ли статус "stopped".
     * @returns {boolean} true, если статус "stopped", иначе false.
     */
    isStopped() {
        return this.status === 'stopped';
    },
}