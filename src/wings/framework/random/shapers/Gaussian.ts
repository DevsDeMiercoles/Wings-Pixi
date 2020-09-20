import iRandomGenerator from "../generators/iRandomGenerator";

export default class Gaussian {
	generator: iRandomGenerator;

	constructor(randomGenerator: iRandomGenerator) {
		this.generator = randomGenerator;
	}

	random(factor = 3): number {
		let rand = 0.0;
		for (let i = 0; i < factor; i++) {
			rand += this.generator.random();
		}
		return rand / factor;
	}
}
