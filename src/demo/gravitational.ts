import { Graphics } from "pixi.js";
import Engine, { normalNotifications } from '../wings/engine/Engine';
import Entity from '../wings/engine/world/Entity';
import EntityTopDown from '../wings/engine/world/EntityTopDown';
import WorldObject from '../wings/engine/world/WorldObject';
import FastMath from '../wings/framework/core/FastMath';
import watcher from '../wings/framework/debug';
import notifications from "../wings/framework/Events";
import random from "../wings/framework/random/Random";
import SpriteMemory from "../wings/framework/SpriteMemory";

let width = 720;
let height = 480;
let engine: Engine;
export default function startGravitational() {
	engine = new Engine({ width, height });

	let entities = new Array<Entity>();
	entities.push(new Walker2(random.getUpTo(width), random.getUpTo(height)));
	for (let i = 0; i < 10; i++) {
		entities.push(new Walker(random.normalDistribution() * width, random.normalDistribution() * height));
	}

	let atractor = new Atractor(width / 2, height / 2, 50);
	let G = 1;
	watcher.watch(atractor);

	engine.onUpdate = () => {
		for (const e of entities) {
			let force = e.pos.vectorTo(atractor.pos);
			let distance = FastMath.clamp(force.magnitudeSq(), 5 ** 2, 30 ** 2);
			let strength = (atractor.power * e.mass * G) / distance;

			force.normalize(strength);

			e.applyForce(force);
		}
	};
}

class Walker extends EntityTopDown {

	constructor(x = 0, y?: number) {
		super(new Graphics(), x, y);
		this.draw();
		this.speed.polar(random.angle(), 2);

		this.mass = 10;
	}
	protected draw() {
		let g = this.sprite as Graphics;
		g.lineStyle(2, 0x0);
		g.beginFill(0xe0e0e0);
		g.drawStar(0, 0, 3, 10);
		g.endFill();
		g.scale.y = 1.5;
	}
}
class Walker2 extends Walker {
	private memory: SpriteMemory;

	constructor(x = 0, y?: number) {
		super(x, y);

		this.memory = new SpriteMemory(engine.renderer);
		notifications.dispatchNotification(normalNotifications.addToStage, this.memory);
	}

	process() {
		this.memory.shortTermMemory(this.sprite, 0.90);
	}
}

class Atractor extends WorldObject {
	power: number;

	constructor(x: number, y: number, force: number) {
		super(new Graphics(), x, y);
		this.power = force;

		this.draw();
	}
	draw() {
		let g = this.sprite as Graphics;
		g.clear();
		g.beginFill(0);
		g.drawCircle(0, 0, Math.sqrt(this.power));
	}

	update() {
		this.draw();
		super.update();
	}

}
