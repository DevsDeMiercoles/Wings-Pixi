import TurnsBased from './TurnsBased';


export default abstract class PlayerTurn {
	protected turns: TurnsBased;
	public name: string;

	public constructor(name: string, turns: TurnsBased) {
		this.name = name;
		this.turns = turns;
	}

	public abstract update(elapsedTime: number): void;

	public abstract startTurn(): void;

}
