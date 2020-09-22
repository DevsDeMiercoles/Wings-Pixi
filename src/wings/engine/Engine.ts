// import * as PIXI from 'pixi.js';
import { Container, Renderer, Ticker } from 'pixi.js';
import Loader from '../framework/loading/Loader';

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
export default class Engine {
	private ticker: Ticker = new Ticker();
	private renderer: Renderer;
	stage: Container = new Container();
	onUpdate: (() => void) | undefined;
	loader = new Loader();

	constructor(options?: iEngineOptions) {
		options = options ?? {};

		options.width = options.width ?? 720;
		options.height = options.height ?? 480;
		options.backgroundColor = options.backgroundColor ?? 0x828282;
		options.antialias = options.antialias ?? true;

		this.renderer = new Renderer(options);

		if (options?.view == undefined) {
			let element: HTMLElement = document.getElementById(options?.elementId ?? "wings") ?? document.body;
			element.appendChild(this.renderer.view);
		}

		this.centerApp();
		window.addEventListener('resize', this.centerApp.bind(this));

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