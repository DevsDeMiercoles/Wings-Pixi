export default interface iRandomGenerator {
	random(): number;
	setSeed(seed: number): void;
	getSeed(): number;
}