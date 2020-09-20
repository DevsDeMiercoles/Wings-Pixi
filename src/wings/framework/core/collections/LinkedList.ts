import { Pool, Pooleable } from "./Pool";

export class Link<T> implements Pooleable {
	value: T | undefined;
	next: Link<T> | null = null;
	prev: Link<T> | null = null;

	constructor(e?: T) {
		this.value = e;
	}
	reset() {
		this.value = undefined;
		this.next = null;
		this.prev = null;
	}
}
export default class LinkedList<T> implements IterableIterator<T>{
	private root: Link<T> | null = null;
	private end: Link<T> | null;
	private _size = 0;
	private pool: Pool<Link<T>>;
	private curr: Link<T> | null = null;

	constructor() {
		this.pool = new Pool<Link<T>>(Link);
		this.end = null;
	}

	shift(): T | undefined {
		let value;
		if (this.root) {
			value = this.root.value;
			this.remove(this.root);
		}
		return value;
	}

	pop(): T | undefined {
		let value;
		if (this.end) {
			value = this.end.value;
			this.remove(this.end);
		}
		return value;
	}

	private getLink(e: T | Link<T>): Link<T> {
		let link: Link<T>;
		if (e instanceof Link) {
			link = e;
		}
		else {
			link = this.pool.obtain();
			link.value = e;
		}
		return link;
	}
	addFirst(e: T | Link<T>): void {
		let link = this.getLink(e);

		if (this.root == null) {
			this.end = link;
		} else {
			link.next = this.root;
			this.root.prev = link;
		}
		this.root = link;
		this._size++;
	}
	addLast(e: T | Link<T>): void {
		let link = this.getLink(e);

		if (this.end == null) {
			this.root = link;
		} else {
			link.prev = this.end;
			this.end.next = link;
		}
		this.end = link;
		this._size++;
	}

	addAfter(e: Link<T> | T, link: Link<T>): void {
		let newLink = this.getLink(e);

		newLink.next = link.next;
		link.next = newLink;
		newLink.prev = link;
		if (this.end == link)
			this.end = newLink;

		this._size++;
	}

	addBefore(e: Link<T> | T, link: Link<T>): void {
		let newLink = this.getLink(e);

		newLink.prev = link.prev;
		link.prev = newLink;
		newLink.next = link;
		if (this.root == link)
			this.root = newLink;

		this._size++;
	}

	remove(e: T | Link<T>): void {
		if (e instanceof Link) {
			this.removeLink(e);
		}
		else {
			for (let curr = this.root; curr; curr = curr.next) {
				if (curr.value == e) {
					this.removeLink(curr);
					break;
				}
			}
		}
	}
	private removeLink(link: Link<T>): void {
		let prev = link.prev;
		let next = link.next;

		if (prev != null) {
			prev.next = link.next;
		} else {
			this.root = link.next; // If no previous, then this is the root and I have to move it
		}
		if (next != null) {
			next.prev = link.prev;
		} else {
			this.end = link.prev; // If no next, then this is the end and I have to move the end
		}

		this.pool.free(link);
		this._size--;
	}

	get size(): number {
		return this._size;
	}

	clear(): void {
		this.root = this.end = null;
		this._size = 0;
	}

	next(): IteratorResult<T> {
		if (this.curr?.value) {
			let value = this.curr.value;
			this.curr = this.curr.next;

			return {
				done: false,
				value: value
			};
		} else {
			return {
				done: true,
				value: null
			};
		}
	}

	[Symbol.iterator](): IterableIterator<T> {
		this.curr = this.root;

		return this;
	}

	toString(): string {
		let s = "[";
		let first = true;
		for (const e of this) {
			if (first)
				first = false;
			else
				s += ", ";
			s += JSON.stringify(e);
		}
		s += "]";
		return s;
	}
}