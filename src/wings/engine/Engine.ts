// import * as PIXI from 'pixi.js';
import { Container, DisplayObject, Renderer, Ticker } from 'pixi.js';
import notifications from "../framework/Events";
import Loader from '../framework/loading/Loader';

export default class Engine {
	private ticker: Ticker = new Ticker();
	renderer: Renderer;
	stage: Container = new Container();
	onUpdate: (() => void) | undefined;
	loader = new Loader();
	notifications = notifications;

	constructor(options?: iEngineOptions) {
		this.renderer = new Renderer(defaultOptions(options ?? {}));

		(document.getElementById(options?.elementId ?? "wings") ?? document.body).appendChild(this.renderer.view);

		this.centerApp();
		window.addEventListener('resize', this.centerApp.bind(this));

		notifications.addNotificationListener(normalNotifications.addToStage, this.addToStage.bind(this));

		this.ticker.add(this.tick.bind(this));
		this.ticker.start();
	}

	private centerApp() {
		this.renderer.view.style.position = 'absolute';
		this.renderer.view.style.left = ((window.innerWidth - this.renderer.view.width) >> 1) + 'px';
		this.renderer.view.style.top = ((window.innerHeight - this.renderer.view.height) >> 1) + 'px';
	}

	private tick() {
		this.onUpdate?.();
		this.renderer.render(this.stage);
	}

	private addToStage(displayObject: DisplayObject) {
		this.stage.addChild(displayObject);
	}
}

export enum normalNotifications {
	addToStage = "Please add this new graphic to the stage good sir"
}

export interface iEngineOptions {
	width?: number;
	height?: number;
	view?: HTMLCanvasElement;
	transparent?: boolean;
	autoDensity?: boolean;
	antialias?: boolean;
	resolution?: number;
	clearBeforeRender?: boolean;
	preserveDrawingBuffer?: boolean;
	backgroundColor?: number;
	powerPreference?: string;
	elementId?: string;
}

function defaultOptions(options: iEngineOptions): iEngineOptions {
	options.width = options.width ?? 720;
	options.height = options.height ?? 480;
	options.backgroundColor = options.backgroundColor ?? 0x828282;
	options.antialias = options.antialias ?? true;
	return options;
}

// let renderer;
// let stage;
// let sceneManager;

// export function start(scene, options) {
// 	stage = new PIXI.Container();
// 	options = Object.assign({ forceCanvas: false, }, options);

// 	renderer = PIXI.autoDetectRenderer(options);

// 	// this.sceneManager = new SceneManager(scene, this.stage);

// 	let container = document.getElementById(options?.containerId) ?? document.body;
// 	container.appendChild(renderer.view);

// 	this.tick();
// }


// function tick() { 

// 	requestAnimationFrame(this.tick);
// }