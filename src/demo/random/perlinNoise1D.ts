import { Graphics } from "pixi.js";
import Engine from "../../wings/engine/Engine";
import FastMath from "../../wings/framework/core/FastMath";
import watcher from "../../wings/framework/debug";
import random from "../../wings/framework/random/Random";

let width = 720;
let height = 480;

export default async function start() {
	let engine = new Engine({ width, height, backgroundColor: 0x828282 });
	console.log("Corriendo Demo de Perlin Noise 1D");

	let g = new Graphics;
	engine.stage.addChild(g);

	let increment = 0.01;
	let speed = 1;
	let smooth = false;
	let proxy = {
		get increment() {
			return increment;
		},
		set increment(x) {
			increment = x;
		},
		get speed() {
			return speed;
		},
		set speed(x) {
			speed = x;
		},
		get smooth() {
			return smooth;
		},
		set smooth(x) {
			smooth = x;
		}
	};
	watcher.watch(proxy);

	engine.onUpdate = tick;
	random.randomizeSeed();
	let timeOff = 0;

	function tick() {
		update();

		g.clear();
		// g.beginFill(0xFFFFFF);
		g.lineStyle(1, 0xFFFFFF);
		draw();
		g.endFill();
	}

	function update() {
	}
	function draw() {
		let noiseFunction = smooth ? random.noiseSmooth : random.noise;
		let xOff = timeOff;
		g.moveTo(0, height / 2);
		for (let x = 0; x <= width; x += 0.5) {
			let s = FastMath.map(FastMath.sin(xOff), -1, 1, 100, height - 100) * 0;
			let n = FastMath.map(noiseFunction(xOff), 0, 1, 0, height);

			let y = s + n;
			// let y = random.getUpTo(height);
			xOff += increment;
			g.lineTo(x, y);
		}
		timeOff += increment * speed;
	}

}