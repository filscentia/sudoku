import { Model } from '../model';

import TerminalKit from 'terminal-kit';

export default class List {
    term: any;
    listX: number;
    listY: number;
    model: any;
    constructor(term: TerminalKit.Terminal, model: Model) {
        this.term = term;
        this.listX = 90;
        this.listY = 4;

        this.model = model;
        this.model.onEvent(() => {
            this.draw();
        });
    }

    draw() {
        this.term.saveCursor();
        this.term.moveTo(this.listX, this.listY - 2);
        this.term.white('Events');

        // let i = this.listY;
        // const evts = this.model.getEventQueue();
        // evts.forEach((element) => {
        //     this.term.moveTo(this.listX, i);
        //     this.term.white(element.toString());

        //     i++;
        // });

        this.term.restoreCursor();
    }
}

module.exports = List;
