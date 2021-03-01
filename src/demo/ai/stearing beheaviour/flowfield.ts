import { Graphics } from "pixi.js";
import Engine from '../../../wings/engine/Engine';
import Drone from "../../../wings/engine/world/entities/Drone";
import WorldObject from "../../../wings/engine/world/entities/WorldObject";
import { world } from "../../../wings/engine/world/World";
import FastMath from "../../../wings/framework/core/FastMath";
import Controller from "../../../wings/framework/inputs/Controller";
import Vector from "../../../wings/framework/physics/Vector";
import random from "../../../wings/framework/random/Random";

let width = 720;
let height = 480;
let engine: Engine;
let controller: Controller;

let cellSize = 20;
export default function startFlowField() {
	engine = new Engine({ width, height });
	controller = new Controller(engine.stage);

	random.randomizeSeed();

	let xMax = Math.ceil(width / cellSize);
	let yMax = Math.ceil(height / cellSize);
	world.createMap(cellSize, { x: xMax, y: yMax });


	let offsetX = 0;
	for (let x = 0; x < xMax; x++) {
		let offsetY = 0;
		for (let y = 0; y < yMax; y++) {
			let flow = Vector.fromPolar(random.noiseSmooth(offsetX, offsetY) * FastMath.angle360 * 2, 10);
			new Cell(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, flow);
			offsetY += 0.033;
		}
		offsetX += 0.033;
	}

	for (let i = 0; i < 100; i++) {
		new Vehicle(random.getUpTo(width), random.getUpTo(height));
	}

	engine.onUpdate = () => {
		controller;
	};

}

class Vehicle extends Drone {

	constructor(x: number, y: number) {
		super(new Graphics(), x, y);
		this.draw();
		this.speedLimit = 5;
	}
	protected draw() {
		let g = this.sprite as Graphics;
		g.lineStyle(2, 0x0);
		g.beginFill(0xe0e0e0);
		g.drawStar(0, 0, 3, 10);
		g.endFill();
		g.scale.y = 1.5;
	}
	think() {
		let cell = world.mapFilter(this.pos).byClass(Cell).filter()[0];
		this.applyDesire(cell.flowValue);
	}
	process() {
		this.pos.wrap(0, width, 0, height);
	}
}

class Cell extends WorldObject {
	flowValue: Vector;

	constructor(x: number, y: number, flow: Vector) {
		super(new Graphics(), x, y);
		this.flowValue = flow;
		this.draw();
		this.type = "FlowData";
	}
	protected draw() {
		let g = this.sprite as Graphics;
		g.lineStyle(2, 0xFFFFFF);
		g.moveTo(0, -cellSize / 2);
		g.lineTo(0, cellSize / 2);
		g.beginFill(0xFFFFFF);
		g.drawStar(0, -cellSize / 2, 3, cellSize / 12);
		g.endFill();
		g.scale.set(0.5);
		g.rotation = this.flowValue.angle + FastMath.angle90;
	}
}
