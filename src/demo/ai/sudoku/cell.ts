import { Container, Graphics, Text } from 'pixi.js';


export default class Cell {
	public static size = 64;
	public graphics = new Container();

	private _value = 0;
	private text = new Text(" ");
	private offset = Cell.size / 4;
	private lineSize = 2;
	private background = new Graphics();

	constructor(x: number, y: number) {
		this.draw();
		this.text.position.set(this.offset * 1.5, this.offset);
		this.graphics.addChild(this.text);
		this.graphics.position.set(Cell.size * x, Cell.size * y);
	}
	private draw() {
		this.background.beginFill(0x0df2c9);
		this.background.drawRect(0, 0, Cell.size, Cell.size);
		this.background.endFill();
		this.background.alpha = 0;
		this.graphics.addChild(this.background);

		let g = new Graphics();

		g.lineStyle(this.lineSize, 0x000000);
		g.lineTo(0, Cell.size);
		g.lineTo(Cell.size, Cell.size);
		g.lineTo(Cell.size, 0);
		g.lineTo(0, 0);


		this.graphics.addChild(g);
	}

	public get value(): number {
		return this._value;
	}

	public set value(v: number) {
		this._value = v;
		this.text.text = v == 0 ? " " : v.toString();
	}

	public set highlight(v: boolean) {
		this.background.alpha = v ? 1 : 0;
	}
}

