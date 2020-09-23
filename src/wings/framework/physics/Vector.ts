import FastMath from "../core/FastMath";
import { Coordinates } from "./Position";

export default class Vector {
	private _x: number;
	private _y: number;

	private _mag: number = 0;
	private _angle: number = 0;
	private dirtySqr = true;
	private dirtyAngle = true;

	/* Creators */
	constructor(x?: number, y?: number) {
		this._x = x ?? 0;
		this._y = y ?? x ?? 0;
	}

	static fromPosition(p: Coordinates): Vector {
		return new Vector().copy(p);
	}

	static fromPolar(angle: number, radius: number): Vector {
		return new Vector().polar(angle, radius);
	}

	clone(): Vector {
		let v = new Vector(this._x, this._y);
		v._angle = this._angle;
		v._mag = this._mag;
		v.dirtyAngle = this.dirtyAngle;
		v.dirtySqr = this.dirtySqr;

		return v;
	}

	getPerpendicular(): Vector {
		return new Vector(-this._y, this._x);
	}

	getDirection(): Vector {
		return this.clone().normalize();
	}

	/* Setters */
	set(x: number, y?: number): Vector {
		this._x = x;
		this._y = y ?? x;

		this.dirtySqr = this.dirtyAngle = true;

		return this;
	}

	copy(p: Coordinates | Vector): Vector {
		this._x = p.x;
		this._y = p.y;

		if (p instanceof Vector) {
			this._angle = p._angle;
			this._mag = p._mag;
			this.dirtyAngle = p.dirtyAngle;
			this.dirtySqr = p.dirtySqr;
		}
		else
			this.dirtySqr = this.dirtyAngle = true;

		return this;
	}

	polar(angle: number, radius: number): Vector {
		this._x = radius * FastMath.cos(angle);
		this._y = radius * FastMath.sin(angle);

		this._angle = angle;
		this._mag = radius;
		this.dirtySqr = this.dirtyAngle = false;

		return this;
	}

	set x(value: number) {
		this._x = value;
		this.dirtySqr = this.dirtyAngle = true;
	}

	set y(value: number) {
		this._y = value;
		this.dirtySqr = this.dirtyAngle = true;
	}

	/* Queries */
	get x(): number {
		return this._x;
	}

	get y(): number {
		return this._y;
	}

	toString(): string {
		return "(" + this._x + "," + this._y + ")";
	}

	equals(v: Vector): boolean {
		return v != null && FastMath.equals(this._x, v._x) && FastMath.equals(this._y, v._y);
	}

	magnitude(): number {
		if (this.dirtySqr) {
			this._mag = Math.sqrt(this._x ** 2 + this._y ** 2);
			this.dirtySqr = false;
		}

		return this._mag;
	}

	magnitudeSq(): number {
		return this._x ** 2 + this._y ** 2;
	}

	angle(): number {
		if (this.dirtyAngle) {
			this._angle = FastMath.atan2(this._y, this._x);
			this.dirtyAngle = false;
		}

		return this._angle;
	}

	preciseAngle(): number {
		if (this.dirtyAngle) {
			this._angle = Math.atan2(this._y, this._x);
			this.dirtyAngle = false;
		}

		return this._angle;
	}

	isUnit(): boolean {
		return FastMath.equals(this.magnitudeSq(), 1);
	}

	isZero(): boolean {
		return FastMath.equals(this.magnitudeSq(), 0);
	}

	/* Operators */
	private dot(v: Vector): number {
		return this._x * v._x + this._y * v._y;
	}

	multiply(s: number): Vector {
		this._x *= s;
		this._y *= s;
		this._mag *= s;

		return this;
	}

	divide(s: number): Vector {
		this._x /= s;
		this._y /= s;
		this._mag /= s;

		return this;
	}

	add(v: Vector): Vector {
		this._x += v.x;
		this._y += v.y;
		this.dirtySqr = this.dirtyAngle = true;

		return this;
	}

	subtract(v: Vector): Vector {
		this._x -= v.x;
		this._y -= v.y;
		this.dirtySqr = this.dirtyAngle = true;

		return this;
	}

	reverse(): Vector {
		this._x *= -1;
		this._y *= -1;

		if (!this.dirtyAngle)
			this._angle = FastMath.normalizeAngle(this._angle + FastMath.angle180);

		return this;
	}

	reverseX(): Vector {
		this._x *= -1;

		if (!this.dirtyAngle)
			this._angle = FastMath.normalizeAngle(FastMath.angle180 - this._angle);

		return this;
	}

	reverseY(): Vector {
		this._y *= -1;
		this._angle *= -1;

		return this;
	}


	/* Transformations */
	normalize(newMag: number = 1): Vector {
		if (this.magnitude() != 0) {
			let factor = newMag / this._mag; // Calculated in if
			this._x *= factor;
			this._y *= factor;

			this._mag = newMag;
			this.dirtySqr = false;
		}

		return this;
	}

	limitMagnitude(maxMag: number): Vector {
		if (this.magnitudeSq() > maxMag * maxMag) {
			this.normalize(maxMag);
		}

		return this;
	}
	limitAxis(limitX: number, limitY: number): Vector {
		let x = this._x;
		if (FastMath.abs(x) > limitX)
			this.x = limitX * (x < 0 ? -1 : 1);

		let y = this._y;
		if (FastMath.abs(y) > limitY)
			y = limitY * (y < 0 ? -1 : 1);

		return this;
	}

	rotateTo(angle: number): Vector {
		return this.polar(angle, this.magnitude());
	}

	rotateBy(angle: number): Vector {
		let cos = Math.cos(angle);
		let sin = Math.sin(angle);
		let dx = this._x;
		let dy = this._y;

		this._x = dx * cos - dy * sin;
		this._y = dx * sin + dy * cos;

		if (!this.dirtyAngle)
			this._angle = FastMath.normalizeAngle(this._angle + angle);

		return this;
	}

	/* Relations */
	angleBetween(v: Vector): number {
		return FastMath.normalizeAngle(v.angle() - this.angle());
	}

	proyectInto(v: Vector): Vector {
		return v.clone().multiply(this.dot(v) / v.dot(v));
	}

	isOnLine(other: Vector): boolean {
		return FastMath.isZero(this._x * other._y - this._y * other._x) && !this.isZero() && !other.isZero();
	}

	hasSameDirection(other: Vector): boolean {
		return this.isOnLine(other) && this.dot(other) > 0;
	}

	hasOppositeDirection(other: Vector): boolean {
		return this.isOnLine(other) && this.dot(other) < 0;
	}

	isPerpendicular(vector: Vector): boolean {
		return FastMath.isZero(this.dot(vector));
	}

}
