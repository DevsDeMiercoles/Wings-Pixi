import Loader from './Loader';

export default abstract class AssetLoader {
	protected loader: Loader = new Loader();

	async loadAll() {
		await this.loader.load();
	}
}