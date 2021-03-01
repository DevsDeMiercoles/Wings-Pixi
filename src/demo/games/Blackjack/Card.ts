import { Sprite } from "pixi.js";

export default class Card {
	image!: Sprite;

	// constructor(palo: Palos, valor: number) {
	// }
}

export enum Palos {
	treboles = "Clubs",
	picas = "Spades",
	corazones = "Hearts",
	diamantes = "Diamonds"
}