import { APPLICATION_NAME_SPACE } from 'common';
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Logger } from 'web-lib';

const ELEMENT_NAME = `${APPLICATION_NAME_SPACE}-landing-page`;

@customElement(ELEMENT_NAME)
export class LandingPage extends LitElement {
	render() {
		return html`
			<section>
				<h1>Hello on Sales PWA Landing Page!!!</h1>
				<button @click=${() => this._onClick()}>Log</button>
				<av-badge variant="success">Success</av-badge>
				<av-badge variant="danger">Danger</av-badge>
				<av-badge variant="default">Default</av-badge>
			</section>
		`;
	}

	private _onClick() {
		Logger.log('Hello World!');
		Logger.alert('Hello World!');
	}

	static styles = css`
		:host {
		}
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		ELEMENT_NAME: LandingPage;
	}
}