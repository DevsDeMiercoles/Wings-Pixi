import TurnsBased from './TurnsBased';


export default abstract class PlayerTurn {
	protected turns: TurnsBased;
	public name: string;

	public constructor(name: string) {
		this.name = name;
	}

	public abstract update(elapsedTime: number): void;

	public abstract startTurn(): void;

	public setTurnBase(turns: TurnsBased) {
		this.turns = turns;
	}
}
