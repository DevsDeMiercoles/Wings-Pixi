import LinkedList, { Link } from '../../../../../src/wings/framework/core/collections/LinkedList';

class VV {
	value = "";
	viewValue = "";

	constructor(v?: string) {
		this.value = v ?? "";
	}
}
let vv1 = new VV("1");
let vv2 = new VV("2");
let vv3 = new VV("3");
let vv4 = new VV("4");
let vv5 = new VV("5");


describe("Basic", () => {
	test("Existe", () => {
		let ll = new LinkedList<VV>();
		expect(ll).toBeDefined();
	});
	test("defas", () => {
		let ll = new LinkedList<VV>();
		expect(ll.size).toBe(0);
		expect(ll.pop()).not.toBeDefined();
		expect(ll.shift()).not.toBeDefined();
	});
	test("to string", () => {
		let ll = new LinkedList<VV>();
		ll.addLast(vv1); ll.addLast(vv2); ll.addLast(vv3); ll.addLast(vv4);
		expect(ll.toString()).toBe(`[{"value":"1","viewValue":""}, {"value":"2","viewValue":""}, {"value":"3","viewValue":""}, {"value":"4","viewValue":""}]`);
	});
});

describe("Basic", () => {
	test("adding last", () => {
		let ll = new LinkedList<VV>();
		let vv = new VV();
		ll.addLast(new VV()); ll.addLast(new VV()); ll.addLast(new VV()); ll.addLast(new VV());
		ll.addLast(vv);
		expect(ll.size).toBe(5);
		expect(ll.pop()).toBe(vv);
		expect(ll.shift()).not.toBe(vv);
		expect(ll.size).toBe(3);
	});
	test("adding first", () => {
		let ll = new LinkedList<VV>();
		let vv = new VV();
		ll.addFirst(new VV()); ll.addFirst(new VV()); ll.addFirst(new VV()); ll.addFirst(new VV());
		ll.addFirst(vv);
		expect(ll.size).toBe(5);
		expect(ll.pop()).not.toBe(vv);
		expect(ll.shift()).toBe(vv);
		expect(ll.size).toBe(3);
	});


	test("clean", () => {
		let ll = new LinkedList<VV>();
		for (let i = 0; i < 5; i++) {
			ll.addLast(new VV());
		}
		expect(ll.size).toBe(5);
		ll.clear();
		expect(ll.size).toBe(0);
		expect(ll.pop()).not.toBeDefined();
		expect(ll.shift()).not.toBeDefined();
	});

	test("Remove value", () => {
		let ll = new LinkedList<VV>();
		for (let i = 0; i < 5; i++) {
			ll.addLast(new VV());
		}

		let vv = new VV();
		vv.value = "soy yo!";
		vv.viewValue = "No me olvides!";
		ll.addLast(vv);
		expect(ll.size).toBe(6);
		ll.remove(vv);
		expect(ll.size).toBe(5);
	});
});

describe("LinkedList Order", () => {
	let right = [vv1, vv2, vv3, vv4, vv5];
	let inverse = [vv5, vv4, vv3, vv2, vv1];

	test("keep order last ", () => {
		let ll = new LinkedList<VV>();
		ll.addLast(vv1); ll.addLast(vv2); ll.addLast(vv3); ll.addLast(vv4); ll.addLast(vv5);
		compareOrder(ll, right);

		ll.clear();
		ll.addLast(vv5); ll.addLast(vv4); ll.addLast(vv3); ll.addLast(vv2); ll.addLast(vv1);
		compareOrder(ll, inverse);
	});
	test("keep order first", () => {
		let ll = new LinkedList<VV>();
		ll.addFirst(vv1); ll.addFirst(vv2); ll.addFirst(vv3); ll.addFirst(vv4); ll.addFirst(vv5);
		compareOrder(ll, inverse);

		ll.clear();
		ll.addFirst(vv5); ll.addFirst(vv4); ll.addFirst(vv3); ll.addFirst(vv2); ll.addFirst(vv1);
		compareOrder(ll, right);
	});
	test("pop", () => {
		let ll = new LinkedList<VV>();

		ll.addLast(vv1); ll.addLast(vv2); ll.addLast(vv3); ll.addLast(vv4); ll.addLast(vv5);
		expect(ll.size).toBe(5);
		expect(ll.pop()).toBe(vv5);
		expect(ll.pop()).toBe(vv4);
		expect(ll.pop()).toBe(vv3);
		expect(ll.pop()).toBe(vv2);
		expect(ll.pop()).toBe(vv1);
		expect(ll.size).toBe(0);
		expect(ll.pop()).not.toBeDefined();
		expect(ll.size).toBe(0);

		ll.clear();
		ll.addLast(vv5); ll.addLast(vv4); ll.addLast(vv3); ll.addLast(vv2); ll.addLast(vv1);
		expect(ll.size).toBe(5);
		expect(ll.pop()).toBe(vv1);
		expect(ll.pop()).toBe(vv2);
		expect(ll.pop()).toBe(vv3);
		expect(ll.pop()).toBe(vv4);
		expect(ll.pop()).toBe(vv5);
		expect(ll.size).toBe(0);
		expect(ll.pop()).not.toBeDefined();
		expect(ll.size).toBe(0);
	});

	test("shift", () => {
		let ll = new LinkedList<VV>();

		ll.addLast(vv5); ll.addLast(vv4); ll.addLast(vv3); ll.addLast(vv2); ll.addLast(vv1);
		expect(ll.size).toBe(5);
		expect(ll.shift()).toBe(vv5);
		expect(ll.shift()).toBe(vv4);
		expect(ll.shift()).toBe(vv3);
		expect(ll.shift()).toBe(vv2);
		expect(ll.shift()).toBe(vv1);
		expect(ll.size).toBe(0);
		expect(ll.shift()).not.toBeDefined();
		expect(ll.size).toBe(0);

		ll.clear();
		ll.addLast(vv1); ll.addLast(vv2); ll.addLast(vv3); ll.addLast(vv4); ll.addLast(vv5);
		expect(ll.size).toBe(5);
		expect(ll.shift()).toBe(vv1);
		expect(ll.shift()).toBe(vv2);
		expect(ll.shift()).toBe(vv3);
		expect(ll.shift()).toBe(vv4);
		expect(ll.shift()).toBe(vv5);
		expect(ll.size).toBe(0);
		expect(ll.shift()).not.toBeDefined();
		expect(ll.size).toBe(0);
	});

	test("after", () => {
		let ll = new LinkedList<VV>();

		let l1 = new Link<VV>(vv1);
		let l2 = new Link<VV>(vv2);
		let l3 = new Link<VV>(vv3);
		let l4 = new Link<VV>(vv4);
		let l5 = new Link<VV>(vv5);
		ll.addLast(l1); ll.addAfter(l2, l1); ll.addAfter(l3, l2); ll.addAfter(l4, l3); ll.addAfter(l5, l4);
		compareOrder(ll, right);
		expect(ll.pop()).toBe(vv5);

		ll.clear();
		l1.reset(); l2.reset(); l3.reset(); l4.reset(); l5.reset();
		l1.value = vv1;

		ll.addFirst(l5); ll.addAfter(l4, l5); ll.addAfter(l3, l4); ll.addAfter(l2, l3); ll.addAfter(l1, l2);
		compareOrder(ll, inverse);
		expect(ll.pop()).toBe(vv1);
	});


	test("before", () => {
		let ll = new LinkedList<VV>();

		let l1 = new Link<VV>(vv1);
		let l2 = new Link<VV>(vv2);
		let l3 = new Link<VV>(vv3);
		let l4 = new Link<VV>(vv4);
		let l5 = new Link<VV>(vv5);
		ll.addFirst(l5); ll.addBefore(l4, l5); ll.addBefore(l3, l4); ll.addBefore(l2, l3); ll.addBefore(l1, l2);
		compareOrder(ll, right);
		expect(ll.shift()).toBe(vv1);

		ll.clear();
		l1.reset(); l2.reset(); l3.reset(); l4.reset(); l5.reset();
		l5.value = vv5;

		ll.addLast(l1); ll.addBefore(l2, l1); ll.addBefore(l3, l2); ll.addBefore(l4, l3); ll.addBefore(l5, l4);
		compareOrder(ll, inverse);
		expect(ll.shift()).toBe(vv5);
	});
});

function compareOrder<T>(list: LinkedList<T>, arr: Array<T>) {
	let i = 0;
	for (const vv of list) {
		expect(vv).toBe(arr[i++]);
	}
}