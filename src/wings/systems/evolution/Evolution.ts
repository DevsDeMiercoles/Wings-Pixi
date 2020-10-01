import { Class } from "../../framework/core/utils";
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
		this.select();
	}
	select() {
		this.creatures = this.naturalSelection(this.creatures);
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
	protected naturalSelection(creatures: Array<T>): Array<T> {
		let survivors = creatures; // this.predate(0.2);
		let nextGen = this.mating(survivors);

		//Add the best survivor
		nextGen[0] = this.bestCreature;

		return nextGen;
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
	protected mating(survivors: Array<T>, weight: number = 1): Array<T> {
		let nextGen = new Array<T>();
		let maxFitness = this.bestCreature.fitness ** weight;

		for (let i = 0; i < this.population; i++) {
			let mother: T;// = random.customSpace(matingSpace);
			do {
				mother = survivors[Math.floor(random.getUpTo(survivors.length))];
			} while (!random.happens(mother.fitness ** weight / maxFitness));

			let father: T; //= random.customSpace(matingSpace);

			do {
				father = survivors[Math.floor(random.getUpTo(survivors.length))];
			} while (!random.happens(father.fitness ** weight / maxFitness));

			//Evolutions 33  ~  Average: 132  ~  Min: 65  ~  Max: 291  ~ Took around 2.35s  ~ Average time 2.22		Max fitness
			//Evolutions 33  ~  Average: 137  ~  Min: 63  ~  Max: 266  ~ Took around 4.27s  ~ Average time 3.75		Weighted total
			//Evolutions 33  ~  Average: 134  ~  Min: 79  ~  Max: 291  ~ Took around 1.82s  ~ Average time 2.25		Custom space
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