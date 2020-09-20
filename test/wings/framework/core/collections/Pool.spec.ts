import { Pool, Pooleable } from '../../../../../src/wings/framework/core/collections/Pool';

class Unique implements Pooleable {
	n = 0;
	data: string;

	constructor(data?: string) {
		this.n = 42;
		this.data = data ?? "";
	}
	reset(): void {
		this.n = 11;
	}
}

describe("Pool", () => {
	let uni1 = new Unique("I'm #1");
	let pool = new Pool(Unique);
	test("Pool and retrive", () => {
		pool.free(uni1);
		let e = pool.obtain();
		expect(e.data).toBe(uni1.data);
		expect(e).toBe(uni1);
	});
	test("Retrive new", () => {
		let e = pool.obtain();
		expect(e.data).not.toBe(uni1.data);
		expect(e.data).toBe("");
		expect(e.n).toBe(42);
	});
	test("Clean when free", () => {
		uni1.n = 666;
		pool.free(uni1);
		let e = pool.obtain();
		expect(e.n).not.toBe(666);
		expect(e.n).toBe(11);
		expect(uni1.n).toBe(11);
	});
	test("Lost pooled", () => {
		pool.free(uni1);
		pool.clear();
		let e = pool.obtain();
		expect(e.data).not.toBe(uni1.data);
		expect(e.data).toEqual("");
	});
});
