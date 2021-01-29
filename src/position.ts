export default class Position {
    private _x: number;
    private _y: number;

    public static new({ x, y }: { x: number; y: number }): Position {
        if (x < 0 || y < 0) {
            throw new Error(`x=${x} y=${y}  No.`);
        }
        return new Position({ x, y });
    }

    private constructor({ x, y }: { x: number; y: number }) {
        this._x = x;
        this._y = y;
    }

    public set x(x: number) {
        this._x = x;
    }

    public get x(): number {
        return this._x;
    }

    public set y(y: number) {
        this._y = y;
    }

    public get y(): number {
        return this._y;
    }

    public toString(): string {
        return `{x:${this._x},y:${this._y}}`;
    }
}
