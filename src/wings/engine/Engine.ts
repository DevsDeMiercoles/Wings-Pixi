// import * as PIXI from 'pixi.js';
import { Container, DisplayObject, Rectangle, Renderer, Ticker } from 'pixi.js';
import notifications from "../framework/Events";
import Loader from '../framework/loading/Loader';

type Updatable = { update(): void; };
export default class Engine {
	readonly stage: Container = new Container();
	readonly loader = new Loader();

	renderer: Renderer;
	onUpdate: ((elapsedMs: number) => void) | undefined;
	fps: number = 0;

	private entities = new Array<Updatable>();

	// Inner game loop
	private ticker: Ticker = new Ticker();
	private lag: number = 0;
	private updateMs: number;

	// FPS
	private frames: number = 0;
	private totalTime: number = 0;

	constructor(options?: iEngineOptions) {
		let config = defaultOptions(options ?? {});
		this.renderer = new Renderer(config);
		(document.getElementById(options?.elementId ?? "wings") ?? document.body).appendChild(this.renderer.view);


		this.updateMs = config.msPerUpdate!;
		this.centerApp();
		window.addEventListener('resize', this.centerApp.bind(this));

		notifications.addNotificationListener(normalNotifications.addToStage, this.addToStage.bind(this));
		notifications.addNotificationListener(normalNotifications.updateMe, this.updateEntity.bind(this));

		this.stage.hitArea = new Rectangle(0, 0, config.width, config.height);


		this.ticker.add(this.tick.bind(this));
		this.ticker.start();
		engine = this;
	}

	private centerApp() {
		this.renderer.view.style.position = 'absolute';
		this.renderer.view.style.left = ((window.innerWidth - this.renderer.view.width) >> 1) + 'px';
		this.renderer.view.style.top = ((window.innerHeight - this.renderer.view.height) >> 1) + 'px';
	}


	private tick() {
		let frameTime = this.ticker.elapsedMS;
		if (frameTime > 250) // Limit steps for debug
			frameTime = 250;

		this.lag += frameTime;
		while (this.lag >= this.updateMs) {
			this.onUpdate?.(this.updateMs);
			for (const e of this.entities) {
				e.update();
			}
			this.lag -= this.updateMs;
		}

		// let alpha = this.lag / this.updateMs;
		// sceneManager.runRender(alpha);
		this.renderer.render(this.stage);

		this.frames++;
		this.totalTime += frameTime;
		if (this.totalTime >= 1000) {
			this.totalTime -= 1000;

			this.fps = this.frames;
			this.frames = 0;
		}

	}

	private addToStage(displayObject: DisplayObject) {
		this.stage.addChild(displayObject);
	}
	private updateEntity(entity: Updatable) {
		this.entities.push(entity);
	}
}




export enum normalNotifications {
	addToStage = "Please add this new graphic to the stage good sir",
	updateMe = "I would like to get notify on the update and do some calculations, thanks",
	addToWorld = "Mr, I would like to join your world and particpate in it!",
	removeFromWorld = "FUCK THIS SHIT! I'm out!",
	iJustMoved = "K, I don't know if anyone actually cares, but I have just moved my position"
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
	msPerUpdate?: number;
}

function defaultOptions(options: iEngineOptions): iEngineOptions {
	options.width = options.width ?? 720;
	options.height = options.height ?? 480;
	options.backgroundColor = options.backgroundColor ?? 0x828282;
	options.antialias = options.antialias ?? true;
	options.msPerUpdate = options.msPerUpdate ?? 25;
	return options;
}

export var engine: Engine;