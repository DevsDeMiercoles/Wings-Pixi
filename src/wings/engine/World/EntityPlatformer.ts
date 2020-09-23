import { Container } from 'pixi.js';
import Vector from '../../framework/physics/Vector';
import Entity from './Entity';

export default abstract class EntityPlatformer extends Entity {
	protected movementSpeedLimit = 5;
	protected fallingSpeedLimit = 10;

	constructor(sprite: Container, x = 0, y?: number) {
		super(sprite, x, y);
	}

	applyGravity(gravity: Vector): void {
		this.acc.add(gravity.clone().divide(100));
	}

	protected runPhysics(): void {
		super.runPhysics();

		this.speed.limitAxis(this.movementSpeedLimit, this.fallingSpeedLimit);
	}
}