
import { Texture } from "pixi.js";
import AssetLoader from '../../../wings/framework/loading/AssetLoader';
import { Palos as Palo } from "./Card";



let urls = {
	cartas: "img/cartas/card",
	cartaReverso: "Back.png",
	fichas: "img/fichas/chip"
};

export default class Assets extends AssetLoader {
	static cartaReverso: Texture;
	static cartas = new Map<Palo, Array<Texture>>();
	static chip5: Texture;
	static chip10: Texture;
	static chip25: Texture;
	static chip50: Texture;
	static chip100: Texture;

	constructor() {
		super();

		this.loader.addAndRecover(urls.cartas + urls.cartaReverso, (t) => Assets.cartaReverso = t.texture);
		this.cargarPalo(Palo.treboles);
		this.cargarPalo(Palo.corazones);
		this.cargarPalo(Palo.diamantes);
		this.cargarPalo(Palo.picas);

		this.loader.addAndRecover(urls.fichas + 5 + ".png", (t) => Assets.chip5 = t.texture);
		this.loader.addAndRecover(urls.fichas + 10 + ".png", (t) => Assets.chip10 = t.texture);
		this.loader.addAndRecover(urls.fichas + 25 + ".png", (t) => Assets.chip25 = t.texture);
		this.loader.addAndRecover(urls.fichas + 50 + ".png", (t) => Assets.chip50 = t.texture);
		this.loader.addAndRecover(urls.fichas + 100 + ".png", (t) => Assets.chip100 = t.texture);
	}

	private cargarPalo(palo: Palo) {
		Assets.cartas.set(palo, new Array<Texture>());
		for (let i = 1; i <= 13; i++) {
			this.loader.addAndRecover(urls.cartas + palo + i + ".png", (t) => Assets.cartas.get(palo)?.push(t.texture));
		}
	}
}
