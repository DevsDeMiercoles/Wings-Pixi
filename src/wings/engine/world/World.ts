import LinkedList from "../../framework/core/collections/LinkedList";
import notifications from "../../framework/Events";
import Position from "../../framework/physics/Position";
import { normalNotifications } from "../Engine";
import WorldObject from "./entities/WorldObject";
import Map from "./Map";

class World {
	private map!: Map;
	private things = new LinkedList<WorldObject>();

	constructor() {
		notifications.addNotificationListener(normalNotifications.addToWorld, (thing: WorldObject) => {
			this.things.addLast(thing);
			if (this.map)
				this.map.add(thing);
		});
		notifications.addNotificationListener(normalNotifications.removeFromWorld, (thing: WorldObject) => {
			this.things.remove(thing);
			if (this.map)
				this.map.remove(thing);
		});
	}
	getAll(): Array<WorldObject> {
		return [...this.things];
	}
	get filter() {
		return new WorldFilter([...this.things]);
	}
	mapFilter(pos: Position, range?: number) {
		if (range == undefined)
			return new WorldFilter([...this.map.getCellAtPos(pos)]);
		else
			return new WorldFilter([...this.map.getCellsInArea(pos, range)]).insideOfRange(pos, range);
	}
	createMap(cellSize: number, cellsAmount: { x: number, y: number; }) {
		this.map = new Map(cellSize, cellsAmount);
	}
	get filters() {
		return filters;
	}
}

class WorldFilter<T extends WorldObject> {
	private data: Array<T>;
	private filters = new Array<Filter>();

	constructor(data: Array<T>) {
		this.data = data;
	}

	//TODO fusionar filtros y aplicarlos todos juntos al final, 1 solo recorrido
	byType(type: string): WorldFilter<T> {
		this.filters.push(filters.typeFilter(type));
		return this;
	}
	byClass<Z extends WorldObject>(clazz: Class<Z>): WorldFilter<Z> {
		this.filters.push(filters.classFilter(clazz));
		return this as unknown as WorldFilter<Z>;
	}

	insideOfRange(pos: Position, range: number): WorldFilter<T> {
		this.filters.push(filters.insideOfRange(pos, range));
		return this;
	}
	omit(...toAvoid: WorldObject[]) {
		this.filters.push(filters.omit(...toAvoid));
		return this;
	}
	filter(): Array<T> {
		this.data = this.data.filter(this.applyAllFilters.bind(this));
		this.filters.length = 0;

		return this.data;
	}
	private applyAllFilters(wo: WorldObject): boolean {
		for (const filter of this.filters) {
			if (filter(wo) == false)
				return false;
		}
		return true;
	}
}

type Filter = (wo: WorldObject) => boolean;
let filters = {
	classFilter<T extends WorldObject>(clazz: Class<T>): Filter {
		return (wo: WorldObject): boolean => { return wo.constructor == clazz; };
	},
	typeFilter(type: string): Filter {
		return (wo: WorldObject): boolean => { return wo.type == type; };
	},
	insideOfRange(pos: Position, range: number): Filter {
		let sqDistance = range ** 2;
		return (wo: WorldObject): boolean => { return pos.distanceSqTo(wo.pos) <= sqDistance; };
	},
	omit(...toAvoid: WorldObject[]): Filter {
		return (wo: WorldObject): boolean => { return !toAvoid.includes(wo); };
	}
};

let world = new World();
export { world };


type Class<T> = { new(...args: any[]): T; };