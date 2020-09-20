import Random from '../../../../../src/wings/framework/random/generators/MersenneTwister';

describe("Defaults", () => {
	test("Exist", () => {
		expect(Random).toBeDefined();
	});
	test("Default seed", () => {
		let r = new Random();
		expect(r.getSeed()).toBe(666);
	});
	test("Invalid seed", () => {
		let r = new Random();
		expect(() => r.setSeed(0)).toThrowError("Seed can't be zero");
		expect(r.getSeed()).toBe(666);
	});
});

describe("Changing seed", () => {
	test("Set and recover", () => {
		let r = new Random();
		expect(r.getSeed()).toBe(666);
		r.setSeed(42);
		expect(r.getSeed()).toBe(42);
		r.setSeed(42);
		expect(r.getSeed()).toBe(42);
	});
});
describe("Distribution", () => {
	let r = new Random();

	let n = 10000;
	let buckets = 10;
	let maxDiff = 0.06;
	let data: Array<number> = [];
	for (let i = 0; i < buckets; i++) {
		data.push(0);
	}
	for (let i = 0; i < n; i++) {
		data[Math.floor(r.random() * buckets)]++;
	}
	let expectedAmount = n / buckets;
	let maxAmount = expectedAmount * (1 + maxDiff);
	let minAmount = expectedAmount * (1 - maxDiff);

	test("Tolerance", () => {
		// let percents = "";
		for (let i = 0; i < data.length; i++) {
			const x = data[i];
			expect(x).toBeLessThanOrEqual(maxAmount);
			expect(x).toBeGreaterThanOrEqual(minAmount);
			// percents += `${i}: ${(x / n * 100).toFixed(2)}% - `;
		}
		// console.log(percents);
	});
});