import FastMath from "../../core/FastMath";
import iRandomGenerator from "./iRandomGenerator";

let modus = 0x7FFFFFFF;
let multiply = 48271;
export default class ParkerMiller implements iRandomGenerator {
	private seed = 666;

	public setSeed(seed: number): void {
		if (seed == 0)
			throw new Error("Seed can't be zero");

		if (FastMath.abs(seed) == modus)
			seed -= 666;

		this.seed = seed;
	}

	public getSeed(): number {
		return this.seed;
	}

	/**
	 * Get a random float between (0, 1)
	 */
	public random(): number {
		this.seed = FastMath.realModule(multiply * this.seed, modus);
		return this.seed / modus;
	}
}
