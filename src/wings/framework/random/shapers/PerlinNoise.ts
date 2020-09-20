import FastMath from "../../core/FastMath";
import iRandomGenerator from "../generators/iRandomGenerator";


let PERLIN_YWRAPB = 4;
let PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
let PERLIN_ZWRAPB = 8;
let PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
let PERLIN_SIZE = 4095;
let perlin_octaves = 4; // default to medium smooth
let perlin_amp_falloff = 0.5; // 50% reduction/octave

export default class PerlinNoise {
	private perlin: Float32Array;
	generator: iRandomGenerator;

	constructor(randomGenerator: iRandomGenerator) {
		this.generator = randomGenerator;
		this.perlin = new Float32Array(PERLIN_SIZE + 1);
		for (let i = 0; i < PERLIN_SIZE + 1; i++) {
			this.perlin[i] = this.generator.random();
		}
	}

	noise(x: number, y: number = 0, z: number = 0): number {
		x = FastMath.abs(x);
		y = FastMath.abs(y);
		z = FastMath.abs(z);

		let xi = Math.floor(x);
		let yi = Math.floor(y);
		let zi = Math.floor(z);

		let xf = x - xi;
		let yf = y - yi;
		let zf = z - zi;
		let rxf, ryf;

		let r = 0.0;
		let ampl = 0.5;

		let n1, n2, n3;

		for (let o = 0; o < perlin_octaves; o++) {
			let of1 = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

			rxf = this.scaledCosine(xf);
			ryf = this.scaledCosine(yf);

			n1 = this.perlin[of1 & PERLIN_SIZE];
			n1 += rxf * (this.perlin[(of1 + 1) & PERLIN_SIZE] - n1);
			n2 = this.perlin[(of1 + PERLIN_YWRAP) & PERLIN_SIZE];
			n2 += rxf * (this.perlin[(of1 + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
			n1 += ryf * (n2 - n1);

			of1 += PERLIN_ZWRAP;
			n2 = this.perlin[of1 & PERLIN_SIZE];
			n2 += rxf * (this.perlin[(of1 + 1) & PERLIN_SIZE] - n2);
			n3 = this.perlin[(of1 + PERLIN_YWRAP) & PERLIN_SIZE];
			n3 += rxf * (this.perlin[(of1 + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
			n2 += ryf * (n3 - n2);

			n1 += this.scaledCosine(zf) * (n2 - n1);

			r += n1 * ampl;
			ampl *= perlin_amp_falloff;
			xi <<= 1;
			xf *= 2;
			yi <<= 1;
			yf *= 2;
			zi <<= 1;
			zf *= 2;

			if (xf >= 1.0) {
				xi++;
				xf--;
			}
			if (yf >= 1.0) {
				yi++;
				yf--;
			}
			if (zf >= 1.0) {
				zi++;
				zf--;
			}
		}
		return r;
	}

	scaledCosine(i: number): number {
		return 0.5 * (1.0 - FastMath.cos(i * FastMath.PI));
	}
}