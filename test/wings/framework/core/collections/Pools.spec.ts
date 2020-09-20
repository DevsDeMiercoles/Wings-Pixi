import { Pool, Pooleable } from "../../../../../src/wings/framework/core/collections/Pool";
import Pools from '../../../../../src/wings/framework/core/collections/Pools';

class Square implements Pooleable {
	side = 22;
	magicValue: string;

	constructor(magic?: string) {
		this.side = 42;
		this.magicValue = magic ?? "";
	}
	reset(): void {
		this.side = 11;
	}
}

class Circle implements Pooleable {
	radius = 47;

	constructor() {
		this.radius = 69;
	}
	reset(): void {
		this.radius = 0;
	}
}

describe("Pools", () => {
	test("Creating a new Pool", () => {
		let pool = Pools.getPool(Circle);
		expect(pool).toBeDefined();
	});

	test("Override pool", () => {
		let pool = new Pool(Circle);
		Pools.setPool(Circle, pool);
		expect(Pools.getPool(Circle)).toBe(pool);
	});

	test("Free and obtain", () => {
		let square = new Square("Super magic value");
		Pools.free(square);

		let recover = Pools.obtain(Square);
		expect(recover.magicValue).toBe("Super magic value");
		expect(recover).toBe(square);
	});

	test("Full round", () => {
		let square = new Square("Super magic value v2");
		let pool = new Pool(Square);
		pool.free(square);
		Pools.setPool(Square, pool);

		let recoverPool = Pools.getPool(Square);
		expect(recoverPool).toBe(pool);
		let recoverSquare = recoverPool.obtain();
		expect(recoverSquare).toBe(square);
	});
});