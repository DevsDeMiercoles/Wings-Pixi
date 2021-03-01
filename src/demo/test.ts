import Engine from '../wings/engine/Engine';
import random from '../wings/framework/random/Random';

let width = 640;
let height = 640;
let engine: Engine;


export default function startDefault() {
	engine = new Engine({ width, height });

	random.randomizeSeed();




	engine.onUpdate = () => {
	};

}