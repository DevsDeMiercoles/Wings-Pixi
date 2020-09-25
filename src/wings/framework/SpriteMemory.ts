import { Container, DisplayObject, Renderer, RenderTexture, Sprite } from "pixi.js";

export default class SpriteMemory extends Container {
	private rt: RenderTexture;
	private rt2: RenderTexture;
	private background: Sprite;
	private renderer: Renderer;


	constructor(renderer: Renderer) {
		super();
		this.renderer = renderer;

		this.rt = RenderTexture.create({ width: renderer.view.width, height: renderer.view.height, resolution: 2 });
		this.rt2 = RenderTexture.create({ width: renderer.view.width, height: renderer.view.height, resolution: 2 });
		this.background = new Sprite(this.rt);

		this.addChild(this.background);
	}


	remember(image: DisplayObject) {
		this.renderer.render(image, this.rt, false);
	}
	shortTermMemory(sprite: Container, fade = 0.5) {
		let alpha = this.background.alpha;
		this.background.alpha = fade;

		this.renderer.render(this.background, this.rt2);
		this.renderer;

		this.background.alpha = alpha;

		this.exchangeTextures();
		this.remember(sprite);
	}
	private exchangeTextures() {
		let temp = this.rt;
		this.rt = this.rt2;
		this.rt2 = temp;
		this.background.texture = this.rt;
	}
}