import { Graphics, Point } from "pixi.js";
import Engine, { normalNotifications } from '../wings/engine/Engine';
import Drone from "../wings/engine/world/entities/Drone";
import { world } from "../wings/engine/world/World";
import FastMath from "../wings/framework/core/FastMath";
import notifications from "../wings/framework/Events";
import Controller from "../wings/framework/inputs/Controller";
import { MouseKeys } from "../wings/framework/inputs/Mouse";
import Position from "../wings/framework/physics/Position";
import random from "../wings/framework/random/Random";

let width = 720;
let height = 480;
let engine: Engine;
let controller: Controller;
let path: Path;

let cellSize = 20;
export default function startPathFollow() {
	engine = new Engine({ width, height });
	controller = new Controller(engine.stage);


	let xMax = Math.ceil(width / cellSize);
	let yMax = Math.ceil(height / cellSize);
	world.createMap(cellSize, { x: xMax, y: yMax });

	let points = new Array<Position>();
	points.push(new Position(0, 250));
	points.push(new Position(100, random.getUpTo(height)));
	points.push(new Position(150, 300));
	points.push(new Position(200, 200));
	points.push(new Position(170, random.getUpTo(height)));
	points.push(new Position(400, random.getUpTo(height)));
	points.push(new Position(random.getUpTo(width), 200));
	points.push(new Position(random.getUpTo(width), random.getUpTo(height)));
	points.push(new Position(width, 250));
	points.push(new Position(width + 20, 250));

	path = new Path(points, 30);

	for (let i = 0; i < 75; i++) {
		new Vehicle(random.getUpTo(width), random.getUpTo(height));
	}

	engine.onUpdate = () => {
		if (controller.isKeyDown(MouseKeys.LEFT))
			new Vehicle(controller.mousePos.x, controller.mousePos.y);
	};
}

class Vehicle extends Drone {
	private comfortZone = 30;
	private currentPoint = -1;
	constructor(x: number, y: number) {
		super(new Graphics(), x, y);
		this.draw();
		this.speedLimit = 5;
	}
	protected draw() {
		let g = this.sprite as Graphics;
		g.lineStyle(2, 0x0);

		g.beginFill(0xda4b3e, 0.2);
		g.drawCircle(0, 0, this.comfortZone / 2);

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
		if (this.currentPoint == -1)
			this.seekCloserPoint();
		let desire = this.getSeekingDesire(path.points[this.currentPoint]);
		this.applyDesire(desire, 1);
		desire = this.getSeparationDesire(this.comfortZone);
		this.applyDesire(desire, 1);
	}
	seekCloserPoint() {
		let minPoint = -1;
		let minDistance = Number.MAX_VALUE;
		for (let i = 0; i < path.points.length; i++) {
			const p = path.points[i];
			if (this.pos.distanceSqTo(p) < minDistance) {
				minDistance = this.pos.distanceSqTo(p);
				minPoint = i;
			}
		}
		this.currentPoint = minPoint;
	}
	process() {
		if (this.pos.distanceSqTo(path.points[this.currentPoint]) < path.radius ** 2) {
			this.currentPoint = FastMath.wrap(this.currentPoint + 1, 0, path.points.length);
			if (this.currentPoint == 0)
				this.pos.x = 0;
		}
		// this.pos.wrap(-20, width + 20, 0, height);
	}
}


class Path {
	points: Array<Position>;
	radius: number;

	private g = new Graphics();
	constructor(points: Position[], width: number) {
		this.radius = width;
		this.points = points;
		this.draw();
		notifications.dispatchNotification(normalNotifications.addToStage, this.g);
	}
	private draw() {
		let start: Position;
		if (this.points.length) {
			start = this.points[0];
			this.g.moveTo(start.x, start.y);
		}

		this.g.beginFill(0xe6e6e6);
		for (const pos of this.points) {
			this.g.lineStyle(2, 0x0);
			this.g.lineTo(pos.x, pos.y);
			this.g.drawCircle(pos.x, pos.y, this.radius);
		}
		this.g.endFill();
	}
}
