import startGenetics from './demo/ai/genetics/genetics';
import startPathFollow from "./demo/ai/pathFollow";
import startFlock from "./demo/ai/stearing beheaviour/flock";
import startFlowField from "./demo/ai/stearing beheaviour/flowfield";
import startSeeking from "./demo/ai/stearing beheaviour/seeking";
import startSudoku from "./demo/ai/sudoku/sudoku";
import startBunny from "./demo/bunny";
import startFractal from "./demo/fractal";
import startBlackjack from "./demo/games/Blackjack/Blackjack";
import startConnectFour from "./demo/games/cuatro en linea/ConnectFour";
import startSnake from "./demo/games/snake/Snake";
import startMapQuery from "./demo/mapquery";
import startDrag from './demo/physics/drag';
import startForces from "./demo/physics/forces";
import startFriction from './demo/physics/friction';
import startGravitational from './demo/physics/gravitational';
import startMass from "./demo/physics/mass";
import startPerlinNoise1D from "./demo/random/perlinNoise1D";
import startPerlinNoise2D from "./demo/random/perlinNoise2D";
import startWalker from "./demo/random/randomWalker";
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
	fractal: startFractal,
	genetics: startGenetics,
	sudoku: startSudoku,
	blackjack: startBlackjack,
	cuatroEnLinea: startConnectFour,
	snake: startSnake,
	default: startDefault
};