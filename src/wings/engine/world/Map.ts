import FastMath from "../../framework/core/FastMath";
import { arrayRemove } from "../../framework/core/utils";
import Position from "../../framework/physics/Position";
import WorldObject from "./entities/WorldObject";


type Cell = Array<WorldObject>;

export default class Map {

	private data = new Array<Array<Cell>>();
	private cellDimension: number = 50;

	constructor(cellSize: number, cellsAmount: { x: number, y: number; }) {
		this.cellDimension = cellSize;
		for (let x = 0; x < cellsAmount.x; x++) {
			let column = new Array<Cell>();
			this.data[x] = column;
			for (let y = 0; y < cellsAmount.y; y++) {
				let cell = new Array<WorldObject>();
				column[y] = cell;
			}
		}
	}
	add(e: WorldObject) {
		let pos = this.translateWorldToMap(e.pos);
		this.data[pos.x][pos.y].push(e);
	}
	remove(e: WorldObject) {
		let pos = this.translateWorldToMap(e.pos);
		this.data[pos.x][pos.y] = arrayRemove(this.data[pos.x][pos.y], e);
	}
	update(e: WorldObject) {
		let oldPos = this.translateWorldToMap(e.previousPosition);
		let pos = this.translateWorldToMap(e.pos);
		if (!oldPos.equals(pos)) {
			this.data[oldPos.x][oldPos.y] = arrayRemove(this.data[oldPos.x][oldPos.y], e);
			this.data[pos.x][pos.y].push(e);
		}
		e.previousPosition.copyFrom(e.pos);
	}
	getCellAtPos(pos: Position): Array<WorldObject> {
		let origin = this.translateWorldToMap(pos);
		return [...this.data[origin.x][origin.y]];

	}
	getCellsInArea(pos: Position, width: number, height?: number): Array<WorldObject> {
		// width *= 1.1;
		height = height ?? width;
		let min = this.translateWorldToMap(pos.clone().moveBy(-width, -height));
		let max = this.translateWorldToMap(pos.clone().moveBy(width, height));

		if (min.equals(max))
			return this.data[min.x][min.y];

		let cells = new Array<WorldObject>();
		for (let x = min.x; x <= max.x; x++) {
			for (let y = min.y; y <= max.y; y++) {
				cells.push(...this.data[x][y]);
			}
		}

		return cells;
	}

	private translateWorldToMap(pos: Position): Position {
		let mapCoordinates = pos.clone();
		mapCoordinates.x = FastMath.clamp(Math.floor(mapCoordinates.x / this.cellDimension), 0, this.data.length - 1);
		mapCoordinates.y = FastMath.clamp(Math.floor(mapCoordinates.y / this.cellDimension), 0, this.data[0].length - 1);
		return mapCoordinates;
	}
}