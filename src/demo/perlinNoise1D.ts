import { Graphics } from "pixi.js";
import Engine from "../wings/engine/Engine";
import FastMath from "../wings/framework/core/FastMath";
import random from "../wings/framework/random/Random";

let width = 720;
let height = 480;

export default async function start() {
	let engine = new Engine({ width, height, backgroundColor: 0x828282 });
	console.log("Corriendo Demo de Perlin Noise 1D");

	let g = new Graphics;
	engine.stage.addChild(g);

	engine.onUpdate = tick;
	random.randomizeSeed();
	let timeOff = 0;

	function tick() {
		update();

		g.clear();
		// g.beginFill(0xFFFFFF);
		g.lineStyle(2, 0xFFFFFF);
		draw();
		g.endFill();
	}

	function update() {
	}
	function draw() {
		let xOff = timeOff;
		for (let x = 0; x <= width; x+=0.5) {
			let s = FastMath.map(FastMath.sin(xOff), -1, 1, 100, height - 100)*0;
			let n = FastMath.map(random.noise(xOff), 0, 1, 0, height);
			
			let y = s +n;
			// let y = random.getUpTo(height);
			xOff += 0.01;
			g.lineTo(x, y);
		}
		timeOff += 0.02;
	}

}