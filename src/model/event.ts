'use strict';

class Event {
    constructor(evt) {
        this.evt = evt;
    }

    toString() {
        return this.evt;
    }
}

module.exports = Event;
