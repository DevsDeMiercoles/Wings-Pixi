import { Container } from 'pixi.js';
import { normalNotifications } from "../../../wings/engine/Engine";
import FastMath from '../../../wings/framework/core/FastMath';
import notifications from "../../../wings/framework/Events";
import Controller from '../../../wings/framework/inputs/Controller';
import Position from "../../../wings/framework/physics/Position";
import random from '../../../wings/framework/random/Random';
import Cell from './cell';
import Region from './region';

let gridSize = Cell.size * 9;
let startX = (640 - gridSize) / 2;
let startY = startX;

export default class Grid {
	private graphics: Container = new Container();

	private map = new Array<Array<Cell>>();
	private filledCells: Array<number> = [];
	private regions = new Array<Region>();
	private control: Controller;

	private lastPosition = new Position(0, 0);
	private lastRegion = 0;
	constructor() {
		this.createCells();
		this.createRegions();

		this.control = new Controller(this.graphics);
		notifications.dispatchNotification(normalNotifications.addToStage, this.graphics);
	}
	private createCells() {
		for (let x = 0; x < 9; x++) {
			this.map[x] = new Array<Cell>();
			for (let y = 0; y < 9; y++) {
				let cell = new Cell(x, y);
				this.map[x][y] = cell;
				cell.graphics.position.x += startX;
				cell.graphics.position.y += startY;
				this.graphics.addChild(cell.graphics);
			}
		}
	}
	private createRegions() {
		for (let x = 0; x < 3; x++) {
			for (let y = 0; y < 3; y++) {
				let region = new Region();
				//Mapping cells
				for (let row = 0; row < 3; row++) {
					for (let col = 0; col < 3; col++) {
						let cell = this.map[row + x * 3][col + y * 3];
						region.mapCell(cell, row + x * 3, col + y * 3);
					}
				}

				this.graphics.addChildAt(region.graphics, 0);
				region.graphics.x += startX + Cell.size * 3 * x;
				region.graphics.y += startY + Cell.size * 3 * y;

				this.regions.push(region);
			}
		}
	}

	createNewNumber() {
		if (this.filledCells.length < 81) {
			let r = getRandomNumberNotInArray(this.filledCells, 81);
			let pos = toXY(r);
			let posibleNumbers = [];
			let v = 0;
			do {
				if (posibleNumbers.length == 9) { //No posible value in cell
					//Roll back last position
					let pos = toXY(Number(this.filledCells.pop()));
					this.map[pos.x][pos.y].value = 0;
					v = 0;
					break;
				}
				v = getRandomNumberNotInArray(posibleNumbers, 10, 1);
				posibleNumbers.push(v);
			} while (!this.isValid(v, pos.x, pos.y));
			this.map[pos.x][pos.y].value = v;
			this.filledCells.push(r);
		}

	}
	showRegion() {
		let pos = mouseToCell(this.control.mousePos);

		let region = Math.floor(pos.x / 3) * 3 + Math.floor(pos.y / 3);
		if (!this.lastPosition.equals(pos)) {
			this.map[pos.x][pos.y].highlight = true;
			this.map[this.lastPosition.x][this.lastPosition.y].highlight = false;

			this.lastPosition = pos;
		}
		if (this.lastRegion != region) {
			this.regions[region].highlight = true;
			this.regions[this.lastRegion].highlight = false;

			this.lastRegion = region;
		}
	}
	private isValid(v: number, x: number, y: number): boolean {
		let region = this.getRegion(x, y);

		if (!region.isValid(v, x, y)) return false;
		for (let i = x; i >= 0; i--) {
			const element = this.map[i][y];
			if (element.value == v) return false;
		}
		for (let i = x; i < 9; i++) {
			const element = this.map[i][y];
			if (element.value == v) return false;
		}
		for (let i = y; i >= 0; i--) {
			const element = this.map[x][i];
			if (element.value == v) return false;
		}
		for (let i = y; i < 9; i++) {
			const element = this.map[x][i];
			if (element.value == v) return false;
		}

		return true;
	}

	private getRegion(x: number, y: number): Region {
		return this.regions[Math.floor(x / 3) * 3 + Math.floor(y / 3)];
	}

};
function getRandomNumberNotInArray(arr: Array<Number>, max: number, min: number = 0): number {
	let r;
	do {
		r = Math.floor(random.range(min, max));
	} while (arr.includes(r));

	return r;
}
function toXY(w: number): Position {
	let x = Math.floor(w / 9);
	let y = w - x * 9;
	return new Position(x, y);
}
function mouseToCell(mp: Position): Position {
	let x = Math.floor((mp.x - startX) / Cell.size);
	let y = Math.floor((mp.y - startY) / Cell.size);
	return new Position(FastMath.clamp(x, 0, 8), FastMath.clamp(y, 0, 8));
}
// function toW(x: number, y: number): number {
// 	return x * 9 + y;
// }
