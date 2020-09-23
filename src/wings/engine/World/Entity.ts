import { Container } from "pixi.js";
import notifications from "../../framework/Events";
import Position from "../../framework/physics/Position";
import Vector from "../../framework/physics/Vector";
import { normalNotifications } from "../Engine";

export default abstract class Entity {
	protected sprite: Container;

	protected pos: Position;
	protected speed = new Vector();
	protected acc = new Vector();
	protected speedLimit = 5;

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
		this.acc.add(force);
	}

	protected reboundScreen(width: number, height: number) {
		this.rebound(0, width, 0, height);
	}
	protected rebound(minX: number, maxX: number, minY: number, maxY: number) {
		this.reboundX(minX, maxX);
		this.reboundY(minY, maxY);
	}
	protected reboundX(minX: number, maxX: number) {
		if (this.pos.x < minX || this.pos.x > maxX) {
			this.speed.reverseX();
			this.pos.x += this.speed.x;
		}
	}
	protected reboundY(minY: number, maxY: number) {
		if (this.pos.y < minY || this.pos.y > maxY) {
			this.speed.reverseY();
			this.pos.y += this.speed.y;
		}
	}
}