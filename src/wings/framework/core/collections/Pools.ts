import { Pool, Pooleable } from './Pool';

let typePools = new Map();

let Pools = {
	getPool<T extends Pooleable>(type: new () => T): Pool<T> {
		if (!typePools.has(type)) {
			this.setPool(type, new Pool(type));
		}
		return typePools.get(type);
	},

	setPool<T extends Pooleable>(type: new () => T, pool: Pool<T>): void {
		typePools.set(type, pool);
	},

	obtain<T extends Pooleable>(type: new () => T): T {
		return this.getPool(type).obtain();
	},

	free<T extends Pooleable>(...objects: T[]): void {
		for (const obj of objects) {
			this.getPool(obj.constructor as new () => T).free(obj);
		}
	}
};



export default Pools;