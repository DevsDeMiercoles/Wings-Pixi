import FastMath from "../core/FastMath";
import Vector from "./Vector";

export default class Position {
	x: number;
	y: number;

	constructor(x?: number, y?: number) {
		this.x = x ?? 0;
		this.y = y ?? x ?? 0;
	}

	clone(): Position {
		return new Position(this.x, this.y);
	}

	/* Setters */
	set(x: number, y?: number): Position {
		this.x = x;
		this.y = y ?? x;

		return this;
	}

	copyFrom(p: Coordinates): Position {
		this.x = p.x;
		this.y = p.y;

		return this;
	}
	copyTo(p: Coordinates): Position {
		p.x = this.x;
		p.y = this.y;

		return this;
	}

	/* Evaluators */
	toString(): string {
		return `(${this.x.toFixed()},${this.y.toFixed()})`;
	}

	equals(p: Coordinates): boolean {
		return p != null && FastMath.equals(this.x, p.x) && FastMath.equals(this.y, p.y);
	}

	/* Operators */
	move(distance: Vector): Position {
		this.x += distance.x;
		this.y += distance.y;

		return this;
	}

	moveTo(x: number, y?: number): Position {
		this.x = x;
		this.y = y ?? x;

		return this;
	}

	moveBy(x: number, y: number): Position {
		this.x += x;
		this.y += y;

		return this;
	}

	moveNegative(v: Vector): Position {
		this.x -= v.x;
		this.y -= v.y;

		return this;
	}

	/* Transformations */
	clamp(minX: number, maxX: number, minY: number, maxY: number): Position {
		this.x = FastMath.clamp(this.x, minX, maxX);
		this.y = FastMath.clamp(this.y, minY, maxY);
		return this;
	}

	clampX(min: number, max: number): Position {
		this.x = FastMath.clamp(this.x, min, max);
		return this;
	}

	clampY(min: number, max: number): Position {
		this.y = FastMath.clamp(this.y, min, max);
		return this;
	}

	wrap(minX: number, maxX: number, minY: number, maxY: number): Position {
		this.x = FastMath.wrap(this.x, minX, maxX);
		this.y = FastMath.wrap(this.y, minY, maxY);
		return this;
	}

	wrapX(min: number, max: number): Position {
		this.x = FastMath.wrap(this.x, min, max);
		return this;
	}

	wrapY(min: number, max: number): Position {
		this.y = FastMath.wrap(this.y, min, max);
		return this;
	}

	/* Relations */
	angleWith(target: Coordinates): number {
		return FastMath.atan2(target.y - this.y, target.x - this.x);
	}

	vectorTo(target: Coordinates): Vector {
		return new Vector(target.x - this.x, target.y - this.y);
	}

	directionTo(target: Coordinates): Vector {
		return new Vector(target.x - this.x, target.y - this.y).normalize();
	}

	distanceTo(target: Coordinates): number {
		return (Math.sqrt((target.x - this.x) * (target.x - this.x) + (target.y - this.y) * (target.y - this.y)));
	}

	distanceSqTo(target: Coordinates): number {
		return (target.x - this.x) * (target.x - this.x) + (target.y - this.y) * (target.y - this.y);
	}

}

export interface Coordinates {
	x: number;
	y: number;
}