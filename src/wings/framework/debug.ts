
class Watcher {
	private subjects: any = {};
	private current: any = {};

	watch(obj: any) {
		this.current;	//TSC hack, I want to see it in the console only
		this.current = obj;
	}
	follow(name: string, obj: any) {
		this.subjects[name] = obj;
	}
	unfollow(name: string) {
		delete this.subjects[name];
	}
};
let watcher = new Watcher();
(globalThis as any).watcher = watcher;

export default watcher;