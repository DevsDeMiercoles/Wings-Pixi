import MersenneTwister from '../../../../src/wings/framework/random/generators/MersenneTwister';
import ParkerMiller from '../../../../src/wings/framework/random/generators/ParkerMiller';
import Random from '../../../../src/wings/framework/random/shapers/Gaussian';

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

describe("Distribution", () => {
	let r = new Random(generator);

	let n = 100000;
	let buckets = 11;
	let maxDiff = 0.1;
	let data: Array<number> = [];
	for (let i = 0; i < buckets; i++) {
		data.push(0);
	}
	for (let i = 0; i < n; i++) {
		data[Math.floor(r.random() * buckets)]++;
	}

	test("Tolerance", () => {
		expect;
		// let percents = "";
		for (let i = 0; i < data.length / 2; i++) {
			const x = data[i];

			let percent = (x / n) * 100;
			let expected = checkFunction(3.1 - 0.7 * i - Math.min(0, 1 - i) * 0.2 - Math.min(0, 2 - i) * 0.1 - Math.min(0, 3 - i) * 0.1 - Math.min(0, 4 - i) * 0.2) * 100;
			let varia = variance(percent, expected);
			// console.log(`Testing for ${i} value ${percent.toFixed(2)} expected ${expected.toFixed(2)}, variance ${(varia * 100).toFixed()}%`);
			expect(varia).toBeLessThanOrEqual(maxDiff);
			// percents += `${i}: ${percent.toFixed(2)}% - `;
		}
		// console.log(percents);
	});
});
function checkFunction(x: number): number { return Math.pow(Math.E, -Math.pow(x, 2) / 2) / Math.sqrt(2 * Math.PI); }
function variance(x: number, target: number): number {
	return Math.abs(target - x) / target;
}
