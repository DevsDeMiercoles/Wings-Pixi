import startBunny from "./demo/bunny";
import startDrag from './demo/drag';
import startForces from "./demo/forces";
import startFriction from './demo/friction';
import startGravitational from './demo/gravitational';
import startMass from "./demo/mass";
import startPerlinNoise1D from "./demo/perlinNoise1D";
import startPerlinNoise2D from "./demo/perlinNoise2D";
import startWalker from "./demo/randomWalker";
import startSeeking from "./demo/seeking";
import test from "./demo/test";

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
	default: test
};;