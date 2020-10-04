let PI3_4 = 3.0 * 3.141592653589793238 / 4;

let PI = 3.141592653589793238;
let PI_DOUBLE = PI * 2;
let PI_2 = PI / 2;
let PI_4 = PI / 4;
let angle45 = PI_4;
let angle90 = PI_2;
let angle180 = PI;
let angle270 = PI + angle90;
let angle360 = PI_DOUBLE;
let toDegrees = 180 / PI;
let toRadian = PI / 180;

let FastMath = {
	PI,
	PI_DOUBLE,
	PI_2,
	PI_4,
	angle45,
	angle90,
	angle180,
	angle270,
	angle360,
	toDegrees,
	toRadian,
	numberTolerance: 0.000001,
	abs(v: number): number {
		return v > 0 ? v : -v;
	},
	atan2(y: number, x: number): number {
		let r;
		let angle;
		let abs_y = this.abs(y);
		if (x < 0.0) {
			r = (x + abs_y) / (abs_y - x);
			angle = PI3_4;
		} else {
			r = (x - abs_y) / (x + abs_y);
			angle = this.PI_4;
		}
		if (Number.isNaN(r))
			return 0;

		angle += (0.1963 * r * r - 0.9817) * r;

		return y < 0 ? -angle : angle;
	},

	sin(x: number) {
		x = this.normalizeAngle(x);

		let sin;
		if (x < 0)
			sin = 1.27323954 * x + 0.405284735 * x * x;
		else
			sin = 1.27323954 * x - 0.405284735 * x * x;

		if (sin < 0)
			sin = 0.225 * (sin * -sin - sin) + sin;
		else
			sin = 0.225 * (sin * sin - sin) + sin;

		return sin;
	},

	cos(x: number) {
		return this.sin(x + this.PI_2);
	},


	/**
	 * Use to compare two s without caring about  point inaccuracy.
	 * 
	 * Tolerance of how much inaccuracy is acceptable can be set in sRange
	 */
	equals(n1: number, n2: number, tolerance?: number) {
		tolerance = tolerance ?? this.numberTolerance;
		return n1 < n2 + tolerance && n1 > n2 - tolerance;
	},

	/**
	 * Use to compare a  with zero, without caring about  point inaccuracy.
	 * 
	 * Tolerance of how much inaccuracy is acceptable can be set in sRange
	 */
	isZero(x: number) {
		return x < 0 + this.numberTolerance && x > 0 - this.numberTolerance;
	},

	/**
	 * Returns the sign of the value
	 */
	sign(x: number) {
		return x < 0 ? -1 : 1;
	},

	/**
	 * Fix the module giving negative numbers
	 */
	realModule(value: number, mod: number) {
		let m = value % mod;
		if (m < 0)
			m += mod;

		return m;
	},


	limit(x: number, max: number) {
		return x > max ? max : x;
	},

	lowerLimit(x: number, min: number) {
		return x < min ? min : x;
	},

	clamp(x: number, min: number, max: number) {
		return x < min ? min : (x > max ? max : x);
	},

	normalizeAngle(angle: number) {
		let range = angle360;

		while (angle <= -angle180)
			angle += range;
		while (angle >= angle180)
			angle -= range;

		return angle;
	},

	/**
	 * When value touches max, it starts at min again When value touches min, it starts at max again
	 */
	wrap(value: number, min: number, max: number) {
		let range = max - min;

		while (value <= min)
			value += range;
		while (value >= max)
			value -= range;

		return value;
	},

	/**
	 * Lerp transforms a [0, 1] range to [starts, ends]
	 * 
	 * Is the inverse of Normalize
	 */
	lerp(rate: number, starts: number, ends: number) {
		return starts + (ends - starts) * rate;
	},

	/**
	 * Normalize transforms a value inside of the range [starts, ends] into a percent [0, 1]
	 * 
	 * Is the inverse of Lerp
	 */
	normalize(value: number, starts: number, ends: number) {
		return (value - starts) / (ends - starts);
	},


	/**
	 * Map transforms a [min, maa] range to [starts, ends]
	 * Clamps to min to max
	 */
	map(rate: number, min: number, max: number, starts: number, ends: number) {
		return this.lerp((this.clamp(rate, min, max) - min) / (max - min), starts, ends);
	},

	/**
	 * Transforms a (min, maa) range to [starts, ends]
	 * Can overflow
	 */
	transform(rate: number, min: number, max: number, starts: number, ends: number) {
		return this.lerp((rate - min) / (max - min), starts, ends);
	}
};

export default FastMath;