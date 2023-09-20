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
