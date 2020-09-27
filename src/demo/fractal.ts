import { Graphics, RenderTexture, Sprite } from "pixi.js";
import Engine from '../wings/engine/Engine';
import WorldObjectDynamic from "../wings/engine/world/entities/WorldObjectDynamic";
import FastMath from "../wings/framework/core/FastMath";
import watcher from "../wings/framework/debug";
import Controller from "../wings/framework/inputs/Controller";
import Position from "../wings/framework/physics/Position";
import Vector from "../wings/framework/physics/Vector";
import random from "../wings/framework/random/Random";

let width = 720;
let height = 480;
let engine: Engine;
let controller: Controller;

export default function startFractal() {
	engine = new Engine({ width, height });
	controller = new Controller(engine.stage);


	let tree = new Tree();
	watcher.watch(tree);

	let lastPos = new Position();
	engine.onUpdate = () => {
		if (!lastPos.equals(controller.mousePos)) {
			tree.angle = FastMath.map(controller.mousePos.x, 0, width, 0, FastMath.angle90);
			tree.variation = FastMath.map(controller.mousePos.y, 0, height, 0, 100);
			tree.draw();
			lastPos.copyFrom(controller.mousePos);
		}
	};
}

class Tree extends WorldObjectDynamic {
	private generations = 10;
	private distance = 150;
	variation = 5;
	angle: number = FastMath.angle45;
	g = new Graphics();
	rt: RenderTexture;

	constructor() {
		super(new Sprite(), width / 2, height);
		this.rt = RenderTexture.create({ width: engine.renderer.view.width, height: engine.renderer.view.height, resolution: 2 });
		let s = (this.sprite as Sprite);
		s.texture = this.rt;
		s.addChild(this.g);
		this.draw();
	}
	draw() {
		this.g.clear();
		this.drawBranch(0, new Position(), new Vector(0, - this.distance));
	}
	private drawBranch(gen: number, start: Position, end: Vector) {
		let g = this.g;
		g.lineStyle(10 - gen, 0xe0e0e0);

		g.moveTo(start.x, start.y);
		g.lineTo(start.x + end.x, start.y + end.y);

		gen++;
		if (gen < this.generations) {
			let newStartingPoint = start.clone().move(end);
			end.multiply(2 / 3);
			let angleFactor = FastMath.map(this.variation, 0, 100, 0, this.angle);
			let r = FastMath.map(random.normalDistribution(), 0, 1, this.angle - angleFactor, this.angle + angleFactor);
			let v2 = end.clone().rotateBy(r);
			let r2 = FastMath.map(random.normalDistribution(), 0, 1, this.angle - angleFactor, this.angle + angleFactor);
			let v3 = end.clone().rotateBy(-r2);
			this.drawBranch(gen, newStartingPoint, v2);
			this.drawBranch(gen, newStartingPoint, v3);
		}
	}
	process() {
		// this.draw();
	}
}