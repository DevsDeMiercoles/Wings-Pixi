import { Graphics } from "pixi.js";
import FastMath from "../../../framework/core/FastMath";
import Position from "../../../framework/physics/Position";
import Vector from "../../../framework/physics/Vector";
import { world } from "../World";
import EntityTopDown from "./EntityTopDown";

export default class Drone extends EntityTopDown {
	private maxForce = 0.5;

	constructor(sprite: Graphics, x = 0, y?: number) {
		super(sprite, x, y);
		this.type = "Drone";
	}
	getAlignmentDesire(visionRange: number): Vector {
		// Average speeds
		let others = world.filter.byClass(Drone).insideOfRange(this.pos, visionRange).omit(this).data;

		let desire = new Vector();
		for (let other of others) {
			desire.add(other.speed);
		}

		if (others.length)
			desire.divide(others.length).limitMagnitude(this.speedLimit);

		return desire;
	}
	getCohesionDesire(visionRange: number): Vector {
		let others = world.filter.byClass(Drone).omit(this).insideOfRange(this.pos, visionRange).data;

		let sum = new Position();
		for (let other of others) {
			sum.x += other.pos.x;
			sum.y += other.pos.y;
		}

		if (others.length) {
			sum.x /= others.length;
			sum.y /= others.length;
			return this.getSeekingDesire(sum, visionRange);
		} else {
			return new Vector();
		}
	}
	getSeparationDesire(separationRange: number): Vector {
		// Separate speed
		let others = world.filter.byClass(Drone).omit(this).insideOfRange(this.pos, separationRange).data;

		let desire = new Vector();
		for (let other of others) {
			desire.subtract(this.pos.directionTo(other.pos)); //FIXME
		}

		desire.normalize(this.speedLimit);

		return desire;
	}
	getSeekingDesire(target: Position, visionRange?: number, comfortZone?: number): Vector {
		let desire = new Vector();

		if (visionRange == undefined || this.canSee(target, visionRange)) {
			desire = this.pos.vectorTo(target);
			let zone = comfortZone ?? visionRange ?? 1;

			let speed = FastMath.map(desire.magnitude, 0, zone, 0, this.speedLimit);
			desire.normalize(speed);
		}

		return desire;
	}

	getFleeingDesire(target: Position, visionRange: number): Vector {
		var desire = new Vector();

		if (this.canSee(target, visionRange))
			desire = this.pos.vectorTo(target).reverse().divide(visionRange).multiply(this.speedLimit);


		return desire;
	}
	applyDesire(desire: Vector, weight = 1.0) {
		if (desire.isZero())
			return;

		var steering = desire.subtract(this.speed);
		steering.limitMagnitude(this.maxForce * weight);
		this.applyForce(steering);
	}

	private canSee(target: Position, visionRange: number): boolean {
		return this.pos.distanceSqTo(target) <= visionRange ** 2;
	}


}