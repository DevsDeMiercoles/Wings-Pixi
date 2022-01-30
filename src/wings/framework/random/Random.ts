import FastMath from "../core/FastMath";
import hash from '../core/Hashing';
import ParkerMiller from "./generators/ParkerMiller";
import Gaussian from "./shapers/Gaussian";
import PerlinNoise from './shapers/PerlinNoise';
import SimplexNoise from './shapers/SimplexNoise';

let generator = new ParkerMiller(); // ParkerMiller - MersenneTwister
let simplex = new SimplexNoise(generator);
let perlin = new PerlinNoise(generator);
let gaussianGenerator = new Gaussian(generator);
let originalSeed: string = "Lucifer";

let random = {
	getSeed(): string {
		return originalSeed;
	},

	setSeed(seed: string): void {
		originalSeed = seed;
		generator.setSeed(hash(seed));
	},
	randomizeSeed(): void {
		let randomSeed = (Math.floor(Math.random() * (10 ** 10)) + 1).toString();
		this.setSeed(randomSeed);
		simplex.generateSet();
		perlin.generateSet();
	},

	/**
	 * Return a value betwen (0, 1)
	 */
	generate(): number {
		return generator.random();
	},


	/**
	 * Return a value betwen (0, max)
	 */
	getUpTo(max: number): number {
		return (generator.random() * max);
	},

	/**
	 * Return a value betwen (min, max)
	 */
	range(min: number, max: number): number {
		return FastMath.lerp(generator.random(), min, max);
	},

	/**
	 * Get a random angle between [0 and 2π)
	 */
	angle(): number {
		return generator.random() * FastMath.angle360;
	},


	/**
	 * Return a value betwen (0, 1) with a median of 0.5
	 * 
	 * The factor affects how flat or high the distribution is
	 */
	normalDistribution(factor: number = 3): number {
		return gaussianGenerator.random(factor);
	},
	/**
	 * Return a value betwen (median-diff, median+diff)
	 * The median is the most common value
	 * The diff is the max value
	 * The factor is how close to the common value it stays
	 */
	normalDistributedIn(median: number, diff: number, factor: number = 3): number {
		return FastMath.map(gaussianGenerator.random(factor), 0, 1, median - diff, median + diff);
	},

	/**
	 * Return a value betwen (0, 1)
	 */
	noise(x: number, y?: number, z?: number): number {
		return perlin.noise(x, y, z);
	},
	/**
	 * Return a value betwen (0, 1)
	 */
	noiseSmooth(x: number, y?: number, z?: number): number {
		return simplex.noise(x, y, z);
	},

	/**
	 * Get a random  between:number (0, 1) acording to the probabilityDistribution function The void should be an equation in
	 * the form of f(x) = x% (probablity of x)
	 */
	customDistribution(fun: (x: number) => number): number {
		let x: number;
		do {
			x = this.generate();
		} while (!this.happens(fun(x)));
		return x;
	},

	/**
	 * A space is a a set of elements with a custom probability each.
	 * It returns an element from that space acording to this probabilities
	 */
	customSpace<T>(space: Array<[T, number]>): T {
		let r = random.generate();
		let acumulated = 0;
		for (const [val, prob] of space) {
			acumulated += prob;
			if (r < acumulated)
				return val;
		}
		if (acumulated < 1) {
			throw new Error(`The space is not filled, to total space acounts for ${acumulated}%`);
		}
		else
			return space[0][0];
	},

	happens(chance: number): boolean {
		return this.generate() <= chance;
	}

};

random.setSeed(originalSeed);

export default random;
