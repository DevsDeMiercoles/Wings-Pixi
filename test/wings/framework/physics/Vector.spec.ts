import FastMath from "../../../../src/wings/framework/core/FastMath";
import Position from "../../../../src/wings/framework/physics/Position";
import Vector from '../../../../src/wings/framework/physics/Vector';

let vDefa = new Vector(666, 777);
let pDefa = new Position(42, 69);
describe("Defaults", () => {
	test("Constructor empty", () => {
		let v = new Vector();
		expect(v).toBeDefined();
		expect(v.x).toBe(0);
		expect(v.y).toBe(0);
	});
	test("Constructor x", () => {
		let v = new Vector(42);
		expect(v).toBeDefined();
		expect(v.x).toBe(42);
		expect(v.y).toBe(42);
	});
	test("Constructor x-y", () => {
		let v = new Vector(42, 69);
		expect(v).toBeDefined();
		expect(v.x).toBe(42);
		expect(v.y).toBe(69);
	});
});

describe("Constructions", () => {
	test("clone", () => {
		let v = vDefa.clone();
		expect(v).not.toBe(vDefa);
		expect(v.x).toBe(666);
		expect(v.y).toBe(777);
	});
	test("from position", () => {
		let v = Vector.fromPosition(pDefa);
		expect(v.x).toBe(42);
		expect(v.y).toBe(69);
	});
	test("from polar", () => {
		let v = Vector.fromPolar(FastMath.angle45 / 2 + FastMath.angle45, 66);
		let v2 = new Vector().polar(FastMath.angle45 / 2 + FastMath.angle45, 66);
		expect(v.x).toBe(v2.x);
		expect(v.y).toBe(v2.y);
	});
	test("perpendicular", () => {
		let v = vDefa.getPerpendicular();
		expect(v.x).toBe(-vDefa.y);
		expect(v.y).toBe(vDefa.x);
	});
	test("direction", () => {
		let v = vDefa.getDirection();
		let v2 = vDefa.clone().normalize();
		expect(v.x).toBe(v2.x);
		expect(v.y).toBe(v2.y);
	});
});
describe("Setters", () => {
	test("setter x", () => {
		let v = new Vector();
		v.set(42);
		expect(v.x).toBe(42);
		expect(v.y).toBe(42);
	});
	test("setter x-y", () => {
		let v = new Vector();
		v.set(42, 69);
		expect(v.x).toBe(42);
		expect(v.y).toBe(69);
	});
	test("copy V", () => {
		let v = new Vector();
		v.copy(vDefa);
		expect(v.x).toBe(666);
		expect(v.y).toBe(777);
	});
	test("copy Pos", () => {
		let v = new Vector();
		v.copy(pDefa);
		expect(v.x).toBe(42);
		expect(v.y).toBe(69);
	});
	test("polar", () => {
		let v = new Vector();
		let angle = FastMath.angle45 / 2 + FastMath.angle45;
		let radius = 66;
		v.polar(angle, radius);
		expect(v.x).toBe(radius * FastMath.cos(angle));
		expect(v.y).toBe(radius * FastMath.sin(angle));
	});
	test("x - y", () => {
		let v = new Vector();
		v.x = 75;
		v.y = 82;
		expect(v.x).toBe(75);
		expect(v.y).toBe(82);
	});
});

describe("Queries", () => {
	test("string", () => {
		expect(vDefa.toString()).toBe("(666,777)");
	});

	test("equals", () => {
		let p = new Vector(42, 69);
		expect(p.equals(vDefa)).toBeFalsy();
		p.copy(vDefa);
		expect(p).not.toBe(vDefa);
		expect(p.equals(vDefa)).toBeTruthy();
	});
	test("precise Angle", () => {
		expect(vDefa.preciseAngle()).toBe(Math.atan2(vDefa.y, vDefa.x));
	});

	test("angle", () => {
		expect(vDefa.preciseAngle()).toBeCloseTo(Math.atan2(vDefa.y, vDefa.x), 4);
	});
	test("length", () => {
		expect(vDefa.length()).toBeCloseTo(Math.sqrt(vDefa.x ** 2 + vDefa.y ** 2), 4);
	});
	test("length sq", () => {
		expect(vDefa.lengthSq()).toBeCloseTo(vDefa.x ** 2 + vDefa.y ** 2, 4);
	});
	test("is unit", () => {
		let v = new Vector();
		expect(v.isUnit()).toBeFalsy();
		v.x = 1;
		expect(v.isUnit()).toBeTruthy();
		v.y = 1;
		expect(v.isUnit()).toBeFalsy();
		v.x = 0;
		expect(v.isUnit()).toBeTruthy();
	});

	test("is zero", () => {
		let v = new Vector();
		expect(v.isZero()).toBeTruthy();
		v.x = 1;
		expect(v.isZero()).toBeFalsy();
		v.y = 1;
		expect(v.isZero()).toBeFalsy();
		v.x = 0;
		expect(v.isZero()).toBeFalsy();
		v.y = 0;
		expect(v.isZero()).toBeTruthy();
	});
});

describe("Operators", () => {
	test("multiply", () => {
		let v = new Vector(42, 69);
		v.multiply(3);
		expect(v.x).toBe(42 * 3);
		expect(v.y).toBe(69 * 3);
	});

	test("divide", () => {
		let v = new Vector(42, 69);
		v.divide(3);
		expect(v.x).toBe(42 / 3);
		expect(v.y).toBe(69 / 3);
	});
	test("add", () => {
		let v = new Vector(42, 69);
		v.add(vDefa);
		expect(v.x).toBe(42 + vDefa.x);
		expect(v.y).toBe(69 + vDefa.y);
	});

	test("substract", () => {
		let v = new Vector(42, 69);
		v.subtract(vDefa);
		expect(v.x).toBe(42 - vDefa.x);
		expect(v.y).toBe(69 - vDefa.y);
	});
	test("reverse", () => {
		let v = new Vector(42, 69);
		let angle = v.angle();
		v.reverse();
		expect(v.x).toBe(-42);
		expect(v.y).toBe(-69);
		expect(v.angle()).toBeCloseTo(FastMath.normalizeAngle(angle + FastMath.angle180));
	});

	test("reverse x", () => {
		let v = new Vector(42, 69);
		let angle = v.angle();
		v.reverseX();
		expect(v.x).toBe(-42);
		expect(v.y).toBe(69);
		expect(v.angle()).toBeCloseTo(FastMath.angle180 - angle);
	});
	test("reverse y", () => {
		let v = new Vector(42, 69);
		let angle = v.angle();
		v.reverseY();
		expect(v.x).toBe(42);
		expect(v.y).toBe(-69);
		expect(v.angle()).toBe(-angle);
	});
});

describe("Transformations", () => {
	test("normalize", () => {
		let v = new Vector(42, 69);
		let n = 13.57;
		let factor = n / v.length();
		v.normalize(n);
		expect(v.x).toBe(42 * factor);
		expect(v.y).toBe(69 * factor);
		expect(v.length()).toBe(n);
		expect(v.lengthSq()).toBeCloseTo(n ** 2, 6);
	});
	test("normalize a zero vector", () => {
		let v = new Vector();
		v.normalize();
		expect(v.x).toBe(0);
		expect(v.y).toBe(0);
		expect(v.length()).toBe(0);
	});
	test("normalize defa", () => {
		let v = new Vector(42, 69);
		let factor = 1 / v.length();
		v.normalize();
		expect(v.x).toBe(42 * factor);
		expect(v.y).toBe(69 * factor);
		expect(v.length()).toBe(1);
		expect(v.lengthSq()).toBe(1);
	});

	test("limit to", () => {
		let v = new Vector(42, 69);
		let n = 2000;
		let length = v.length();
		v.limitTo(n);
		expect(v.x).toBe(42);
		expect(v.y).toBe(69);
		expect(v.length()).toBe(length);

		n = 10;
		let factor = n / length;
		v.limitTo(n);
		expect(v.length()).toBe(n);
		expect(v.x).toBe(42 * factor);
		expect(v.y).toBe(69 * factor);
	});
	test("rotate to", () => {
		let v = new Vector(42, 69);
		let length = v.length();

		v.rotateTo(FastMath.angle360 - FastMath.angle45);
		expect(v.angle()).toBe(FastMath.angle360 - FastMath.angle45);
		expect(v.length()).toBe(length);
	});

	test("rotate by", () => {
		let v = new Vector(42, 69);
		let angle = v.angle();
		let length = v.length();

		v.rotateBy(FastMath.angle45 / 2);
		expect(v.angle()).toBe(angle + FastMath.angle45 / 2);
		expect(v.length()).toBe(length);
	});

});

describe("Relations", () => {
	let v = new Vector(50, 50);
	let dataAllDirections: Array<Array<number>> = [[0, 0], [0, 100], [0, -100], [100, 0], [100, 100], [100, -100], [-100, 0], [-100, 100], [-100, -100]];

	test.each(dataAllDirections)("angleBetween", (x, y) => {
		let v2 = new Vector(x, y);
		expect(v.angleBetween(v2)).toBeCloseTo(v2.preciseAngle() - v.preciseAngle(), 4);
	});

	let d2 = dot(v, v);
	test.each(dataAllDirections)("proyect into", (x: number, y: number) => {
		let v2 = new Vector(x, y);
		let d = dot(v2, v) / d2;
		let proyection = v2.proyectInto(v);
		expect(proyection.x).toBeCloseTo(v.x * d);
		expect(proyection.y).toBeCloseTo(v.y * d);
	});

	test("is on line", () => {
		let v2 = new Vector();
		expect(v2.isOnLine(v)).toBeFalsy();
		v2.x = 1;
		expect(v2.isOnLine(v)).toBeFalsy();
		v2.y = 1;
		expect(v2.isOnLine(v)).toBeTruthy();
		v2.x = -1;
		expect(v2.isOnLine(v)).toBeFalsy();
		v2.y = -1;
		expect(v2.isOnLine(v)).toBeTruthy();
	});

	test("has same direction", () => {
		let v2 = new Vector();
		expect(v2.hasSameDirection(v)).toBeFalsy();
		v2.x = 1;
		expect(v2.hasSameDirection(v)).toBeFalsy();
		v2.y = 1;
		expect(v2.hasSameDirection(v)).toBeTruthy();
		v2.x = 0;
		expect(v2.hasSameDirection(v)).toBeFalsy();
		v2.y = 0;
		expect(v2.hasSameDirection(v)).toBeFalsy();
		v2.x = -1;
		expect(v2.hasSameDirection(v)).toBeFalsy();
		v2.y = -1;
		expect(v2.hasSameDirection(v)).toBeFalsy();
		v2.x = 0;
		expect(v2.hasSameDirection(v)).toBeFalsy();
	});
	test("has opposite direction", () => {
		let v2 = new Vector();
		expect(v2.hasOppositeDirection(v)).toBeFalsy();
		v2.x = 1;
		expect(v2.hasOppositeDirection(v)).toBeFalsy();
		v2.y = 1;
		expect(v2.hasOppositeDirection(v)).toBeFalsy();
		v2.x = 0;
		expect(v2.hasOppositeDirection(v)).toBeFalsy();
		v2.y = 0;
		expect(v2.hasOppositeDirection(v)).toBeFalsy();
		v2.x = -1;
		expect(v2.hasOppositeDirection(v)).toBeFalsy();
		v2.y = -1;
		expect(v2.hasOppositeDirection(v)).toBeTruthy();
		v2.x = 0;
		expect(v2.hasOppositeDirection(v)).toBeFalsy();
	});
	test.each(dataAllDirections)("is perpendicular", (x, y) => {
		let v2 = new Vector(x, y);
		expect(v2.isPerpendicular(v)).toBe(dot(v2, v) == 0);
	});
});

function dot(v1: Vector, v2: Vector): number {
	return v1.x * v2.x + v1.y * v2.y;
}