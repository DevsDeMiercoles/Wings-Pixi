import LinkedList from "./core/collections/LinkedList";

type EventCallback = (x?: any) => void;
interface Event {
	name: string;
	data: any;
}

export class Notificator {
	protected subscribers = new Map<string, LinkedList<EventCallback>>();

	addNotificationListener(event: string, callback: EventCallback): void {
		if (!this.subscribers.has(event))
			this.subscribers.set(event, new LinkedList<EventCallback>());

		let list = this.subscribers.get(event)!;
		if (!list.includes(callback))
			list.addLast(callback);
	}

	removeNotificationListener(event: string, callback: EventCallback): void {
		this.subscribers.get(event)?.remove(callback);
	}

	dispatchNotification(name: string, data?: any): void {
		setTimeout(() => { this.dispatch({ name, data }); }, 0);
	}

	dispatchUrgentNotification(name: string, data?: any): void {
		this.dispatch({ name, data });
	}

	protected dispatch(event: Event) {
		if (this.subscribers.has(event.name)) {
			for (let callback of this.subscribers.get(event.name)!) {
				callback(event.data);
			}
		}
	}
}

let notifications = new Notificator();

export default notifications;