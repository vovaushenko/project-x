import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('av-badge')
export class AvBadge extends LitElement {
	@property({ type: String })
	variant = 'default';

	static styles = css`
		:host {
			display: inline-block;
			padding: 4px 8px;
			border-radius: 6px;
			font-size: 11px;
			font-family: inherit;
			font-weight: 700;
			color: #fff;
		}

		:host([variant='default']) {
			background-color: gray;
		}

		:host([variant='danger']) {
			color: white;
			background-color: red;
		}

		:host([variant='success']) {
			color: #436b1d;
			background-color: rgba(138, 201, 79, 0.9);
		}
	`;

	render() {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'av-badge': AvBadge;
	}
}
