import { Container } from "pixi.js";
import Vector from "../../framework/physics/Vector";
import WorldObjectDynamic from './WorldObjectDynamic';

export default abstract class Entity extends WorldObjectDynamic {
	protected speed = new Vector();
	protected acc = new Vector();
	mass = 1;

	constructor(sprite: Container, x = 0, y?: number) {
		super(sprite, x, y);
	}

	update(): void {
		this.think();
		this.runPhysics();
		super.update();
	}

	protected think(): void { }

	protected runPhysics(): void {
		this.speed.add(this.acc);
		this.pos.move(this.speed);

		this.acc.multiply(0);
	}


	applyForce(force: Vector) {
		this.acc.add(force.clone().divide(this.mass));
	}

}