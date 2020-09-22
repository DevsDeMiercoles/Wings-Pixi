import Position from '../../../../src/wings/framework/physics/Position';
import Vector from "../../../../src/wings/framework/physics/Vector";

let pDefa = new Position(666, 777);
describe("Defaults", () => {
	test("Constructor empty", () => {
		let p = new Position();
		expect(p).toBeDefined();
		expect(p.x).toBe(0);
		expect(p.y).toBe(0);
	});
	test("Constructor x", () => {
		let p = new Position(42);
		expect(p).toBeDefined();
		expect(p.x).toBe(42);
		expect(p.y).toBe(42);
	});
	test("Constructor x-y", () => {
		let p = new Position(42, 69);
		expect(p).toBeDefined();
		expect(p.x).toBe(42);
		expect(p.y).toBe(69);
	});
	test("clone", () => {
		let p = pDefa.clone();
		expect(p).not.toBe(pDefa);
		expect(p.x).toBe(666);
		expect(p.y).toBe(777);
	});
});
describe("Setters", () => {
	test("setter x", () => {
		let p = new Position();
		p.set(42);
		expect(p.x).toBe(42);
		expect(p.y).toBe(42);
	});
	test("setter x-y", () => {
		let p = new Position();
		p.set(42, 69);
		expect(p.x).toBe(42);
		expect(p.y).toBe(69);
	});
	test("move to x", () => {
		let p = new Position();
		p.moveTo(42);
		expect(p.x).toBe(42);
		expect(p.y).toBe(42);
	});
	test("move to x-y", () => {
		let p = new Position();
		p.moveTo(42, 69);
		expect(p.x).toBe(42);
		expect(p.y).toBe(69);
	});
	test("copy from", () => {
		let p = new Position();
		p.copyFrom(pDefa);
		expect(p.x).toBe(666);
		expect(p.y).toBe(777);
	});
	test("copy to", () => {
		let p = new Position();
		pDefa.copyTo(p);
		expect(p.x).toBe(666);
		expect(p.y).toBe(777);
	});
});

describe("Evaluators", () => {
	test("string", () => {
		expect(pDefa.toString()).toBe("(666,777)");
	});

	test("equals", () => {
		let p = new Position(42, 69);
		expect(p.equals(pDefa)).toBeFalsy();
		p.copyFrom(pDefa);
		expect(p).not.toBe(pDefa);
		expect(p.equals(pDefa)).toBeTruthy();
	});
});


describe("Operators", () => {
	let v = new Vector(100, 100);
	test("move", () => {
		let p = new Position(42, 69);
		p.move(v);
		expect(p.x).toBe(142);
		expect(p.y).toBe(169);
	});

	test("moveBy", () => {
		let p = new Position(42, 69);
		p.moveBy(100, 100);
		expect(p.x).toBe(142);
		expect(p.y).toBe(169);
	});
	test("move negative", () => {
		let p = new Position(42, 69);
		p.moveNegative(v);
		expect(p.x).toBe(-58);
		expect(p.y).toBe(-31);
	});
});

describe("Transformations", () => {
	test("clamp", () => {
		let p = new Position(42, 69);
		p.clamp(10, 20, 70, 80);
		expect(p.x).toBe(20);
		expect(p.y).toBe(70);

		p.clamp(50, 70, 20, 23);
		expect(p.x).toBe(50);
		expect(p.y).toBe(23);
	});

	test("clamp x", () => {
		let p = new Position(42, 69);
		p.clampX(10, 20);
		expect(p.x).toBe(20);
		p.clampX(50, 70);
		expect(p.x).toBe(50);
	});
	test("clamp y", () => {
		let p = new Position(42, 69);
		p.clampY(70, 80);
		expect(p.y).toBe(70);
		p.clampY(20, 23);
		expect(p.y).toBe(23);
	});

	test("wrap", () => {
		let p = new Position(42, 69);
		p.wrap(10, 20, 70, 80);
		expect(p.x).toBe(12);
		expect(p.y).toBe(79);

		p.wrap(50, 70, 20, 57);
		expect(p.x).toBe(52);
		expect(p.y).toBe(42);
	});

	test("wrap x", () => {
		let p = new Position(42, 69);
		p.wrapX(10, 20);
		expect(p.x).toBe(12);

		p.wrapX(50, 70);
		expect(p.x).toBe(52);
	});
	test("wrap y", () => {
		let p = new Position(42, 69);
		p.wrapY(70, 80);
		expect(p.y).toBe(79);

		p.wrapY(20, 57);
		expect(p.y).toBe(42);
	});
});

describe("Relations", () => {
	let p = new Position(50, 50);
	test("angle with", () => {
		let p2 = new Position(100, 0);
		expect(p.angleWith(p2)).toBeCloseTo(Math.atan2(p2.y - p.y, p2.x - p.y), 4);
		p2.moveTo(100, 100);
		expect(p.angleWith(p2)).toBeCloseTo(Math.atan2(p2.y - p.y, p2.x - p.y), 4);
		p2.moveTo(0, 100);
		expect(p.angleWith(p2)).toBeCloseTo(Math.atan2(p2.y - p.y, p2.x - p.y), 4);
		p2.moveTo(-100, 100);
		expect(p.angleWith(p2)).toBeCloseTo(Math.atan2(p2.y - p.y, p2.x - p.y), 2);
		p2.moveTo(-100, 0);
		expect(p.angleWith(p2)).toBeCloseTo(Math.atan2(p2.y - p.y, p2.x - p.y), 2);
		p2.moveTo(-100, -100);
		expect(p.angleWith(p2)).toBeCloseTo(Math.atan2(p2.y - p.y, p2.x - p.y), 4);
		p2.moveTo(0, -100);
		expect(p.angleWith(p2)).toBeCloseTo(Math.atan2(p2.y - p.y, p2.x - p.y), 2);
		p2.moveTo(100, -100);
		expect(p.angleWith(p2)).toBeCloseTo(Math.atan2(p2.y - p.y, p2.x - p.y), 2);
	});

	test("vector to", () => {
		let p2 = new Position(100, 0);
		let v = p.vectorTo(p2);
		expect(v.x).toBe(50);
		expect(v.y).toBe(-50);

		p2.moveTo(100, 100);
		v = p.vectorTo(p2);
		expect(v.x).toBe(50);
		expect(v.y).toBe(50);

		p2.moveTo(0, 100);
		v = p.vectorTo(p2);
		expect(v.x).toBe(-50);
		expect(v.y).toBe(50);

		p2.moveTo(-100, 100);
		v = p.vectorTo(p2);
		expect(v.x).toBe(-150);
		expect(v.y).toBe(50);

		p2.moveTo(-100, 0);
		v = p.vectorTo(p2);
		expect(v.x).toBe(-150);
		expect(v.y).toBe(-50);

		p2.moveTo(-100, -100);
		v = p.vectorTo(p2);
		expect(v.x).toBe(-150);
		expect(v.y).toBe(-150);

		p2.moveTo(0, -100);
		v = p.vectorTo(p2);
		expect(v.x).toBe(-50);
		expect(v.y).toBe(-150);

		p2.moveTo(100, -100);
		v = p.vectorTo(p2);
		expect(v.x).toBe(50);
		expect(v.y).toBe(-150);
	});

	test("direction", () => {
		let p2 = new Position(100, 0);
		let d = p.directionTo(p2);
		let v = p.vectorTo(p2).normalize();
		expect(d.equals(v)).toBeTruthy();

		p2.moveTo(100, 100);
		d = p.directionTo(p2);
		v = p.vectorTo(p2).normalize();
		expect(d.equals(v)).toBeTruthy();

		p2.moveTo(0, 100);
		d = p.directionTo(p2);
		v = p.vectorTo(p2).normalize();
		expect(d.equals(v)).toBeTruthy();

		p2.moveTo(-100, 100);
		d = p.directionTo(p2);
		v = p.vectorTo(p2).normalize();
		expect(d.equals(v)).toBeTruthy();

		p2.moveTo(-100, 0);
		d = p.directionTo(p2);
		v = p.vectorTo(p2).normalize();
		expect(d.equals(v)).toBeTruthy();

		p2.moveTo(-100, -100);
		d = p.directionTo(p2);
		v = p.vectorTo(p2).normalize();
		expect(d.equals(v)).toBeTruthy();

		p2.moveTo(0, -100);
		d = p.directionTo(p2);
		v = p.vectorTo(p2).normalize();
		expect(d.equals(v)).toBeTruthy();

		p2.moveTo(100, -100);
		d = p.directionTo(p2);
		v = p.vectorTo(p2).normalize();
		expect(d.equals(v)).toBeTruthy();
	});
	test("distance to", () => {
		let p2 = new Position(100, 0);
		expect(p.distanceTo(p2)).toBeCloseTo(p.vectorTo(p2).length(), 4);

		p2.moveTo(100, 100);
		expect(p.distanceTo(p2)).toBeCloseTo(p.vectorTo(p2).length(), 4);

		p2.moveTo(0, 100);
		expect(p.distanceTo(p2)).toBeCloseTo(p.vectorTo(p2).length(), 4);

		p2.moveTo(-100, 100);
		expect(p.distanceTo(p2)).toBeCloseTo(p.vectorTo(p2).length(), 4);

		p2.moveTo(-100, 0);
		expect(p.distanceTo(p2)).toBeCloseTo(p.vectorTo(p2).length(), 4);

		p2.moveTo(-100, -100);
		expect(p.distanceTo(p2)).toBeCloseTo(p.vectorTo(p2).length(), 4);

		p2.moveTo(0, -100);
		expect(p.distanceTo(p2)).toBeCloseTo(p.vectorTo(p2).length(), 4);

		p2.moveTo(100, -100);
		expect(p.distanceTo(p2)).toBeCloseTo(p.vectorTo(p2).length(), 4);
	});

	test("distance square to", () => {
		let p2 = new Position(100, 0);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(100, 100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(0, 100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(-100, 100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(-100, 0);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(-100, -100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(0, -100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(100, -100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);
	});

	test("distance square to", () => {
		let p2 = new Position(100, 0);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(100, 100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(0, 100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(-100, 100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(-100, 0);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(-100, -100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(0, -100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);

		p2.moveTo(100, -100);
		expect(p.distanceSqTo(p2)).toBeCloseTo(p.vectorTo(p2).lengthSq(), 4);
	});
});


