import { Circle, Graphics } from "pixi.js";
import Engine, { normalNotifications } from '../wings/engine/Engine';
import EntityPlatformer from '../wings/engine/world/entities/EntityPlatformer';
import FastMath from "../wings/framework/core/FastMath";
import watcher from '../wings/framework/debug';
import notifications from "../wings/framework/Events";
import Controller from '../wings/framework/inputs/Controller';
import { MouseKeys } from '../wings/framework/inputs/Mouse';
import Vector from "../wings/framework/physics/Vector";
import random from "../wings/framework/random/Random";
import SpriteMemory from "../wings/framework/SpriteMemory";

let width = 640;
let height = 320;
let engine: Engine;
let controller: Controller;
export default function startFriction() {
	engine = new Engine({ width, height });
	controller = new Controller(engine.stage);

	let ws = new Array<BasicWalker>();
	// ws.push(new Walker(random.range(36, width - 36), 60, 25));
	for (let i = 0; i < 1; i++) {
		let w = new BasicWalker(random.normalDistribution() * width, random.normalDistribution() * height, 100);
		ws.push(w);
	}

	let friction = 0.01;
	watcher.watch({
		get friction() { return friction; },
		set friction(x) { friction = x; },
	});

	engine.onUpdate = () => {
		if (controller.isKeyDown(MouseKeys.LEFT))
			ws.push(new BasicWalker(random.normalDistribution() * width, random.normalDistribution() * height, random.range(5, 50)));
		for (const w of ws) {
			if (controller.isKeyDown(MouseKeys.RIGHT)) {
				w.pos.set(width / 2, height / 2);
				w.applyForce(Vector.fromPolar(random.angle(), 20));
			}

			w.applyFriction(friction);
			w.applyFriction(friction);
		}
	};
}

type direction = -1 | 1;

class BasicWalker extends EntityPlatformer {
	body = new Circle();

	constructor(x: number, y: number, mass: number) {
		super(new Graphics(), x, y);
		this.mass = mass;
		this.body.radius = Math.sqrt(this.mass / FastMath.PI) * 10;

		this.draw();
		this.speed.polar(random.angle(), random.range(10, 50));
	}
	protected draw() {
		let g = this.sprite as Graphics;
		g.lineStyle(2, 0x0);
		g.beginFill(0xe0e0e0, 0.5);
		g.drawCircle(0, 0, this.body.radius);
		g.endFill();
	}
	applyFriction(u: number) {
		this.applyForce(this.speed.clone().reverse().normalize(u * this.mass));
	}
	applyDrag(density: number) {
		this.applyForce(this.speed.clone().reverse().normalize(this.speed.magnitudeSq * density).limitMagnitude(this.speed.magnitude * 5));
	}

	process() {
		this.reboundScreen(width, height);
	}
	stopAtBottom(height: number) {
		let penetration = this.pos.y - height + this.body.radius;
		if (penetration > 0) {
			this.speed.y = 0;
			this.pos.y -= penetration;
		}
	}

	protected reboundScreen(width: number, height: number) {
		this.rebound(0, width, 0, height);
	}
	protected reboundX(minX: number, maxX: number) {
		this.reboundXOn(minX, -1);
		this.reboundXOn(maxX, 1);
	}
	protected rebound(minX: number, maxX: number, minY: number, maxY: number) {
		this.reboundX(minX, maxX);

		this.reboundYOn(minY, -1);
		this.reboundYOn(maxY, 1);
	}
	protected reboundXOn(value: number, direction: direction) {
		let penetration = this.pos.x - value + this.body.radius * direction;
		if (FastMath.sign(penetration) == direction) {
			this.speed.reverseX();
			this.pos.x += this.speed.x - penetration;
		}
	}
	protected reboundYOn(value: number, direction: direction) {
		let penetration = this.pos.y - value + this.body.radius * direction;
		if (FastMath.sign(penetration) == direction) {
			this.speed.reverseY();
			this.pos.y += this.speed.y - penetration;
		}
	}
}
export class Walker extends BasicWalker {
	private memory: SpriteMemory;

	constructor(x: number, y: number, mass: number) {
		super(x, y, mass);
		watcher.watch(this);
		this.memory = new SpriteMemory(engine.renderer);
		notifications.dispatchNotification(normalNotifications.addToStage, this.memory);
	}

	process() {
		super.process();
		this.memory.remember(this.sprite);
	}

}