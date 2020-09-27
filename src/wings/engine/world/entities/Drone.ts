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
	getAlignmentDesire(visionRange: number): Vector | null {
		// Average speeds
		let others = world.filter.byClass(Drone).insideOfRange(this.pos, visionRange).omit(this).filter();

		if (others.length) {
			let desire = new Vector();

			for (let other of others) {
				desire.add(other.speed);
			}

			desire.divide(others.length).limitMagnitude(this.speedLimit);

			return desire;
		}
		else
			return null;
	}
	getCohesionDesire(visionRange: number): Vector | null {
		let others = world.filter.byClass(Drone).omit(this).insideOfRange(this.pos, visionRange).filter();


		if (others.length) {
			let sum = new Position();
			for (let other of others) {
				sum.x += other.pos.x;
				sum.y += other.pos.y;
			}
			sum.x /= others.length;
			sum.y /= others.length;

			return this.getSeekingDesire(sum, visionRange);
		} else
			return null;

	}
	getSeparationDesire(separationRange: number): Vector | null {
		// Separate speed
		let others = world.mapFilter(this.pos, separationRange).byClass(Drone).omit(this).filter();

		if (others.length) {
			let desire = new Vector();
			for (let other of others) {
				desire.subtract(this.pos.vectorTo(other.pos));
			}
			desire.normalize(this.speedLimit);

			return desire;
		}
		else
			return null;
	}
	getSeekingDesire(target: Position, visionRange?: number, comfortZone?: number): Vector | null {
		if (visionRange == undefined || this.canSee(target, visionRange)) {
			let desire = new Vector();
			desire = this.pos.vectorTo(target);
			let zone = comfortZone ?? visionRange ?? 1;

			let speed = FastMath.map(desire.magnitude, 0, zone, 0, this.speedLimit);
			desire.normalize(speed);
			return desire;
		} else
			return null;
	}

	getFleeingDesire(target: Position, visionRange: number): Vector | null {
		if (this.canSee(target, visionRange))
			return this.pos.vectorTo(target).reverse().divide(visionRange).multiply(this.speedLimit);
		else
			return null;
	}
	applyDesire(desire: Vector | null, weight = 1.0) {
		if (desire == null)
			return;

		desire = desire.clone();

		var steering = desire.subtract(this.speed);
		steering.limitMagnitude(this.maxForce * weight);
		this.applyForce(steering);
	}
	private canSee(target: Position, visionRange: number): boolean {
		return this.pos.distanceSqTo(target) <= visionRange ** 2;
	}
}