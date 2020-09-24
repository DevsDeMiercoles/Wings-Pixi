import { DisplayObject } from "pixi.js";
import Position from '../physics/Position';
import { Keyboard, KeysCode } from './Keyboard';
import { Mouse, MouseKeys } from "./Mouse";

/* Enums */
export enum InputEvents {
	KeyDown, KeyIsDown, KeyUp, WheelMove, Click
}
export type ControllerCallback = (type: InputEvents, data: string) => void;

export default class Controller {

	private actionsMap = new Map<string, Map<InputEvents, string>>();
	private actionsQueue = new Array<string>();
	private keyboard: Keyboard;
	private mouse: Mouse | undefined;

	constructor(interaction?: DisplayObject) {
		this.keyboard = new Keyboard(this.newKeyAction.bind(this));
		if (interaction)
			this.mouse = new Mouse(interaction, this.newKeyAction.bind(this));
	}

	private newKeyAction(type: InputEvents, key: string) {
		if (!this.actionsMap.has(key))
			return;

		let inputMap = this.actionsMap.get(key)!;
		if (inputMap.has(type))
			this.actionsQueue.push(inputMap.get(type)!);
	}

	consumeActions(): Array<string> {
		let actionsOcurred = [...this.actionsQueue];

		for (let key of this.keyboard.pressedKeys) {
			if (this.actionsMap.get(key)?.has(InputEvents.KeyIsDown))
				actionsOcurred.push(this.actionsMap.get(key)?.get(InputEvents.KeyIsDown)!);
		}
		if (this.mouse?.isButtonDown(MouseKeys.LEFT) && this.actionsMap.get(MouseKeys.LEFT)?.has(InputEvents.KeyIsDown))
			actionsOcurred.push(this.actionsMap.get(MouseKeys.LEFT)?.get(InputEvents.KeyIsDown)!);
		if (this.mouse?.isButtonDown(MouseKeys.RIGHT) && this.actionsMap.get(MouseKeys.RIGHT)?.has(InputEvents.KeyIsDown))
			actionsOcurred.push(this.actionsMap.get(MouseKeys.RIGHT)?.get(InputEvents.KeyIsDown)!);

		this.actionsQueue.length = 0;

		return actionsOcurred;
	}

	addAction(action: string, key: KeysCode | MouseKeys, event: InputEvents): void {
		if (!this.actionsMap.has(key))
			this.actionsMap.set(key, new Map());

		let inputMap = this.actionsMap.get(key)!;
		if (inputMap.has(event)) console.debug("Controller", `An action is being overwriten: ${inputMap.get(event)} -> ${action}`);
		inputMap.set(event, action);
	}

	removeAction(key: KeysCode, event: InputEvents): void {
		if (this.actionsMap.has(key)) {
			let inputMap = this.actionsMap.get(key)!;
			if (inputMap.has(event))
				inputMap.delete(event);

			if (inputMap.size == 0)
				this.actionsMap.delete(key);
		}
	}

	isKeyDown(key: KeysCode | MouseKeys): boolean {
		if (key == MouseKeys.LEFT || key == MouseKeys.RIGHT)
			return this.mouse?.isButtonDown(key) ?? false;
		else
			return this.keyboard.isKeyDown(key);

	}
	get mousePos(): Position {
		return this.mouse?.position ?? new Position();
	}
}

