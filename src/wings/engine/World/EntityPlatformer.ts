import Vector from '../../framework/physics/Vector';
import Entity from './Entity';

export default abstract class EntityPlatformer extends Entity {
	protected fallingSpeedLimit = 10;
	protected mass: number = 1;

	applyGravity(gravity: Vector): void {
		this.acc.add(gravity);
	}
	applyForce(force: Vector): void {
		this.acc.add(force.clone().divide(this.mass));
	}

	protected runPhysics(): void {
		super.runPhysics();


		this.speed.limitAxis(this.speedLimit, this.fallingSpeedLimit);
	}
}