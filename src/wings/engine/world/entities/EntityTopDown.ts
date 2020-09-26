import FastMath from "../../../framework/core/FastMath";
import Entity from './Entity';

export default class EntityTopDown extends Entity {
	lookFoward = true;
	speedLimit = 5;

	protected runPhysics(): void {
		if (this.speedLimit > 0) {
			this.speed.add(this.acc).limitMagnitude(this.speedLimit);
			this.pos.move(this.speed);
			this.acc.multiply(0);
		}
		else
			super.runPhysics();

		if (this.lookFoward) this.sprite.angle = this.speed.angle * FastMath.toDegrees + 90;
	}
}