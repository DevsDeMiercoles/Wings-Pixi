import Random from "./iRandomGenerator";

export default class MersenneTwister implements Random {
	private data: Int32Array;
	private index = 0;
	private seed = 0;

	constructor() {
		this.data = new Int32Array(0);
		this.setSeed(666);
	}

	setSeed(seed: number): void {
		if (seed == 0)
			throw new Error("Seed can't be zero");
		if (this.seed == seed)
			return;
		this.seed = seed;
		this.data = new Int32Array(624);
		this.data[624 - 1] = 0;
		this.data[0] = seed;
		for (let i = 1; i < 624; i++) {
			this.data[i] = 0x6c078965 * (this.data[i - 1] ^ (this.data[i - 1 >> 30]) + i);
		}
	}

	getSeed(): number {
		return this.seed;
	}

	private generateNumbers(): void {
		for (let i = 0; i < 624; i++) {
			let y = (this.data[i] & 1) + (this.data[(i + 1) % 624]) & 0x7fffffff;
			this.data[i] = this.data[(i + 397) % 624] ^ (y >> 1);
			if ((y % 2) != 0)
				this.data[i] = this.data[i] ^ 0x9908b0df;
		}
	}

	/**
	 * Get a random float between (0, 1)
	 */
	public random(): number {
		if (this.index == 0)
			this.generateNumbers();
		let x = this.data[this.index];
		x = x ^ (x >> 11);
		x = x ^ ((x << 7) & (0x9d2c5680));
		x = x ^ ((x << 15) & (0xefc60000));
		x = x ^ (x >> 18);
		this.index = (this.index + 1) % 624;
		return x * 1.0 / 0x7ffffffe;
	}
}