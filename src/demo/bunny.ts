import { Sprite } from "pixi.js";
import Assets from "../assets";
import Engine from "../wings/engine/Engine";
import FastMath from "../wings/framework/core/FastMath";
import watcher from "../wings/framework/debug";
import Position from "../wings/framework/physics/Position";

let width = 720;
let height = 480;
export default async function start() {
	let engine = new Engine({ backgroundColor: 0x828282 });
	console.log("Corriendo Demo de Bunny");

	let assets = new Assets();
	await assets.loadAll();

	engine.loader.add("img/bunny.png", "bunny");
	await engine.loader.load();

	let bunny = new Sprite(engine.loader.resources.bunny.texture);
	bunny.x = width / 2 + 100;
	bunny.y = height / 2;
	bunny.anchor.copyFrom(new Position(0.5));
	engine.stage.addChild(bunny);

	let bunny2 = new Sprite(assets.bunny);
	engine.stage.addChild(bunny2);

	watcher.watch(bunny);
	watcher.follow("bunny", bunny);
	engine.onUpdate = tick;


	function tick() {
		bunny.x = FastMath.wrap(bunny.x + 1, 0, width);
	}

}