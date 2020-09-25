import { Container } from "pixi.js";
import notifications from '../../framework/Events';
import Position from '../../framework/physics/Position';
import { normalNotifications } from '../Engine';

export default abstract class WorldObject {
	protected sprite: Container;

	pos: Position;

	constructor(sprite: Container, x = 0, y?: number) {
		this.pos = new Position(x, y ?? x);
		this.sprite = sprite;
		this.sprite.position.copyFrom(this.pos);

		notifications.dispatchNotification(normalNotifications.addToStage, this.sprite);
		notifications.dispatchNotification(normalNotifications.updateMe, this);
	}

	update(): void {
		this.sprite.position.copyFrom(this.pos);
	}
}