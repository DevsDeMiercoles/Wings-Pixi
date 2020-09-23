import { Container, DisplayObject, Renderer, RenderTexture, Sprite } from "pixi.js";

export default class SpriteMemory extends Container {
	private rt: RenderTexture;
	private background: Sprite;
	private renderer: Renderer;


	constructor(renderer: Renderer) {
		super();
		this.renderer = renderer;

		this.rt = RenderTexture.create({ width: renderer.view.width, height: renderer.view.height, resolution: 2 });
		this.background = new Sprite(this.rt);

		this.addChild(this.background);
	}


	remember(image: DisplayObject) {
		this.renderer.render(image, this.rt, false);
	}
}