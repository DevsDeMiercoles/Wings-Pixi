import DNA from "./DNA";

export default interface Creature<T> {
	dna: DNA<T>;
	fitness: number;
}