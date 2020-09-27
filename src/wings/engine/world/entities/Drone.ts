import { Graphics } from "pixi.js";
import FastMath from "../../../framework/core/FastMath";
import Position from "../../../framework/physics/Position";
import Vector from "../../../framework/physics/Vector";
import Entity from "./Entity";
import EntityTopDown from "./EntityTopDown";
import WorldObject from "./WorldObject";

export default class Drone extends EntityTopDown {
	private maxForce = 0.5;
	private desire = new Vector();

	constructor(sprite: Graphics, x = 0, y?: number) {
		super(sprite, x, y);
		this.type = "Drone";
	}
	getAlignmentDesire(targets: Entity[]): Vector | null {
		// Average speeds


		if (targets.length) {
			let desire = new Vector();

			for (let target of targets) {
				desire.add(target.speed);
			}

			desire.divide(targets.length).limitMagnitude(this.speedLimit);

			return desire;
		}
		else
			return null;
	}

	getCohesionDesire(targets: WorldObject[]): Vector | null {
		if (targets.length) {
			let sum = new Position();
			for (let other of targets) {
				sum.x += other.pos.x;
				sum.y += other.pos.y;
			}
			sum.x /= targets.length;
			sum.y /= targets.length;

			return this.getSeekingDesire(sum);
		} else
			return null;

	}
	getSeparationDesire(targets: WorldObject[]): Vector | null {
		if (targets.length) {
			let desire = new Vector();
			for (let other of targets) {
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



		var steering = desire.clone().subtract(this.speed);
		steering.multiply(weight);
		this.desire.add(steering);
	}
	runPhysics() {
		this.applyForce(this.desire.limitMagnitude(this.maxForce));
		this.desire.multiply(0);
		super.runPhysics();
	}
	private canSee(target: Position, visionRange: number): boolean {
		return this.pos.distanceSqTo(target) <= visionRange ** 2;
	}
}