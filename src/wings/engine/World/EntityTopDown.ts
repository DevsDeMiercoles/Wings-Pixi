import FastMath from '../../framework/core/FastMath';
import Entity from './Entity';

export default abstract class EntityTopDown extends Entity {
	protected lookFoward = true;
	protected speedLimit = 5;

	protected runPhysics(): void {
		super.runPhysics();

		if (this.speedLimit > 0) this.speed.limitMagnitude(this.speedLimit);
		if (this.lookFoward) this.sprite.angle = this.speed.angle() * FastMath.toDegrees + 90;
	}
}