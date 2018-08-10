export abstract class Event {
	public static readonly NAME: string;

	public getName(): string {
		return (<typeof Event>this.constructor).NAME;
	}
}

export type ListenerCallback = <T extends Event>(event: T) => void;

export class EventDispatcher {
	protected listeners: {[event: string]: ListenerCallback[]} = {};

	public addListener(event: string, listener: ListenerCallback): this {
		if (!(event in this.listeners))
			this.listeners[event] = [];

		this.listeners[event].push(listener);

		return this;
	}

	public removeListener(event: string, listener: ListenerCallback): this {
		if (event in this.listeners)
			this.listeners[event] = this.listeners[event].filter(item => item !== listener);

		return this;
	}

	public dispatch<T extends Event>(event: T): void {
		if (!(event.getName() in this.listeners))
			return;

		this.listeners[event.getName()].forEach(listener => listener(event));
	}
}