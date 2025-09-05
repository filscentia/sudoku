import { Model } from '../model';

import TerminalKit from 'terminal-kit';
import { ModelEvent } from '../model/event';

export default class List {
    term: any;
    currentSize: number;
    listX: number;
    listY: number;
    model: any;
    constructor(term: TerminalKit.Terminal, model: Model) {
        this.term = term;
        this.listX = 90;
        this.listY = 4;
        this.currentSize = 0;
        this.model = model;
        this.model.onUpdate(() => {
            this.draw();
        });
    }

    draw() {
        this.term.saveCursor();
        this.term.moveTo(this.listX, this.listY - 2);
        this.term.white('Events');

        let i = this.listY;
        const evts = this.model.eventQueue('COLLAPSE');
        if (evts) {
            evts.forEach((element: ModelEvent) => {
                this.term.moveTo(this.listX, i);
                this.term.white(element.toString());
                i++;
            });
        }

        for (let x = i; x < this.currentSize + this.listY; x++) {
            this.term.moveTo(this.listX, x);
            this.term.white('                           ');
        }

        this.currentSize = evts ? evts.length : 0;
        this.term.restoreCursor();
    }
}

module.exports = List;
