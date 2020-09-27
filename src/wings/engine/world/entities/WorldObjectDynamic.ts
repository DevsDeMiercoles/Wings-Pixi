import WorldObject from "./WorldObject";

export default class WorldObjectDynamic extends WorldObject {

	update(): void {
		super.update();
		this.process();
	}

	protected process(): void { }
}