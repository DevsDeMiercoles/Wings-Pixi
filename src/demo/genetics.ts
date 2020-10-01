import { Text, TextStyle } from "pixi.js";
import Engine from '../wings/engine/Engine';
import watcher from '../wings/framework/debug';
import Controller from "../wings/framework/inputs/Controller";
import random from "../wings/framework/random/Random";
import { StringDNA } from "../wings/systems/evolution/DNA";
import { Evolution } from "../wings/systems/evolution/Evolution";

let width = 720;
let height = 480;
let engine: Engine;
let controller: Controller;

let generation = 0;

const genericStyle = new TextStyle({
	fontFamily: 'Arial',
	fontSize: 24,
	fontStyle: 'italic',
	fontWeight: 'bold',
	stroke: "#000000",
	strokeThickness: 2,
	fill: '#ffffff',
	wordWrap: true,
	wordWrapWidth: 440,
	lineJoin: 'round'
});
const styleTitle = genericStyle.clone();
styleTitle.fontSize = 36;
styleTitle.stroke = '#4a1850';
styleTitle.strokeThickness = 5,
	styleTitle.dropShadow = true;
styleTitle.dropShadowColor = '#000000';
styleTitle.dropShadowBlur = 4;
styleTitle.dropShadowAngle = Math.PI / 6;
styleTitle.dropShadowDistance = 6;

const bestGuessStyle = styleTitle.clone();
bestGuessStyle.fontSize = 28;
bestGuessStyle.strokeThickness = 4;
bestGuessStyle.dropShadow = true;
bestGuessStyle.dropShadowColor = '#000000';
bestGuessStyle.dropShadowBlur = 4;
bestGuessStyle.dropShadowAngle = Math.PI / 6;
bestGuessStyle.dropShadowDistance = 6;

export default function startGenetics() {
	engine = new Engine({ width, height });
	controller = new Controller(engine.stage);

	random.randomizeSeed();

	let nature = new TextEvolution(200);
	nature.populate(Monkey);


	const title = new Text('Best guess:', styleTitle);
	title.x = 35;
	title.y = 35;
	engine.stage.addChild(title);

	const bestGuess = new Text("", bestGuessStyle);
	bestGuess.x = 65;
	bestGuess.y = 95;
	engine.stage.addChild(bestGuess);


	const guesses = new Text("", genericStyle);
	guesses.x = 420;
	guesses.y = 10;
	engine.stage.addChild(guesses);

	const generalInfo = new Text("", genericStyle);
	generalInfo.x = 35;
	generalInfo.y = 170;
	engine.stage.addChild(generalInfo);
	watcher.watch(generalInfo);

	showInfo();

	engine.onUpdate = () => {
		nature.evaluateFitness();
		showInfo();
		if (target != nature.bestCreature.type()) {
			generation++;
			nature.select();
		}

		controller;
	};

	function showInfo() {
		bestGuess.text = nature.bestCreature.type();
		let allGuesses = "Generation dna: ";
		for (let i = 1; i < 15; i++) {
			allGuesses += "\n" + nature.creatures[i].type();
		}
		guesses.text = allGuesses;
		generalInfo.text = `Generation ${generation}  \n  Population: ${nature.creatures.length}  \n  Average acuracy: ${(nature.averageFitness / target.length * 100).toFixed(1)}%`;
	}
}

let target = "To be or, not to be.";
class Monkey {
	dna = new StringDNA();
	fitness = 0;

	constructor() {
		this.dna.sequence(target.length);
		this.dna.mutationRate = 0.01;
	}
	type(): string {
		return this.dna.gens.join("");
	}
}
class TextEvolution extends Evolution<Monkey> {
	restart() {
		this.creatures.length = 0;
		this.populate(Monkey);
	}
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
		let survivors = this.mating(creatures, 1);
		// survivors[0] = this.bestCreature;
		return survivors;
	}
}