import ParkerMiller from './src/wings/framework/random/ParkerMiller';
import PerlinNoise from './src/wings/framework/random/PerlinNoise';

let perlin = new PerlinNoise(new ParkerMiller());

console.log(perlin.noise(5));