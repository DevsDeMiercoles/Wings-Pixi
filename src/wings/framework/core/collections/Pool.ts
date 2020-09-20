
export interface Pooleable {
	reset(): void;
}

export class Pool<T extends Pooleable> {
	private peak = 0;
	private freeObjects: Array<T> = [];
	private clazz: { new(): T; };


	constructor(clazz: { new(): T; }, initialAmount = 16) {
		this.clazz = clazz;
		for (let i = 0; i < initialAmount; i++) {
			this.freeObjects.push(new clazz());
		}
	}

	obtain() {
		return this.freeObjects.pop() ?? new this.clazz();
	}

	free(...objects: T[]) {
		for (const obj of objects) {
			this.freeObjects.push(obj);
			this.reset(obj);
		}
		this.peak = Math.max(this.peak, this.freeObjects.length);
	}

	clear() {
		this.freeObjects.length = 0;
	}

	private reset(object: Pooleable) {
		object.reset();
	}
}
