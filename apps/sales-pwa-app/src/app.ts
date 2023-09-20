import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { APPLICATION_NAME_SPACE } from 'common';
import { Logger } from 'web-lib';

const ELEMENT_NAME = `${APPLICATION_NAME_SPACE}-app`;

@customElement(ELEMENT_NAME)
export class SalesApp extends LitElement {
	render() {
		return html`
			<section>
				<av-landing-page></av-landing-page>
			</section>
		`;
	}

	static styles = css`
		:host {
			width: 100vw;
			height: 100vh;
			display: grid;
			place-items: center;
			background-color: #646cffaa;
			color: rgba(255, 255, 255, 0.9);
		}
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		[ELEMENT_NAME]: SalesApp;
	}
}
