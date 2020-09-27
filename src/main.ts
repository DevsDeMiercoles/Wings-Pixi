import startBunny from "./demo/bunny";
import startDrag from './demo/drag';
import startFlock from "./demo/flock";
import startFlowField from "./demo/flowfield";
import startForces from "./demo/forces";
import startFriction from './demo/friction';
import startGravitational from './demo/gravitational';
import startMapQuery from "./demo/mapquery";
import startMass from "./demo/mass";
import startPathFollow from "./demo/pathFollow";
import startPerlinNoise1D from "./demo/perlinNoise1D";
import startPerlinNoise2D from "./demo/perlinNoise2D";
import startWalker from "./demo/randomWalker";
import startSeeking from "./demo/seeking";
import startDefault from "./demo/test";

document.oncontextmenu = function (e) { e.preventDefault(); };

(window as any).entradas = {
	perlin1D: startPerlinNoise1D,
	perlin2D: startPerlinNoise2D,
	bunny: startBunny,
	randomWalker: startWalker,
	forces: startForces,
	mass: startMass,
	drag: startDrag,
	friction: startFriction,
	gravitational: startGravitational,
	seek: startSeeking,
	flowField: startFlowField,
	mapQuery: startMapQuery,
	pathFollow: startPathFollow,
	flock: startFlock,
	default: startDefault
};;