import * as PIXI from 'pixi.js';

export default class Loader {
	private loader: PIXI.Loader = new PIXI.Loader();


	add(url: string, name?: string): Loader {
		if (name)
			this.loader.add(name, url);
		else
			this.loader.add(url);

		return this;
	}
	addAndRecover(url: string, callback: (x: any) => void): Loader {
		this.loader.add(url, callback);

		return this;
	}
	async load(): Promise<void> {
		let p = new Promise<void>((resolve) => {
			this.loader.load(finishLoading);

			function finishLoading() {
				resolve();
			}
		});

		return p;
	}

	get resources(): PIXI.IResourceDictionary {
		return this.loader.resources;
	}
}