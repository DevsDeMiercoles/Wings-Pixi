import MersenneTwister from '../../../../src/wings/framework/random/generators/MersenneTwister';
import ParkerMiller from '../../../../src/wings/framework/random/generators/ParkerMiller';
import Random from '../../../../src/wings/framework/random/shapers/PerlinNoise';

let generator = new ParkerMiller();
describe("Defaults", () => {
	test("Exist", () => {
		expect(Random).toBeDefined();
	});
	test("Default generator", () => {
		let r = new Random(generator);
		expect(r.generator).toBe(generator);
	});
	test("Set get generator", () => {
		let m = new MersenneTwister();
		let r = new Random(generator);
		r.generator = m;
		expect(r.generator).toBe(m);
	});
});

describe("Basic", () => {
	let r = new Random(generator);
	test("Exist", () => {
		expect(r.noise(42)).toBeDefined();
		expect(r.noise(42)).not.toBeNaN();
		expect(r.noise(42, 4)).toBeDefined();
		expect(r.noise(42, 4)).not.toBeNaN();
	});
});

describe("Distribution", () => {
	let r = new Random(generator);

	let n = 10000;
	let maxDiff = 0.5;
	let maxAverageDiff = 0.02;
	let diffTotal = 0;


	test("Tolerance", () => {
		let last = r.noise(42, 4, 4);
		for (let i = 0; i < n; i++) {
			let x = r.noise(42 + i * 0.01, 4 + i * 0.01, 4 + i * 0.01);
			let diff = variance(x, last);
			diffTotal += diff;
			last = x;

			expect(diff).toBeLessThanOrEqual(maxDiff);
		}
		expect(diffTotal / n).toBeLessThanOrEqual(maxAverageDiff);
	});
});
function variance(x: number, target: number): number {
	return Math.abs(target - x) / target;
}
