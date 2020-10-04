import { Graphics } from 'pixi.js';
import Engine from '../wings/engine/Engine';
import FastMath from '../wings/framework/core/FastMath';
import Controller, { InputEvents } from "../wings/framework/inputs/Controller";
import { MouseKeys } from "../wings/framework/inputs/Mouse";
import { Coordinates } from '../wings/framework/physics/Position';

let width = 720;
let height = 480;
let engine: Engine;
let controller: Controller;

let points = new Array<Coordinates>();
let g = new Graphics();
let m = 1;
let b = 0;
export default function startGradiantDecent() {
	engine = new Engine({ width, height });
	controller = new Controller(engine.stage);
	controller.addAction("Click", MouseKeys.LEFT, InputEvents.Click);
	engine.stage.addChild(g);

	calculateDecent;
	engine.onUpdate = () => {
		let actions = controller.consumeActions();
		if (actions.includes("Click")) {
			points.push(fromScreen(controller.mousePos));
		}
		if (points.length > 1) {
			gradiantDecent();
		}
		drawDecent();
	};
}

function drawDecent() {
	g.clear();
	g.beginFill(0xFFFFFF);
	for (const p of points) {
		let screenP = toScreen(p);
		g.drawCircle(screenP.x, screenP.y, 8);
	}
	g.endFill();
	if (points.length > 1) {
		g.lineStyle(2, 0xa30f0f);
		let start = toScreen({ x: 0, y: b });
		g.moveTo(start.x, start.y);
		let end = toScreen({ x: 1, y: m + b });
		g.lineTo(end.x, end.y);
	}
}
function calculateDecent() {
	let yTotal = 0;
	let xTotal = 0;
	for (const p of points) {
		xTotal += p.x;
		yTotal += p.y;
	}
	let xAvg: number = xTotal / points.length;
	let yAvg: number = yTotal / points.length;

	let numerator = 0;
	let denominator = 0;
	for (const p of points) {
		let xDiff = (p.x - xAvg);
		numerator += xDiff * (p.y - yAvg);
		denominator += xDiff ** 2;
	}
	m = numerator / denominator;
	b = yAvg - m * xAvg;
}
function gradiantDecent() {
	let learningRate = 0.1;

	for (const p of points) {
		let guess = m * p.x + b;
		let error = p.y - guess;


		m += error * p.x * learningRate;
		b += error * learningRate;
	}

}

function toScreen(p: Coordinates): Coordinates {
	let screenP = { x: p.x, y: p.y };
	screenP.x = screenP.x * width;
	screenP.y = (1 - screenP.y) * height;

	return screenP;
}

function fromScreen(screenP: Coordinates): Coordinates {
	let p = { x: screenP.x, y: screenP.y };
	p.x = FastMath.map(p.x, 0, width, 0, 1);
	p.y = FastMath.map(p.y, 0, height, 1, 0);

	return p;
}