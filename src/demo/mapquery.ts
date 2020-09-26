import { Graphics } from "pixi.js";
import Engine from '../wings/engine/Engine';
import WorldObject from "../wings/engine/world/entities/WorldObject";
import Map from "../wings/engine/world/Map";
import watcher from "../wings/framework/debug";
import Controller from "../wings/framework/inputs/Controller";

let width = 720;
let height = 480;
let engine: Engine;
let controller: Controller;

let map: Map;
let cellSize = 50;
export default function startMapQuery() {
	engine = new Engine({ width, height });

	controller = new Controller(engine.stage);
	let xMax = Math.ceil(width / cellSize);
	let yMax = Math.ceil(height / cellSize);
	map = new Map(cellSize, { x: xMax, y: yMax });
	let allCells = new Array<Cell>();


	for (let x = 0; x < xMax; x++) {
		for (let y = 0; y < yMax; y++) {
			let cell = new Cell(x * cellSize, y * cellSize);
			map.add(cell);
			allCells.push(cell);
		}
	}

	let selector = new Selector();
	watcher.watch(selector);

	engine.onUpdate = () => {
		for (const cell of allCells) {
			cell.changeColor(0xe6e6e6);
		}
		selector.pos.copyFrom(controller.mousePos);
		let selectedCells = map.getCellsInArea(selector.pos, selector.selectionSize) as Array<Cell>;
		for (const cell of selectedCells) {
			cell.changeColor(0x0df2c9);
		}
	};

}

class Cell extends WorldObject {
	constructor(x: number, y: number) {
		super(new Graphics(), x, y);
		this.draw();
	}
	protected draw() {
		let g = this.sprite as Graphics;
		g.lineStyle(2, 0x0);
		g.beginFill(0xFFFFFF);
		g.drawRect(0, 0, cellSize, cellSize);
		g.endFill();
	}
	changeColor(newColor: number) {
		let g = this.sprite as Graphics;
		g.tint = newColor;
	}
}

class Selector extends WorldObject {
	selectionSize = 20;
	constructor() {
		super(new Graphics());
		this.draw();
	}
	protected draw() {
		let g = this.sprite as Graphics;
		g.clear();
		g.alpha = 0.5;
		g.beginFill(0x4EC5F1);
		g.drawCircle(0, 0, this.selectionSize);
		g.endFill();
	}
	update() {
		this.draw();
		super.update();
	}
}
