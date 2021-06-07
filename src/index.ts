import { Engine, Entity, Query, System, EntitySnapshot } from 'tick-knock';
import * as PIXI from 'pixi.js';
import Vector2 from './Vector2';

const getRandomValue = (min: number, max: number): number => Math.random() * (max - min) + min;

const width = window.innerWidth;
const height = window.innerHeight;
const engine = new Engine();
const container = new PIXI.Container();

class Component {
	sprite = PIXI.Sprite.from('./bunny.png');
	rotationSpeed = getRandomValue(0, 2);
	direction = new Vector2(getRandomValue(-1, 1), getRandomValue(-1, 1));
	position = new Vector2(getRandomValue(0, width), getRandomValue(0, height));
}

class RotationSystem extends System {
	query = new Query((entity: Entity) => entity.has(Component));

	constructor() {
		super();
		engine.addQuery(this.query);

		this.query.onEntityAdded.connect(({ current }: EntitySnapshot) => {
			const comp = current.get(Component) as Component;
			comp.sprite.anchor.set(0.5);
			this.updatePosition(comp, 1);
			container.addChild(comp.sprite);
		});

		this.query.onEntityRemoved.connect(({ current }: EntitySnapshot) => {
			const comp = current.get(Component) as Component;
			container.removeChild(comp.sprite);
		});
	}

	public update(dt: number) {
		super.update(dt);
		this.query.entities.forEach((entity) => {
			const component = entity.get(Component) as Component; ///?
			this.updatePosition(component, dt);
		});
	}

	public updatePosition(component: Component, dt: number) {
		component.sprite.angle += component.rotationSpeed;
		component.position = component.direction.mul(0.5 * dt).add(component.position);
		if (component.position.x > width) component.position.x = 0;
		if (component.position.x < 0) component.position.x = width;
		if (component.position.y > height) component.position.y = 0;
		if (component.position.y < 0) component.position.y = height;
		component.sprite.x = component.position.x;
		component.sprite.y = component.position.y;
	}
}

engine.addSystem(new RotationSystem());

window.onload = () => {
	const renderer = new PIXI.Renderer({ width, height, backgroundColor: 0x1099bb });
	document.body.appendChild(renderer.view);

	const add = document.querySelector('#button-add') as HTMLElement;
	add.onclick = () => {
		for (let i = 0; i < 50; i++) {
			const entity = new Entity();
			entity.addComponent(new Component());
			engine.addEntity(entity);
		}
	};
	const remove = document.querySelector('#button-remove') as HTMLElement;
	remove.onclick = () => engine.removeAllEntities();

	let lastTimestamp = 16;
	const run = (timestamp = 0) => {
		const dt = timestamp - lastTimestamp;
		lastTimestamp = timestamp;
		engine.update(dt);
		renderer.render(container);
		requestAnimationFrame(run);
	};
	run();
};
