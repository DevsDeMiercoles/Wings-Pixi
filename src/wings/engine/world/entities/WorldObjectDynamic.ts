import { Container } from "pixi.js";
import WorldObject from "./WorldObject";

export default class WorldObjectDynamic extends WorldObject {
	constructor(sprite: Container, x = 0, y?: number) {
		super(sprite, x, y);
	}

	update(): void {
		super.update();
		this.process();
	}

	protected process(): void { }
}