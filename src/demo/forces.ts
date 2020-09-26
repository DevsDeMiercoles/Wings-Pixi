import { Graphics } from "pixi.js";
import Engine, { normalNotifications } from '../wings/engine/Engine';
import EntityPlatformer from '../wings/engine/world/entities/EntityPlatformer';
import EntityTopDown from '../wings/engine/world/entities/EntityTopDown';
import notifications from "../wings/framework/Events";
import { MouseEvents } from "../wings/framework/inputs/Mouse";
import Vector from "../wings/framework/physics/Vector";
import random from "../wings/framework/random/Random";
import SpriteMemory from "../wings/framework/SpriteMemory";

let width = 640;
let height = 320;
let engine: Engine;
let mouseDown = false;
export default function startForces() {
	engine = new Engine({ width, height });

	let w = new Walker(random.getUpTo(width), random.getUpTo(height));
	for (let i = 0; i < 10; i++) {
		new Walker2(random.normalDistribution() * width, random.normalDistribution() * height);
	}

	let gravity = new Vector(0, 0.1);
	let wind = new Vector(1, 0);
	engine.stage.interactive = true;
	engine.stage.on(MouseEvents.MOUSE_DOWN, () => { mouseDown = true; });
	engine.stage.on(MouseEvents.MOUSE_UP, () => { mouseDown = false; });

	engine.onUpdate = () => {
		w.applyForce(gravity);
		if (mouseDown)
			w.applyForce(wind);
	};
}

class Walker2 extends EntityTopDown {

	constructor(x = 0, y?: number) {
		super(new Graphics(), x, y);
		this.lookFoward = true;
		this.draw();
		this.speed.polar(random.angle(), 10);
	}
	private draw() {
		let g = this.sprite as Graphics;
		g.lineStyle(2, 0x0);
		g.beginFill(0xe0e0e0);
		g.drawStar(0, 0, 3, 10);
		g.endFill();
		g.scale.y = 1.5;
	}

	think() {
		this.applyForce(Vector.fromPolar(this.pos.angleWith({ x: width / 2, y: height / 2 }), this.speedLimit / (60)));
	}
	process() {
		// this.pos.wrap(0, width, 0, height);
	}
}
class Walker extends EntityPlatformer {
	private memory: SpriteMemory;

	constructor(x = 0, y?: number) {
		super(new Graphics(), x, y);
		this.movementSpeedLimit = 5;

		this.draw();
		this.speed.polar(random.angle(), 10);

		this.memory = new SpriteMemory(engine.renderer);
		notifications.dispatchNotification(normalNotifications.addToStage, this.memory);
	}
	private draw() {
		let g = this.sprite as Graphics;
		g.lineStyle(2, 0x0);
		g.beginFill(0xe0e0e0);
		g.drawCircle(0, 0, 15);
		g.endFill();
	}

	process() {
		this.memory.remember(this.sprite);

		this.reboundScreen(width, height);
	}

	protected reboundScreen(width: number, height: number) {
		this.rebound(0, width, 0, height);
	}
	protected rebound(minX: number, maxX: number, minY: number, maxY: number) {
		this.reboundX(minX, maxX);
		this.reboundY(minY, maxY);
	}
	protected reboundX(minX: number, maxX: number) {
		if (this.pos.x < minX || this.pos.x > maxX) {
			this.speed.reverseX();
			this.pos.x += this.speed.x;
		}
	}
	protected reboundY(minY: number, maxY: number) {
		if (this.pos.y < minY || this.pos.y > maxY) {
			this.speed.reverseY();
			this.pos.y += this.speed.y;
		}
	}

}