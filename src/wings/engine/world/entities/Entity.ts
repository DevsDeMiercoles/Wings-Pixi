import Vector from "../../../framework/physics/Vector";
import WorldObjectDynamic from './WorldObjectDynamic';

export default class Entity extends WorldObjectDynamic {
	acc = new Vector();
	speed = new Vector();
	mass = 1;

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