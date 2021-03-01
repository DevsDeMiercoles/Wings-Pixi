import notifications from '../../../framework/Events';
import PlayerTurn from "./PlayerTurn";

export default class TurnsBased {
	public static readonly RoundEnded: string = "The round has finished";
	public static readonly HandEnded: string = "The hand has finished";
	public static readonly TurnEnded: string = "The turn has finished";
	private readonly players: Array<PlayerTurn> = new Array<PlayerTurn>();

	public automaticTurns: boolean = true;
	public automaticHand: boolean = false;

	private currentPlayer: PlayerTurn | undefined;
	private currentTurn: number = 0;

	private currentHand: number = 0;
	private handsToPlay: number;

	private playing: boolean = false;

	public constructor(handsToPlay: number) {
		this.handsToPlay = handsToPlay;
	}

	public addPlayer(playerTurn: PlayerTurn) {
		this.players.push(playerTurn);
	}

	public addPlayers(...playersToAdd: PlayerTurn[]) {
		for (const player of playersToAdd) {
			this.addPlayer(player);
		}
	}

	public update(elapsedTime: number) {
		if (this.playing && this.currentPlayer)
			this.currentPlayer.update(elapsedTime);
	}

	public startRound() {
		if (this.players.length = 0) {
			console.error("Turns", "There are no players ready! Cant start turns");
			return;
		}

		this.currentHand = 0;
		this.nextHand();
	}

	public nextHand() {
		this.currentHand++;

		if (this.currentHand > this.handsToPlay) {
			notifications.dispatchNotification(TurnsBased.RoundEnded);
			this.playing = false;
			return;
		}

		console.debug("Turns Mechanics", "Moving to hand " + this.currentHand);
		this.currentTurn = -1;
		this.nextTurn();
	}

	public nextTurn() {
		this.playing = true;
		this.currentTurn++;

		if (this.currentTurn >= this.players.length) {
			notifications.dispatchNotification(TurnsBased.HandEnded);
			this.currentPlayer = undefined;
			this.playing = false;
			if (this.automaticHand)
				this.nextHand();
			return;
		}

		console.debug("Turns Mechanics", "Playing player " + this.currentTurn);
		this.currentPlayer = this.players[this.currentTurn];
		this.currentPlayer.startTurn();
	}

	public finishTurn(data?: any) {
		notifications.dispatchNotification(TurnsBased.TurnEnded, data);

		if (this.automaticTurns)
			this.nextTurn();
		this.playing = false;
	}

	public getCurrentHand(): number {
		return this.currentHand;
	}

	public getCurrentTurn(): number {
		return this.currentTurn;
	}

	public get player(): String {
		return this.currentPlayer?.name ?? "";
	}

}
