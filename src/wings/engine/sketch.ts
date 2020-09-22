import { Container, Graphics } from "pixi.js";
import Engine, { iEngineOptions } from "./Engine";

export default class Sketch {
	private engine: Engine;
	stage: Container;
	g = new Graphics();
	draw!: (g: Graphics) => void;

	constructor(options?: iEngineOptions) {
		this.engine = new Engine(options);
		this.engine.stage.addChild(this.g);
		this.stage = this.engine.stage;

		this.engine.onUpdate = this.update.bind(this);
	}


	private update() {
		this.g.clear();
		this.g.lineStyle(2, 0x0);
		this.g.beginFill(0xFFFFFF);
		this.draw?.(this.g);
		this.g.endFill();
	}
}
