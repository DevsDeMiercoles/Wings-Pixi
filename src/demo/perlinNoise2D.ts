import { Graphics } from "pixi.js";
import Engine from "../wings/engine/Engine";
import colors from "../wings/framework/colors";
import watcher from "../wings/framework/debug";
import random from "../wings/framework/random/Random";

let width = 720;
let height = 480;

export default async function start() {
	let engine = new Engine({ width, height, backgroundColor: 0x828282 });
	console.log("Corriendo Demo de Perlin Noise 1D");

	let g = new Graphics();
	engine.stage.addChild(g);

	let increment = 0.07;
	let squareSize = 5;
	let time = false;
	let timeOffsetX = 0;
	let timeOffsetY = 0;

	let smooth = false;

	let proxy = {
		get increment() {
			return increment;
		},
		set increment(x) {
			increment = x;
		},
		get pixel() {
			return squareSize;
		},
		set pixel(x) {
			squareSize = x;
		},
		get time() {
			return time;
		},
		set time(x) {
			time = x;
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

	function tick() {
		update();

		g.clear();
		g.beginFill(0xFFFFFF);
		draw();
		g.endFill();
	}

	function update() {
	}
	function draw() {
		let noiseFunction = smooth ? random.noiseSmooth : random.noise;

		let xOff = timeOffsetX;
		for (let x = 0; x <= width; x += squareSize) {
			let yOff = timeOffsetY;
			for (let y = 0; y < height; y += squareSize) {

				let colour = noiseFunction(xOff, yOff);


				g.beginFill(colors.rgb(colour));
				g.drawRect(x, y, squareSize, squareSize);
				yOff += increment;
			}
			xOff += increment;
		}
		if (time) {
			timeOffsetX += increment;
			let noise = noiseFunction(timeOffsetX);
			timeOffsetY += (noise - 0.5) * increment;
		}
	}

}