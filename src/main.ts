import startBunny from "./demo/bunny";
import startPerlinNoise from "./demo/perlinNoise1D";

(window as any).entradas = {
	perlin: startPerlinNoise,
	bunny: startBunny,
	default: startPerlinNoise
};;