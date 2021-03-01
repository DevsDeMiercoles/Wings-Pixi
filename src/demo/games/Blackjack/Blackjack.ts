import Engine from '../../../wings/engine/Engine';
import notifications from '../../../wings/framework/Events';
import random from '../../../wings/framework/random/Random';
import Assets from './Assets';
import Ficha from './Ficha';

let width = 720;
let height = 480;
let engine: Engine;


// let fase: "Apuesta" | "Jugador" | "Dealer";
let money: number = 100;
let apuesta = 0;

let fichas = new Array<Ficha>();
// let siguiente = new Text("Siguiente");
export default async function startBlackjack() {
	engine = new Engine({ width, height });

	random.randomizeSeed();

	let assets = new Assets();
	await assets.loadAll();

	crearTodo();

	notifications.addNotificationListener("Apuesta", clickApuesta);
	startRound();

	engine.onUpdate = () => {
	};

	apuesta;
}

function crearTodo() {
	let ficha = new Ficha(5);
	ficha.image.x = 475;
	ficha.image.y = 350;
	fichas.push(ficha);

	ficha = new Ficha(10);
	ficha.image.x = 550;
	ficha.image.y = 350;
	fichas.push(ficha);

	ficha = new Ficha(25);
	ficha.image.x = 625;
	ficha.image.y = 350;
	fichas.push(ficha);

	ficha = new Ficha(50);
	ficha.image.x = 550;
	ficha.image.y = 275;
	fichas.push(ficha);

	ficha = new Ficha(100);
	ficha.image.x = 625;
	ficha.image.y = 275;
	fichas.push(ficha);
}

function clickApuesta(value: number) {
	if (value <= money) {
		apuesta += value;
		money -= value;
		console.info(apuesta);
		calcularVisibilidadFichas();
	} else {
		//No puede costearlo
		console.error("No puede pagarlo");
	}
}
function calcularVisibilidadFichas() {
	for (const ficha of fichas) {
		ficha.calcularVisibilidad(money);
	}
}

// function pedirCarta() {
// 	//Dar carta
// 	//Verificar que no se pase
// }
// function doblar() {
// 	//Valir que puede doblar
// 	//Agregar apuesta
// 	//Entregar carta
// 	//Cambiar turno
// }

// function cambiarFase() {
// 	switch (fase) {
// 		case "Apuesta":
// 			if (apuesta == 0) {
// 				//No puede empezar sin apostar
// 			} else {
// 				startRound();
// 				fase = "Jugador";
// 			}
// 			break;
// 		case "Jugador":
// 			fase = "Dealer";
// 			break;

// 		case "Dealer":
// 			//Calcular quien gana
// 			//Pagar / cobrar
// 			break;


// 	}
// }

function startRound() {
	// Mesclar mazo
	// Repartir cartas iniciales

	calcularVisibilidadFichas();
}