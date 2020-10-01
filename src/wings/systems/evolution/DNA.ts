import random from "../../framework/random/Random";

type Gens = Array<any>;

export default abstract class DNA<T> {
	gens = new Array<T>();
	mutationRate: number = 0.01;

	sequence(length: number) {
		let dna: T[] = [];
		for (var i = 0; i < length; i++) {
			dna.push(this.createGen());
		}
		this.gens = dna;
	}

	crossGens(fatherGens: DNA<T>): DNA<T> {
		let midpoint = random.getUpTo(this.gens.length);
		let xCromosome: Gens = this.gens.slice(0, midpoint);
		let yCromosome: Gens = fatherGens.gens.slice(midpoint);

		let cross: DNA<T> = new (this.constructor as any)();
		cross.mutationRate = this.mutationRate;
		cross.gens = xCromosome.concat(yCromosome);
		cross.mutate();

		return cross;
	}
	private mutate() {
		for (let i = 0; i < this.gens.length; i++) {
			if (random.happens(this.mutationRate)) {
				let gen = this.createGen();
				this.gens[i] = gen;
			}
		}
	}

	abstract createGen(): T;
}


export class StringDNA extends DNA<string> {
	createGen(): string {
		return letters.charAt(Math.floor(random.getUpTo(letters.length)));
	}
}

let letters = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ.,";