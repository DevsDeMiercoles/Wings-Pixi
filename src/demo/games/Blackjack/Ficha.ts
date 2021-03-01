import { Sprite } from 'pixi.js';
import { normalNotifications } from '../../../wings/engine/Engine';
import notifications from '../../../wings/framework/Events';
import { MouseEvents } from '../../../wings/framework/inputs/Mouse';
import Assets from "./Assets";
export default class Ficha {
	image!: Sprite;
	value: number;

	constructor(value: number) {
		switch (value) {
			case 5:
				this.image = Sprite.from(Assets.chip5);
				break;
			case 10:
				this.image = Sprite.from(Assets.chip10);
				break;
			case 25:
				this.image = Sprite.from(Assets.chip25);
				break;
			case 50:
				this.image = Sprite.from(Assets.chip50);
				break;
			case 100:
				this.image = Sprite.from(Assets.chip100);
				break;
		}
		this.value = value;

		this.image.interactive = true;
		this.image.on(MouseEvents.CLICK, () => { notifications.dispatchNotification("Apuesta", this.value); });
		notifications.dispatchNotification(normalNotifications.addToStage, this.image);
	}


	calcularVisibilidad(money: number) {
		this.image.visible = money >= this.value;
	}
}