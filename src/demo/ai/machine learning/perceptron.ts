import { Graphics } from 'pixi.js';
import Engine from '../../../wings/engine/Engine';
import FastMath from '../../../wings/framework/core/FastMath';
import Controller, { InputEvents } from "../../../wings/framework/inputs/Controller";
import { MouseKeys } from "../../../wings/framework/inputs/Mouse";
import { Coordinates } from '../../../wings/framework/physics/Position';
import random from '../../../wings/framework/random/Random';

let width = 720;
let height = 480;
let engine: Engine;
let controller: Controller;

let points = new Array<Coordinates>();
let g = new Graphics();

let neuron: Perceptron;
export default function startPerceptron() {
	engine = new Engine({ width, height });
	controller = new Controller(engine.stage);
	controller.addAction("Click", MouseKeys.LEFT, InputEvents.Click);
	engine.stage.addChild(g);

	random.randomizeSeed();
	for (let i = 0; i < 2000; i++) {
		points.push(fromScreen({ x: random.getUpTo(width), y: random.getUpTo(height) }));
	}

	neuron = new Perceptron(2);

	engine.onUpdate = () => {
		let actions = controller.consumeActions();
		if (actions.includes("Click")) {
			points.push(fromScreen(controller.mousePos));
		}
		draw();
		if (points.length > 1) {
			gradiantDecent();
		}
	};
}

function draw() {
	g.clear();

	for (const p of points) {
		let value = realValue(p);
		let guess = neuron.process([p.x, p.y]);


		if (value == 1)
			g.beginFill(0xFFFFFF);
		else
			g.beginFill(0x000000);

		if (FastMath.equals(guess, value))
			g.lineStyle(2, 0x0fa314);
		else
			g.lineStyle(2, 0xa30f0f);

		let pScreen = toScreen(p);
		g.drawCircle(pScreen.x, pScreen.y, 8);
	}
	g.endFill();
	g.lineStyle(2, 0x0df2c9);
	g.moveTo(width / 2, 0);
	g.lineTo(width / 2, height);
	g.moveTo(0, height / 2);
	g.lineTo(width, height / 2);
	if (points.length > 1) {
		g.lineStyle(2, 0x4EC5F1);
		let start = toScreen({ x: -1, y: -m + b });
		g.moveTo(start.x, start.y);
		let end = toScreen({ x: 1, y: m + b });
		g.lineTo(end.x, end.y);
	}
}

let m = Math.random() * 2 - 1;
let b = Math.random() * 2 - 1;
function realValue(p: Coordinates): number {
	let y = p.x * m + b;
	return p.y >= y ? 1 : -1;
}

function gradiantDecent() {
	for (const p of points) {
		neuron.train([p.x, p.y], realValue(p));
	}
}

class Perceptron {
	weights = new Array<number>();
	bias = 0;
	learningRate = 0.01;

	constructor(n: number) {
		for (let i = 0; i < n; i++) {
			this.weights.push(random.range(-1, 1));
		}
	}

	process(inputs: number[]): number {
		let sum = 0;
		for (let i = 0; i < inputs.length; i++) {
			sum += inputs[i] * this.weights[i];
		}
		return this.activationFunction(sum + this.bias);
	}

	train(inputs: number[], answer: number): void {
		let guess = this.process(inputs);
		let error = answer - guess;

		//Apply gradiend decent with error
		for (let i = 0; i < this.weights.length; i++) {
			this.weights[i] += error * inputs[i] * this.learningRate;
		}
		this.bias += error * this.learningRate;
	}

	protected activationFunction(x: number): number {
		return FastMath.sign(x);
	}
}


function toScreen(p: Coordinates): Coordinates {
	let screenP = { x: p.x, y: p.y };
	screenP.x = FastMath.transform(p.x, -1, 1, 0, width);
	screenP.y = FastMath.transform(p.y, -1, 1, height, 0);

	return screenP;
}

function fromScreen(screenP: Coordinates): Coordinates {
	let p = { x: screenP.x, y: screenP.y };
	p.x = FastMath.map(p.x, 0, width, -1, 1);
	p.y = FastMath.map(p.y, 0, height, 1, -1);

	return p;
}