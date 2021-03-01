import { Container, Text } from "pixi.js";
import * as html from "./controles-html";
import { bestGuessStyle, genericStyle, styleTitle } from "./estilos";
import { TextEvolution } from './genetics';

let title: Text;
let bestGuess: Text;
let guesses: Text;
let generalInfo: Text;


function crearControles(stage: Container) {
	html.loadControlesHtml();

	title = new Text('Best guess:', styleTitle);
	title.x = 35;
	title.y = 35;
	stage.addChild(title);

	bestGuess = new Text("", bestGuessStyle);
	bestGuess.x = 65;
	bestGuess.y = 95;
	stage.addChild(bestGuess);


	guesses = new Text("", genericStyle);
	guesses.x = 420;
	guesses.y = 10;
	stage.addChild(guesses);

	generalInfo = new Text("", genericStyle);
	generalInfo.x = 35;
	generalInfo.y = 170;
	stage.addChild(generalInfo);
}

function showInfo(nature: TextEvolution, target: string) {
	bestGuess.text = nature.bestCreature.type();
	let allGuesses = "Generation dna: ";
	for (let i = 1; i < 15 && i < (html.populationSlider as any).valueAsNumber; i++) {
		allGuesses += "\n" + nature.creatures[i].type();
	}
	guesses.text = allGuesses;
	generalInfo.text = `Generation ${nature.currentGeneration}  \n  Population: ${nature.creatures.length}  \n  Average acuracy: ${(nature.averageFitness / target.length * 100).toFixed(1)}%`;
}
function obtenerControles(): [string, number, number, boolean, number] {
	return [(html.targetText as any).value, (html.mutationSlider as any).valueAsNumber / 100, (html.fitnessSlider as any).valueAsNumber, (html.bestSurvivorCheck as any).checked, (html.populationSlider as any).valueAsNumber];
}

export { crearControles, showInfo, obtenerControles };

