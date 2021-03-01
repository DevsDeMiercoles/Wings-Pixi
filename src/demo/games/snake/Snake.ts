import { Point, Sprite } from 'pixi.js';
import Engine from '../../../wings/engine/Engine';
import Controller from '../../../wings/framework/inputs/Controller';
import { KeysCode } from "../../../wings/framework/inputs/Keyboard";

let width = 720;
let height = 480;
let engine: Engine;

let head: Sprite;
let apple: Sprite;
let chain = new Array<Sprite>();
let direction = new Point();
let control = new Point();

let playing = false;
let controller: Controller;
let speed = 2;

export default function startSnake() {
	engine = new Engine({ width, height });

	preload();

	controller = new Controller(engine.stage);
	let totalTime = 0;

	engine.onUpdate = (elapsedTime) => {
		if (playing) {
			readInputs();
			totalTime += elapsedTime;

			let frameTime = 1000 / speed;
			if (totalTime >= frameTime) {
				totalTime -= frameTime;
				movement();
				collitions();
			}
		}
	};

}
async function preload() {
	engine.loader.add("img/snake/Apple.png", "apple");
	engine.loader.add("img/snake/Snake.png", "snake");
	await engine.loader.load();

	head = Sprite.from(engine.loader.resources.snake.texture);
	engine.stage.addChild(head);
	moveToRandomPosition(head);

	apple = Sprite.from(engine.loader.resources.apple.texture);
	engine.stage.addChild(apple);
	moveToRandomPosition(apple);

	playing = true;
}
function readInputs() {
	if (controller.isKeyDown(KeysCode.LEFT) && direction.x != 1) {
		control.set(-1, 0);
	}
	if (controller.isKeyDown(KeysCode.RIGHT) && direction.x != -1) {
		control.set(1, 0);
	}
	if (controller.isKeyDown(KeysCode.UP) && direction.y != 1) {
		control.set(0, -1);
	}
	if (controller.isKeyDown(KeysCode.DOWN) && direction.y != -1) {
		control.set(0, 1);
	}
}
function movement() {
	direction.copyFrom(control);

	if (chain.length > 0) {
		let body = chain.pop()!;
		body!.position.copyFrom(head.position);
		chain.unshift(body);
	}

	head.position.x += direction.x * 20;
	head.position.y += direction.y * 20;

	if (head.position.x < 0) {
		head.position.x += 720;
	}
	if (head.position.x >= 720) {
		head.position.x -= 720;
	}
	if (head.position.y < 0) {
		head.position.y += 480;
	}
	if (head.position.y >= 480) {
		head.position.y -= 480;
	}

}

function collitions() {
	if (collidesWithBody(head.position))
		playing = false;	//Dead
	if (apple.position.equals(head.position)) {
		do {
			moveToRandomPosition(apple);
		} while (collidesWithBody(apple.position));//Avoid a position where already collides
		createBody();
		speed *= 1.1;
	}
}

function createBody() {
	let body = Sprite.from(engine.loader.resources.snake.texture);
	body.position.copyFrom(head.position);
	engine.stage.addChild(body);
	chain.unshift(body);
}

function moveToRandomPosition(sprite: Sprite) {
	sprite.position.set(Math.floor(Math.random() * 720 / 20) * 20, Math.floor(Math.random() * 480 / 20) * 20);
}
function collidesWithBody(pos: Point) {
	for (const body of chain) {
		if (pos.equals(body.position))
			return true;
	}
	return false;
}