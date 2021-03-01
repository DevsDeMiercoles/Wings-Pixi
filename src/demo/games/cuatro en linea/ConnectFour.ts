import { Graphics, Sprite, Texture } from 'pixi.js';
import Engine from '../../../wings/engine/Engine';
import { MouseEvents } from '../../../wings/framework/inputs/Mouse';

let width = 720;
let height = 480;
let engine: Engine;

let grid = new Array<Array<Ficha>>();
let currentTurn: "P1" | "P2";
let playing = true;
export default function startConnectFour() {
	engine = new Engine({ width, height });

	preload();
	crearTablero();
	currentTurn = "P1";

	engine.onUpdate = () => {
	};

}
async function preload() {
	engine.loader.add("img/fichas/chipBlue_border.png", "fichaAzul");
	engine.loader.add("img/fichas/chipGreen_border.png", "fichaVerde");
	await engine.loader.load();

	Ficha.texturaAzul = engine.loader.resources.fichaAzul.texture;
	Ficha.texturaVerde = engine.loader.resources.fichaVerde.texture;
}
function crearTablero() {
	for (let i = 0; i < 7; i++) {
		grid.push(new Array<Ficha>());
		let columna = new Graphics();
		engine.stage.addChild(columna);
		columna.beginFill(0x0df2c8);
		columna.drawRect(0, 0, 75, 75 * 6);
		columna.endFill();
		columna.alpha = 0.5;
		columna.x = 10 + 100 * i + 25 / 2;
		columna.y = 15;

		columna.interactive = true;
		columna.on(MouseEvents.CLICK, () => clickColumna(i));
	}
}

function clickColumna(i: number) {
	if (!playing) return;


	let columna = grid[i];
	if (columna.length < 6) {
		let ficha = new Ficha(currentTurn);
		engine.stage.addChild(ficha.image);
		ficha.image.x = 10 + 100 * i + 25 / 2 + (75 - 68) / 2;
		ficha.image.y = 480 - 25 / 2 - 75 * columna.length - 75;
		verificarGanar(i, columna.length);
		columna.push(ficha);
		changeTurn();
	}
	else {
		console.warn("La columna ya esta llena");
	}

}
function changeTurn() {
	currentTurn = currentTurn == "P1" ? "P2" : "P1";
}
function verificarGanar(x: number, y: number) {
	if (verificarHorizontal(x, y) >= 4 || verificarVertical(x, y) >= 4 || verificarDiag1(x, y) >= 4 || verificarDiag2(x, y) >= 4) {
		console.warn("Gano el jugador " + currentTurn);
		playing = false;
	}
}

function verificarHorizontal(x: number, y: number): number {
	return verificarDireccion(x, y, 0, -1, 0) + verificarDireccion(x, y, 0, 1, 0) + 1;
}
function verificarVertical(x: number, y: number): number {
	return verificarDireccion(x, y, 0, 0, -1) + verificarDireccion(x, y, 0, 0, 1) + 1;
}

function verificarDiag1(x: number, y: number): number {
	return verificarDireccion(x, y, 0, -1, -1) + verificarDireccion(x, y, 0, 1, 1) + 1;
}
function verificarDiag2(x: number, y: number): number {
	return verificarDireccion(x, y, 0, -1, 1) + verificarDireccion(x, y, 0, 1, -1) + 1;
}
function verificarDireccion(x: number, y: number, total: number, dirX: number, dirY: number): number {
	x += dirX;
	y += dirY;

	//Out of bounds
	if (x < 0 || x > 6 || y < 0 || y > 5) {
		return total;
	}

	if (grid[x][y]?.owner == currentTurn) {
		return verificarDireccion(x, y, total + 1, dirX, dirY);
	} else {
		return total;
	}
}


class Ficha {
	static texturaAzul: Texture;
	static texturaVerde: Texture;

	image: Sprite;
	owner: string;

	constructor(owner: string) {
		this.owner = owner;
		if (owner == "P1") {
			this.image = Sprite.from(Ficha.texturaAzul);
		}
		else {
			this.image = Sprite.from(Ficha.texturaVerde);
		}
	}
}