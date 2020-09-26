import LinkedList from "../../framework/core/collections/LinkedList";
import notifications from "../../framework/Events";
import Position from "../../framework/physics/Position";
import { normalNotifications } from "../Engine";
import WorldObject from "./entities/WorldObject";

let things = new LinkedList<WorldObject>();

notifications.addNotificationListener(normalNotifications.addToWorld, (thing: WorldObject) => things.addLast(thing));
notifications.addNotificationListener(normalNotifications.removeFromWorld, (thing: WorldObject) => things.remove(thing));

class WorldFilter<T extends WorldObject> {
	data: Array<T>;

	constructor(data: Array<T>) {
		this.data = data;
	}

	//TODO fusionar filtros y aplicarlos todos juntos al final, 1 solo recorrido
	byType(type: string): WorldFilter<T> {
		this.data = this.data.filter((wo) => { return wo.type == type; });
		return this;
	}
	byClass<Z extends WorldObject>(clazz: Class<Z>): WorldFilter<Z> {
		this.data = this.data.filter((wo) => { return wo.constructor == clazz; });
		return this as unknown as WorldFilter<Z>;
	}

	insideOfRange(pos: Position, range: number): WorldFilter<T> {
		let sqDistance = range ** 2;
		this.data = this.data.filter((wo) => { return pos.distanceSqTo(wo.pos) <= sqDistance; });
		return this;
	}
	omit(...toAvoid: WorldObject[]) {
		this.data = this.data.filter((wo) => { return !toAvoid.includes(wo); });
		return this;
	}
}


let world = {
	getAll(): Array<WorldObject> {
		return [...things];
	},
	getClass<T extends WorldObject>(clazz: Class<T>): Array<T> {
		let arr = new Array<T>();
		for (const wo of things) {
			if (wo.constructor == clazz)
				arr.push(wo as T);
		}
		return arr;
	},
	get filter() {
		return new WorldFilter([...things]);
	}
};
export { world };


type Class<T> = { new(...args: any[]): T; };