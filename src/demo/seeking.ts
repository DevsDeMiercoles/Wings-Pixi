import { Graphics, Point } from "pixi.js";
import Engine from '../wings/engine/Engine';
import Drone from "../wings/engine/world/entities/Drone";
import WorldObject from "../wings/engine/world/entities/WorldObject";
import Controller from "../wings/framework/inputs/Controller";
import random from "../wings/framework/random/Random";

let width = 720;
let height = 480;
let engine: Engine;
let controller: Controller;
export default function startSeeking() {
	engine = new Engine({ width, height });

	let entities = new Array<Drone>();
	for (let i = 0; i < 10; i++) {
		entities.push(new Walker(random.normalDistribution() * width, random.normalDistribution() * height));
	}
	let attractor = new Atractor();

	controller = new Controller(engine.stage);
	engine.onUpdate = () => {
		attractor.pos.copyFrom(controller.mousePos);
	};
}

class Walker extends Drone {
	visionRange = 200;
	comfortZone = 100;

	constructor(x = 0, y?: number) {
		super(new Graphics(), x, y);
		this.draw();
		this.speed.polar(random.angle(), 2);

		this.mass = 1;
	}
	think() {
		let desire = this.getSeekingDesire(controller.mousePos, this.visionRange, this.comfortZone);
		this.applyDesire(desire);

	}
	process() {
		this.pos.wrap(0, width, 0, height);
	}
	protected draw() {
		let g = this.sprite as Graphics;
		g.lineStyle(2, 0x0);

		g.beginFill(0x49da3e, 0.2);
		g.drawCircle(0, 0, this.visionRange);

		g.beginFill(0xda4b3e, 0.2);
		g.drawCircle(0, 0, this.comfortZone);

		g.beginFill(0xe0e0e0);
		let side = 20;
		let scale = 1.5;
		let points = [new Point(0, -side / 2 * scale)];
		points.push(new Point(side / 2, side / 2 * scale));
		points.push(new Point(-side / 2, side / 2 * scale));
		g.drawPolygon(points);

		g.endFill();

	}
}
class Atractor extends WorldObject {

	constructor() {
		let g = new Graphics();
		g.clear();
		g.beginFill(0);
		g.drawCircle(0, 0, 10);

		super(g);
	}
}
