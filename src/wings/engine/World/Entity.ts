import { Container } from "pixi.js";
import notifications from "../../framework/Events";
import Position from "../../framework/physics/Position";
import Vector from "../../framework/physics/Vector";
import { normalNotifications } from "../Engine";

export default abstract class Entity {
	protected sprite: Container;
	protected speed = new Vector();
	protected acc = new Vector();
	protected mass = 1;

	pos: Position;

	constructor(sprite: Container, x = 0, y?: number) {
		this.pos = new Position(x, y ?? x);
		this.sprite = sprite;
		this.sprite.position.copyFrom(this.pos);

		notifications.dispatchNotification(normalNotifications.addToStage, this.sprite);
		notifications.dispatchNotification(normalNotifications.updateMe, this);
	}

	update(): void {
		this.think();
		this.runPhysics();
		this.sprite.position.copyFrom(this.pos);
		this.process();
	}

	protected think(): void { }

	protected runPhysics(): void {
		this.speed.add(this.acc);
		this.pos.move(this.speed);

		this.acc.multiply(0);
	}

	protected process(): void { }

	applyForce(force: Vector) {
		this.acc.add(force.clone().divide(this.mass));
	}

}