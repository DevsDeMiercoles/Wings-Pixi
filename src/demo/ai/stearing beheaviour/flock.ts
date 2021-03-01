import { Graphics, Point } from "pixi.js";
import Engine from '../../../wings/engine/Engine';
import Drone from "../../../wings/engine/world/entities/Drone";
import { world } from "../../../wings/engine/world/World";
import watcher from "../../../wings/framework/debug";
import Controller from "../../../wings/framework/inputs/Controller";
import { MouseKeys } from "../../../wings/framework/inputs/Mouse";
import random from "../../../wings/framework/random/Random";

let width = 720;
let height = 480;
let engine: Engine;
let controller: Controller;

let cellSize = 50;
export default function startFlock() {
	engine = new Engine({ width, height });
	controller = new Controller(engine.stage);

	let xMax = Math.ceil(width / cellSize);
	let yMax = Math.ceil(height / cellSize);
	world.createMap(cellSize, { x: xMax, y: yMax });

	for (let i = 0; i < 50; i++) {
		new Vehicle(random.getUpTo(width), random.getUpTo(height));
	}

	watcher.watch(desiresStrenght);

	engine.onUpdate = () => {
		if (controller.isKeyDown(MouseKeys.LEFT))
			new Vehicle(controller.mousePos.x, controller.mousePos.y);
	};
}

class Vehicle extends Drone {
	private comfortZone = 20;
	private visionRange = 200;

	constructor(x: number, y: number) {
		super(new Graphics(), x, y);
		this.draw();
		this.speedLimit = 5;
		this.speed.polar(random.angle(), this.speedLimit);
	}
	protected draw() {
		let g = this.sprite as Graphics;
		g.lineStyle(2, 0x0);

		// g.beginFill(0x49da3e, 0.2);
		// g.drawCircle(0, 0, this.visionRange / 2);

		// g.beginFill(0xda4b3e, 0.2);
		// g.drawCircle(0, 0, this.comfortZone / 2);

		g.beginFill(0xe0e0e0);
		let side = 20;
		let scale = 1.5;
		let points = [new Point(0, -side / 2 * scale)];
		points.push(new Point(side / 2, side / 2 * scale));
		points.push(new Point(-side / 2, side / 2 * scale));
		g.drawPolygon(points);

		g.endFill();
	}
	think() {
		let desire = this.getSeparationDesire(world.filter.insideOfRange(this.pos, this.comfortZone).omit(this).filter());
		this.applyDesire(desire, desiresStrenght.separation);


		desire = this.getHerdMentalityDesire(world.filter.insideOfRange(this.pos, this.visionRange).omit(this).byClass(Vehicle).filter());
		this.applyDesire(desire, desiresStrenght.alignment);

		desire = this.getMediocrizationDesire(world.filter.insideOfRange(this.pos, this.visionRange).omit(this).filter());
		this.applyDesire(desire, desiresStrenght.cohesion);
	}
	process() {
		this.pos.wrap(-20, width + 20, 0, height);
	}
}

var desiresStrenght = {
	separation: 1,
	alignment: 2,
	cohesion: 1
};