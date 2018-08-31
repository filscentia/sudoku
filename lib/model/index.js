'use strict';

const Cell = require('./cell');

/**
 * Model factory
 */
class Factory {
    /**
     * Create cell
     *
     * @return {Cell} a new cell
     */
    static createCell() {
        return new Cell();
    }
}

module.exports = Factory;
