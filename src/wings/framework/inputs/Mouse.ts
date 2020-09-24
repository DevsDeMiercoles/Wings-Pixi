import { DisplayObject } from "pixi.js";
import Position from '../physics/Position';
import { ControllerCallback, InputEvents } from './Controller';

export class Mouse {
	private callback: ControllerCallback;
	private leftDown = false;
	private rightDown = false;
	position = new Position();

	constructor(interactive: DisplayObject, callback: ControllerCallback) {
		this.callback = callback;

		interactive.interactive = true;
		interactive.on(MouseEvents.MOUSE_DOWN, () => { this.callback(InputEvents.KeyIsDown, MouseKeys.LEFT); this.leftDown = true; });
		interactive.on(MouseEvents.MOUSE_UP, () => { this.callback(InputEvents.KeyUp, MouseKeys.LEFT); this.leftDown = false; });
		interactive.on(MouseEvents.CLICK, () => { this.callback(InputEvents.Click, MouseKeys.LEFT); });
		interactive.on(MouseEvents.RIGHT_DOWN, () => { this.callback(InputEvents.KeyIsDown, MouseKeys.RIGHT); this.rightDown = true; });
		interactive.on(MouseEvents.RIGHT_UP, () => { this.callback(InputEvents.KeyUp, MouseKeys.RIGHT); this.rightDown = false; });
		interactive.on(MouseEvents.RIGHT_CLICK, () => { this.callback(InputEvents.Click, MouseKeys.RIGHT); });
		interactive.on(MouseEvents.POINTER_MOVE, (e) => { this.position.copyFrom(e.data.global); });
	}
	isButtonDown(type: MouseKeys) {
		if (type == MouseKeys.LEFT)
			return this.leftDown;
		else
			return this.rightDown;
	}
}
export enum MouseKeys {
	LEFT = "left_button",
	RIGHT = "right_button",
}
export enum MouseEvents {
	CLICK = "click",
	MOUSE_DOWN = "mousedown",
	MOUSE_UP = "mouseup",
	MOUSE_UP_OUTSIDE = "mouseupoutside",

	RIGHT_CLICK = "rightclick",
	RIGHT_DOWN = "rightdown",
	RIGHT_UP = "rightup",
	RIGHT_UP_OUTSIDE = "rightupoutside",

	MOUSE_MOVE = "mousemove",
	MOUSE_OUT = "mouseout",
	MOUSE_OVER = "mouseover",

	POINTER_CANCEL = "pointercancel",
	POINTER_DOWN = "pointerdown",
	POINTER_MOVE = "pointermove",
	POINTER_OUT = "pointerout",
	POINTER_OVER = "pointerover",
	POINTER_TAP = "pointertap",
	POINTER_UP = "pointerup",
	POINTER_UP_OUTSIDE = "pointerupoutside",

	TAP = "tap",
	TOUCH_CANCEL = "touchcancel",
	TOUCH_END = "touchend",
	TOUCH_END_OUTSIDE = "touchendoutside",
	TOUCH_MOVE = "touchmove",
	TOUCH_START = "touchstart",
}