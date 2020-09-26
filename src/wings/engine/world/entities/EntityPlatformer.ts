import Vector from "../../../framework/physics/Vector";
import Entity from './Entity';

export default class EntityPlatformer extends Entity {
	movementSpeedLimit = 5;
	fallingSpeedLimit = 10;


	applyGravity(gravity: Vector): void {
		this.acc.add(gravity.clone().divide(100));
	}

	protected runPhysics(): void {
		super.runPhysics();

		this.speed.limitAxis(this.movementSpeedLimit, this.fallingSpeedLimit);
	}
}