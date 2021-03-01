import Engine from '../../../wings/engine/Engine';
import watcher from '../../../wings/framework/debug';
import random from '../../../wings/framework/random/Random';
import Grid from './grid';

let width = 640;
let height = 640;
let engine: Engine;

export default function startSudoku() {
	engine = new Engine({ width, height });

	random.randomizeSeed();

	let grid = new Grid();
	watcher.watch(grid);


	let totalMs = 0;
	engine.onUpdate = (elapsedMs) => {
		totalMs += elapsedMs;

		if (totalMs >= 100) {
			// totalMs -= 100;

			grid.createNewNumber();
			grid.showRegion();

		}
	};

}
