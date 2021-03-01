import { Container, Graphics } from 'pixi.js';
import Cell from "./cell";

export default class Region {
	public graphics = new Container();

	private map = new Array<Array<Cell>>();
	private lineSize = 6;
	private background = new Graphics();

	constructor() {
		for (let x = 0; x < 3; x++) {
			let row = new Array<Cell>();
			this.map.push(row);
			for (let y = 0; y < 3; y++) {
				row.push(new Cell(0, 0));
			}
		}
		this.draw();
	}
	private draw() {
		let regionSize = Cell.size * 3;

		this.background.beginFill(0x50c6f1);
		this.background.drawRect(0, 0, regionSize, regionSize);
		this.background.endFill();
		this.background.alpha = 0;
		this.graphics.addChild(this.background);
		let g = new Graphics();

		g.lineStyle(this.lineSize, 0x000000);
		g.lineTo(0, regionSize);
		g.lineTo(regionSize, regionSize);
		g.lineTo(regionSize, 0);
		g.lineTo(0, 0);


		this.graphics.addChild(g);
	}

	public mapCell(cell: Cell, x: number, y: number) {
		this.map[Math.floor(x % 3)][Math.floor(y % 3)] = cell;
	}
	public set highlight(v: boolean) {
		this.background.alpha = v ? 1 : 0;
	}
	public isValid(v: number, x: number, y: number): boolean {
		x -= Math.floor(x / 3);
		y -= Math.floor(y / 3);
		let numbers = [];
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				if (x != row || y != col) {
					numbers.push(this.map[row][col].value);
				}
			}
		}

		return !numbers.includes(v);
	}
}