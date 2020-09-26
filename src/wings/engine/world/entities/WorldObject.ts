import { Container } from "pixi.js";
import notifications from '../../../framework/Events';
import Position from '../../../framework/physics/Position';
import { normalNotifications } from '../../Engine';

export default class WorldObject {
	protected sprite: Container;
	type = "World Object";

	pos: Position;

	constructor(sprite: Container, x = 0, y?: number) {
		this.pos = new Position(x, y ?? x);
		this.sprite = sprite;
		this.sprite.position.copyFrom(this.pos);
		if ("anchor" in sprite) {
			(sprite as any).anchor.set(0.5, 0.5);
		}

		notifications.dispatchNotification(normalNotifications.addToWorld, this);
		notifications.dispatchNotification(normalNotifications.addToStage, this.sprite);
		notifications.dispatchNotification(normalNotifications.updateMe, this);
	}

	protected update(): void {
		this.sprite.position.copyFrom(this.pos);
	}
}