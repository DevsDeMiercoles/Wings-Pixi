import FastMath from "../core/FastMath";
import ParkerMiller from "./generators/ParkerMiller";
import Gaussian from "./shapers/Gaussian";
import PerlinNoise from "./shapers/PerlinNoise";

let generator = new ParkerMiller(); // ParkerMiller - MersenneTwister
let perlin = new PerlinNoise(generator);
let gaussianGenerator = new Gaussian(generator);


let random = {
	getSeed(): number {
		return generator.getSeed();
	},

	setSeed(seed: number): void {
		generator.setSeed(seed);
	},

	generate(): number {
		return generator.random();
	},


	/**
	 * Return a value betwen [0, max)
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
	 * The factor affects how with the distribution is
	 */
	normalDistribution(factor: number = 3): number {
		return gaussianGenerator.random(factor);
	},

	/**
	 * Return a value betwen (0, 1)
	 */
	noise(x: number, y?: number, z?: number): number {
		return perlin.noise(x, y, z);
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

	happens(chance: number): boolean {
		return this.generate() <= chance;
	}

};

export default random;