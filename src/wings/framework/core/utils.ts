export function removeFromArray<T>(arr: T[], value: T): T[] {
	let i = arr.indexOf(value);
	if (i != undefined) arr.splice(i, 1);
	return arr;
}