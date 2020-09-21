import { Texture } from 'pixi.js';
import AssetLoader from './wings/framework/loading/AssetLoader';

let urls = {
	bunny: "img/bunny.png"
};

export default class Assets extends AssetLoader {
	bunny!: Texture;

	constructor() {
		super();
		this.loader.addAndRecover(urls.bunny, (t) => this.bunny = t.texture);
	}
}
