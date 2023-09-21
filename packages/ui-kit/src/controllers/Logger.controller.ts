import { ReactiveController, ReactiveControllerHost } from 'lit';

export class LoggerController implements ReactiveController {
	private host: ReactiveControllerHost;

	constructor(host: ReactiveControllerHost) {
		this.host = host;
		host.addController(this);
	}

	hostConnected() {
		console.log(`${this.host.constructor.name} connected`);
	}
	hostDisconnected(): void {
		console.log(`${this.host.constructor.name} disconnected`);
	}

	hostUpdate(): void {
		console.log(`${this.host.constructor.name} updated`);
	}
}
