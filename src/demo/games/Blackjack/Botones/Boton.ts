import { Text } from "pixi.js";
import notifications from '../../../../wings/framework/Events';
import { MouseEvents } from "../../../../wings/framework/inputs/Mouse";

export default class Boton {
	text: Text;

	constructor(text: string) {
		this.text = new Text(text);
		this.text.interactive = true;
		this.text.on(MouseEvents.CLICK, () => notifications.dispatchNotification("DASd"));
	}
}