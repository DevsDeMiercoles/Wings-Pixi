import Engine from '../../wings/engine/Engine';
import Controller from "../../wings/framework/inputs/Controller";
import random from "../../wings/framework/random/Random";
import { StringDNA } from "../../wings/systems/evolution/DNA";
import { Evolution } from "../../wings/systems/evolution/Evolution";
import * as controles from './controles';

let width = 720;
let height = 480;
let engine: Engine;
let controller: Controller;

//TODO: Agregar sliders
let simulating = false;

let target = "To be or, not to be.";
let mutationRate = 0.01;
let fitnessWeight = 1;
let bestSurvives = false;
export default function startGenetics() {
	engine = new Engine({ width, height });
	controller = new Controller(engine.stage);

	random.randomizeSeed();

	let nature = new TextEvolution();

	controles.crearControles(engine.stage);
	let button = document.getElementById("gogogo")!;
	button.onclick = startAll;

	engine.onUpdate = () => {
		if (!simulating)
			return;
		nature.evaluateFitness();
		controles.showInfo(nature, target);
		if (target != nature.bestCreature.type())
			nature.select();

		controller;
	};

	function startAll() {
		let p;
		[target, mutationRate, fitnessWeight, bestSurvives, p] = controles.obtenerControles();
		nature.createPopulation(Monkey, p);
		simulating = true;
	}
}

class Monkey {
	dna = new StringDNA();
	fitness = 0;

	constructor() {
		this.dna.sequence(target.length);
		this.dna.mutationRate = mutationRate;
	}
	type(): string {
		return this.dna.gens.join("");
	}
}
export class TextEvolution extends Evolution<Monkey> {
	fitnessFunction(monkey: Monkey) {
		let score = 0;
		let text = monkey.type();
		for (let i = 0; i < text.length; i++) {
			if (text[i] == target[i])
				score++;
		}

		return score;
	}

	naturalSelection(creatures: Monkey[]): Monkey[] {
		let survivors = this.mating(creatures, fitnessWeight);
		if (bestSurvives)
			survivors[0] = this.bestCreature;
		return survivors;
	}
}