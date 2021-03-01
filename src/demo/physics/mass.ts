import { Circle, Graphics } from "pixi.js";
import Engine, { normalNotifications } from '../../wings/engine/Engine';
import EntityPlatformer from '../../wings/engine/world/entities/EntityPlatformer';
import FastMath from "../../wings/framework/core/FastMath";
import watcher from '../../wings/framework/debug';
import notifications from "../../wings/framework/Events";
import Controller from '../../wings/framework/inputs/Controller';
import { MouseKeys } from '../../wings/framework/inputs/Mouse';
import Vector from "../../wings/framework/physics/Vector";
import random from "../../wings/framework/random/Random";
import SpriteMemory from "../../wings/framework/SpriteMemory";

let width = 640;
let height = 320;
let engine: Engine;
let controller: Controller;
export default function startForces() {
	engine = new Engine({ width, height });
	controller = new Controller(engine.stage);


	let ws = new Array<BasicWalker>();
	ws.push(new Walker(random.range(36, width - 36), 60, 25));
	for (let i = 0; i < 1; i++) {
		// let mass = FastMath.map(random.normalDistribution(), 0, 1, 1, 100);
		let w = new BasicWalker(random.normalDistribution() * width, 60, 100);
		ws.push(w);
	}

	let gravity = new Vector(0, 10);
	let wind = new Vector(20, 0);

	engine.onUpdate = () => {
		for (const w of ws) {
			w.applyGravity(gravity);
			if (controller.isKeyDown(MouseKeys.LEFT))
				w.applyForce(wind);
		}
	};
}

type direction = -1 | 1;

class BasicWalker extends EntityPlatformer {
	protected body = new Circle();

	constructor(x: number, y: number, mass: number) {
		super(new Graphics(), x, y);
		this.mass = mass;
		this.body.radius = Math.sqrt(this.mass / FastMath.PI) * 10;

		this.draw();
		// this.speed.polar(random.angle(), 10);
	}
	protected draw() {
		let g = this.sprite as Graphics;
		g.lineStyle(2, 0x0);
		g.beginFill(0xe0e0e0);
		g.drawCircle(0, 0, this.body.radius);
		g.endFill();
	}

	process() {
		// this.pos.wrap(0, width, 0, height);
		this.reboundScreen(width, height);
	}

	protected reboundScreen(width: number, height: number) {
		this.rebound(0, width, 0, height);
	}
	protected rebound(minX: number, maxX: number, minY: number, maxY: number) {
		this.reboundXOn(minX, -1);
		this.reboundXOn(maxX, 1);

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
class Walker extends BasicWalker {
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