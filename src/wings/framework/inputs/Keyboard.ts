import LinkedList from '../core/collections/LinkedList';
import { ControllerCallback, InputEvents } from './Controller';

export class Keyboard {
	private callback: ControllerCallback;
	pressedKeys = new LinkedList<string>();

	constructor(callback: ControllerCallback) {
		this.callback = callback;

		window.addEventListener("keydown", this.onKeyDown.bind(this));
		window.addEventListener("keyup", this.onKeyUp.bind(this));
	}

	private onKeyDown(event: KeyboardEvent) {
		let key = event.code;
		this.pressedKeys.addLast(key);
		this.callback(InputEvents.KeyDown, key);
	}
	private onKeyUp(event: KeyboardEvent) {
		let key = event.code;
		this.pressedKeys.remove(key);
		this.callback(InputEvents.KeyUp, key);
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

