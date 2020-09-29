import { arrayRandom, Class } from "../../framework/core/utils";
import random from "../../framework/random/Random";
import Creature from './Creature';

export abstract class Evolution<T extends Creature<any>>{
	protected totalFitness = 0;
	protected population: number;
	creatures = new Array<T>();
	averageFitness = 0;

	constructor(population: number) {
		this.population = population;
	}

	populate<Z extends T>(clazz: Class<Z>): void {
		for (let i = 0; i < (this.population); i++) {
			this.creatures.push(new clazz());
		}
	}

	evolve() {
		this.evaluateFitness();
		// let survivors = this.predate();
		let nextGen = this.reproduction(this.creatures);
		this.creatures = nextGen;
	}
	evaluateFitness(): void {
		this.totalFitness = 0;
		for (const c of this.creatures) {
			c.fitness = this.fitnessFunction(c);
			this.totalFitness += c.fitness;
		}
		this.averageFitness = this.totalFitness / this.creatures.length;

		this.creatures.sort((c1, c2) => c2.fitness - c1.fitness);
	}
	protected predate(weaknessAllowed: number): T[] {
		let survivors = [];
		let maxFitness = this.bestCreature.fitness;
		for (const c of this.creatures) {
			if (c.fitness / maxFitness >= weaknessAllowed)
				survivors.push(c);
		}

		return survivors;
	}
	protected reproduction(survivors: Array<T>): Array<T> {
		let nextGen = new Array<T>();
		let maxFitness = this.bestCreature.fitness;
		nextGen.push(this.bestCreature);
		for (let i = 1; i < this.population; i++) {
			let mother: T;
			let father: T;
			do {
				mother = arrayRandom(survivors);
			} while (!random.happens(mother.fitness / maxFitness));

			do {
				father = arrayRandom(survivors);
			} while (mother == father || !random.happens(father.fitness / maxFitness));

			nextGen.push(this.createOffspring(mother, father));
		}

		return nextGen;
	}
	protected createOffspring(mother: T, father: T): T {
		let child: T = new (mother.constructor as any)();
		child.dna = mother.dna.crossGens(father.dna); //TODO: mejorar performance para que no genere siempre dna
		return child;
	}

	get bestCreature(): T {
		return this.creatures[0];
	}

	protected abstract fitnessFunction(creature: T): number;
}