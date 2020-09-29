import random from "../random/Random";

export function arrayRemove<T>(arr: T[], value: T): T[] {
	let i = arr.indexOf(value);
	if (i != undefined) arr.splice(i, 1);
	return arr;
}
export function arrayRandom<T>(arr: T[]): T {
	return arr[Math.floor(random.getUpTo(arr.length))];
}

export type Class<T> = { new(...args: any[]): T; };