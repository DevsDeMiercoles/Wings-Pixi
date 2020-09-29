import Engine from '../wings/engine/Engine';
import Controller from "../wings/framework/inputs/Controller";
import random from "../wings/framework/random/Random";
import { StringDNA } from "../wings/systems/evolution/DNA";
import { Evolution } from "../wings/systems/evolution/Evolution";

let width = 720;
let height = 480;
let engine: Engine;
let controller: Controller;

let generation = 0;
export default function startDefault() {
	engine = new Engine({ width, height });
	controller = new Controller(engine.stage);

	random.randomizeSeed();

	let nature = new TextEvolution(5000);
	nature.populate(Monkey);
	nature.evaluateFitness();
	showInfo();

	engine.onUpdate = () => {
		if (target != nature.bestCreature.type()) {
			nature.evolve();
			generation++;
			showInfo();
		}

		controller;
	};

	function showInfo() {
		console.info(`Generation ${generation}  ~  Population: ${nature.creatures.length}  ~  Average acuracy: ${(nature.averageFitness / target.length * 100).toFixed(1)}%`);
		console.log("Best DNA: " + nature.creatures[0].type());
	}
}

let target = "To be or, not to be.";
class Monkey {
	dna = new StringDNA();
	fitness = 0;

	constructor() {
		this.dna.sequence(target.length);
	}
	type(): string {
		return this.dna.gens.join("");
	}
}
class TextEvolution extends Evolution<Monkey> {
	fitnessFunction(monkey: Monkey) {
		let score = 0;
		let text = monkey.type();
		for (let i = 0; i < text.length; i++) {
			if (text[i] == target[i])
				score++;
		}

		return score;
	}
}