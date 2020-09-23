import LinkedList from "../core/collections/LinkedList";

/* Enums */
enum InputEvents {
	KeyDown, KeyIsDown, KeyUp, WheelMove
}


export default class Controller {
	private actionsMap = new Map<string, Map<InputEvents, string>>();
	private actionsQueue = new Array<string>();

	private pressedKeys = new LinkedList<string>();

	constructor() {
		window.addEventListener("keydown", this.onKeyDown.bind(this));
		window.addEventListener("keyup", this.onKeyUp.bind(this));
	}
	private onKeyDown(event: KeyboardEvent) {
		let key = event.code;
		if (!this.actionsMap.has(key))
			return;

		this.pressedKeys.addLast(key);

		let inputMap = this.actionsMap.get(key)!;
		if (inputMap.has(InputEvents.KeyDown))
			this.actionsQueue.push(inputMap.get(InputEvents.KeyDown)!);
	}
	private onKeyUp(event: KeyboardEvent) {
		let key = event.code;
		if (!this.actionsMap.has(key))
			return;

		this.pressedKeys.remove(key);

		let inputMap = this.actionsMap.get(key)!;
		if (inputMap.has(InputEvents.KeyDown))
			this.actionsQueue.push(inputMap.get(InputEvents.KeyDown)!);
	}

	consumeActions(): Array<string> {
		let actionsOcurred = [...this.actionsQueue];

		for (let key of this.pressedKeys) {
			if (this.actionsMap.get(key)?.has(InputEvents.KeyIsDown))
				actionsOcurred.push(this.actionsMap.get(key)?.get(InputEvents.KeyIsDown)!);
		}
		this.actionsQueue.length = 0;

		return actionsOcurred;
	}

	addAction(action: string, key: KeysCode, event: InputEvents): void {
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

	isKeyDown(key: KeysCode): boolean {
		return this.pressedKeys.includes(key);
	}
}

export enum KeysCode {
	ANY_KEY = "Why not all?",
	UNKNOWN = "I dunno",

	NUM_0 = "Digit0",
	NUM_1 = "Digit1",
	NUM_2 = "Digit2",
	NUM_3 = "Digit3",
	NUM_4 = "Digit4",
	NUM_5 = "Digit5",
	NUM_6 = "Digit6",
	NUM_7 = "Digit7",
	NUM_8 = "Digit8",
	NUM_9 = "Digit9",

	A = "KeyA",
	B = "KeyB",
	C = "KeyC",
	D = "KeyD",
	E = "KeyE",
	F = "KeyF",
	G = "KeyG",
	H = "KeyH",
	I = "KeyI",
	J = "KeyJ",
	K = "KeyK",
	L = "KeyL",
	M = "KeyM",
	N = "KeyN",
	O = "KeyO",
	P = "KeyP",
	Q = "KeyQ",
	R = "KeyR",
	S = "KeyS",
	T = "KeyT",
	U = "KeyU",
	V = "KeyV",
	W = "KeyW",
	X = "KeyX",
	Y = "KeyY",
	Z = "KeyZ",

	F1 = "F1",
	F2 = "F2",
	F3 = "F3",
	F4 = "F4",
	F5 = "F5",
	F6 = "F6",
	F7 = "F7",
	F8 = "F8",
	F9 = "F9",
	F10 = "F10",
	F11 = "F11",
	F12 = "F12",

	BACK_QUOTE = "Backquote",
	BACK_SLASH = "IntlBackslash",
	MINUS = "Minus",
	EQUALS = "Equals",
	BRACKET_OPEN = "BracketLeft",
	BRACKET_CLOSE = "BracketRight",
	QUOTE = "Quote",
	BACKLASH = "Backslash",
	COMMA = "Comma",
	PERIOD = "Period",
	SLASH = "Slash",

	TAB = "Tab",
	SPACE = "Space",
	ENTER = "Enter",
	ESCAPE = "Escape",
	BACKSPACE = "Backspace",

	ALT_LEFT = "AltLeft",
	ALT_RIGHT = "AltRight",
	CONTROL_LEFT = "ControlLeft",
	CONTROL_RIGHT = "ControlRight",
	SHIFT_LEFT = "ShiftRight",
	SHIFT_RIGHT = "ShiftRight",
	CONTEXT_MENU = "ContextMenu",
	META_LEFT = "MetaLeft",

	INSERT = "Insert",
	DEL = "Delete",
	HOME = "Home",
	END = "End",
	PAGE_UP = "PageUp",
	PAGE_DOWN = "PageDown",

	NUM = "NumLock",
	NUM_DIVIDE = "NumpadDivide",
	NUM_MULTIPLY = "NumpadMultiply",
	NUM_SUBSTRACT = "NumpadSubtract",
	NUM_ADD = "NumpadAdd",
	NUM_ENTER = "NumpadEnter",
	NUM_DECIMAL = "NumpadDecimal",
	NUMPAD_0 = "Numpad0",
	NUMPAD_1 = "Numpad1",
	NUMPAD_2 = "Numpad2",
	NUMPAD_3 = "Numpad3",
	NUMPAD_4 = "Numpad4",
	NUMPAD_5 = "Numpad5",
	NUMPAD_6 = "Numpad6",
	NUMPAD_7 = "Numpad7",
	NUMPAD_8 = "Numpad8",
	NUMPAD_9 = "Numpad9",

	DOWN = "ArrowDown",
	LEFT = "ArrowLeft",
	RIGHT = "ArrowRight",
	UP = "ArrowUp",
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