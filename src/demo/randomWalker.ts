import { Graphics } from "pixi.js";
import Engine from '../wings/engine/Engine';
import FastMath from '../wings/framework/core/FastMath';
import Position from '../wings/framework/physics/Position';
import Vector from '../wings/framework/physics/Vector';
import random from '../wings/framework/random/Random';

let width = 640;
let height = 320;
let engine: Engine;
export default function start() {
	engine = new Engine({ width, height });

	let w = new Walker(width / 2, height / 2);

	engine.onUpdate = function () {
		w.walk();
	};
}

class Walker {
	private graphic = new Graphics();
	private offsetX = 0;
	pos: Position;
	speed: Vector;

	constructor(x = 0, y?: number) {
		this.pos = new Position(x, y ?? x);
		this.speed = new Vector();

		this.draw();
	}
	private draw() {
		this.graphic.lineStyle(2, 0x0);
		this.graphic.beginFill(0xe0e0e0);
		this.graphic.drawStar(0, 0, 3, 10);
		this.graphic.endFill();
		this.graphic.scale.y = 1.5;
		engine.stage.addChild(this.graphic);
		this.graphic.transform.position = this.pos;
	}

	walk() {
		this.speed.polar(random.noiseSmooth(this.offsetX) * FastMath.angle360, 2);
		this.pos.move(this.speed);

		this.pos.wrap(0, width, 0, height);
		this.offsetX += 0.01;

		this.graphic.angle = this.speed.angle() * FastMath.toDegrees + 90;
	}
}