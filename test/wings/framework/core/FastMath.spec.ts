import FastMath from '../../../../src/wings/framework/core/FastMath';

describe('Constants', () => {
	test("PI should be standard", () => {
		expect(FastMath.equals(FastMath.PI, Math.PI)).toBeTruthy();
	});
	let PiCases: Array<Array<number>> = [[FastMath.PI_2, Math.PI / 2], [FastMath.PI_4, Math.PI / 4], [FastMath.PI_DOUBLE, Math.PI * 2]];
	test.each(PiCases)("PI derivates", (x, y) => {
		expect(FastMath.equals(x, y)).toBeTruthy();
	});
	let anglesData: Array<Array<number>> = [[FastMath.angle45, Math.PI / 4], [FastMath.angle90, Math.PI / 2], [FastMath.angle180, Math.PI], [FastMath.angle360, Math.PI * 2]];
	test.each(anglesData)("Angle of %p", (x, y) => {
		expect(FastMath.equals(x, y)).toBeTruthy();
	});

});
describe('Comparators', () => {
	test("Float compare should be reliable", () => {
		expect(FastMath.equals(FastMath.PI, 4)).toBeFalsy();
		expect(FastMath.equals(FastMath.PI, 3.14)).toBeFalsy();
		expect(FastMath.equals(FastMath.PI, 3.14159)).toBeFalsy();
		expect(FastMath.equals(FastMath.PI, 3.141592)).toBeTruthy();
		expect(FastMath.equals(FastMath.PI, 3.141593)).toBeTruthy();
		expect(FastMath.equals(FastMath.PI, 3.1415937)).toBeFalsy();
		expect(FastMath.equals(FastMath.PI, 3.1415917)).toBeTruthy();
		expect(FastMath.equals(FastMath.PI, 3.1415916)).toBeFalsy();
	});
	test("Zero", () => {
		expect(FastMath.isZero(1)).toBeFalsy();
		expect(FastMath.isZero(0.1)).toBeFalsy();
		expect(FastMath.isZero(0.0001)).toBeFalsy();
		expect(FastMath.isZero(0.000001)).toBeFalsy();
		expect(FastMath.isZero(0.0000001)).toBeTruthy();
		expect(FastMath.isZero(0.00000005)).toBeTruthy();
		expect(FastMath.isZero(0.00000015)).toBeTruthy();
	});
});
describe('Angle functions', () => {
	let atan2Data: Array<number> = [1, 164968494, 164.564849849, 0.564849849, 0.0564849849];
	test.each(atan2Data)("Atan2 for %p", (n) => {
		function compare(x: number, y: number) {
			let n1 = FastMath.atan2(y, x);
			let n2 = Math.atan2(y, x);
			// console.info(`Original ${n1} - ${n2}`);
			expect(FastMath.equals(n1, n2, 0.00001)).toBeTruthy();
		};

		compare(0, 0);
		compare(0, n);
		compare(n, 0);
		compare(n, n);
		compare(0, -n);
		compare(-n, 0);
		compare(n, -n);
		compare(-n, n);
		compare(-n, -n);
	});
	let fullAnglesData: Array<number> = [];
	for (let i = 0; i < 16; i++) {
		fullAnglesData.push(FastMath.angle45 * i);
	}
	test.each(fullAnglesData)("Sin for %p", (x) => {
		expect(FastMath.equals(FastMath.sin(x), Math.sin(x), 0.001)).toBeTruthy();
	});

	test.each(fullAnglesData)("Cos for %p", (x) => {
		expect(FastMath.equals(FastMath.cos(x), Math.cos(x), 0.001)).toBeTruthy();
	});

	test.each(fullAnglesData)("Normalization of angle: %p", (x) => {
		expect(FastMath.normalizeAngle(x) * FastMath.toDegrees).toBeCloseTo(FastMath.wrap(x, -FastMath.PI, FastMath.PI) * FastMath.toDegrees, 4);
		expect(FastMath.normalizeAngle(-x) * FastMath.toDegrees).toBeCloseTo(FastMath.wrap(-x, -FastMath.PI, FastMath.PI) * FastMath.toDegrees, 4);
	});
});

describe('Limits', () => {
	let absData: Array<Array<number>> = [[0.347876, 0.347876], [-0.347876, 0.347876], [11, 11], [-11, 11]];
	test.each(absData)("Absolute values of %p = %p", (x, y) => {
		expect(FastMath.abs(x)).toBe(y);
	});

	let moduleData: Array<Array<number>> = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 0], [6, 1], [7, 2], [5.1, 0.1], [5.5, 0.5], [9.2, 4.2], [-1, 4], [-2, 3], [-3, 2], [-4, 1], [-5, 0], [-5.5, 4.5], [-0.5, 4.5], [-4.5, 0.5], [-6.5, 3.5]];
	test.each(moduleData)("Real module of 5: %p = %p", (x, y) => {
		expect(FastMath.realModule(x, 5)).toBeCloseTo(y, 4);
	});
	let limitData: Array<Array<number>> = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 5], [7, 5], [5.1, 5], [5.5, 5], [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-5.5, -5.5], [-0.5, -0.5], [-4.5, -4.5], [-6.5, -6.5]];
	test.each(limitData)("Limit of 5: %p = %p", (x, y) => {
		expect(FastMath.limit(x, 5)).toBeCloseTo(y, 4);
	});
	let lowerLimitData: Array<Array<number>> = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [5.1, 5.1], [5.5, 5.5], [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-5.5, -5], [-0.5, -0.5], [-4.5, -4.5], [-6.5, -5]];
	test.each(lowerLimitData)("Lower Limit of -5: %p = %p", (x, y) => {
		expect(FastMath.lowerLimit(x, -5)).toBeCloseTo(y, 4);
	});
	let clampData: Array<Array<number>> = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 5], [7, 5], [5.1, 5], [5.5, 5], [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-5.5, -5], [-0.5, -0.5], [-4.5, -4.5], [-6.5, -5]];
	test.each(clampData)("Clamp between -5 to 5: %p = %p", (x, y) => {
		expect(FastMath.clamp(x, -5, 5)).toBeCloseTo(y, 4);
	});
	let wrapData: Array<Array<number>> = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, -5], [6, -4], [7, -3], [5.1, -4.9], [5.5, -4.5], [9.2, -0.8], [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-5.5, 4.5], [-6.5, 3.5], [-5.1, 4.9], [-5.9, 4.1]];
	test.each(wrapData)("Wrap data between -5 to 5: %p = %p", (x, y) => {
		expect(FastMath.wrap(x, -5, 5)).toBeCloseTo(y, 4);
	});
});


describe('Mapping', () => {
	let lerpData: Array<Array<number>> = [];
	let n = 100;
	for (let i = 0; i < n; i++) {
		let x = i / n;
		let y = i / n * 10 - 5;
		lerpData.push([x, y]);
	}
	test.each(lerpData)("Lerp data between -5 to 5: %p = %p", (x, y) => {
		expect(FastMath.lerp(x, -5, 5)).toBeCloseTo(y, 4);
	});

	test.each(lerpData)("Normalizing data for -5 to 5: %p = %p", (y, x) => { //Inverted lerp data  x -> y  /  y -> x
		expect(FastMath.normalize(x, -5, 5)).toBeCloseTo(y, 4);
	});

	let mapData: Array<Array<number>> = [];
	for (let i = 0; i < n; i++) {
		let x = i / n * 10 - 5;
		let y = i / n * 9 + 1;
		mapData.push([x, y]);
	}
	test.each(mapData)("Normalizing from -5/5 to 1-10: %p = %p", (x, y) => {
		expect(FastMath.map(x, -5, 5, 1, 10)).toBeCloseTo(y, 4);
	});
});
