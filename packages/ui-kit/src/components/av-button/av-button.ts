import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LoggerController } from '../../controllers/Logger.controller';

type IButtonType =
	| 'loading'
	| 'success'
	| 'error'
	| 'warning'
	| 'info'
	| 'default';

@customElement('av-button')
export class AvButton extends LitElement {
	render() {
		return html`<button>
			${this.label}
			<span>${this._getButtonIcon()}</span>
		</button>`;
	}

	private _logger = new LoggerController(this);

	@property({ type: String }) label = 'Button';
	@property({ type: String }) type: IButtonType = 'default';
	@property({ type: Boolean }) isLoading = false;
	@property({ type: Boolean }) isDisabled = false;

	private _getButtonIcon() {
		const iconMap: Record<IButtonType, string> = {
			loading: '💤',
			success: '✅',
			error: '🔴',
			warning: '❗',
			info: 'ℹ️',
			default: '',
		};

		return iconMap[this.type];
	}

	static styles = css`
		:host {
		}

		:host([type='default']) button {
			background-color: var(--default-bg-color);
			color: var(--default-text-color);
		}
		:host([type='loading']) button {
			background-color: var(--loading-bg-color);
			color: var(--loading-text-color);
		}
		:host([type='success']) button {
			background-color: var(--success-bg-color);
			color: var(--success-text-color);
		}
		:host([type='error']) button {
			background-color: var(--error-bg-color);
			color: var(--error-text-color);
		}

		:host([isLoading='true']) button {
			cursor: wait;
		}

		@media (prefers-color-scheme: dark) {
			:host {
				--default-bg-color: rgba(128, 128, 128, 0.4);
				--default-text-color: rgba(255, 255, 255, 0.8);

				--loading-bg-color: rgba(154, 205, 50, 0.3);
				--loading-text-color: rgba(255, 255, 255, 0.8);

				--success-bg-color: rgba(0, 128, 0, 0.7);
				--success-text-color: rgba(255, 255, 255, 0.8);

				--error-bg-color: rgba(255, 99, 71, 0.7);
				--error-text-color: rgba(255, 255, 255, 0.8);
			}
		}

		@media (prefers-color-scheme: light) {
			:host {
				--default-bg-color: rgba(128, 128, 128, 1);
				--default-text-color: rgba(255, 255, 255, 1);

				--loading-bg-color: rgba(154, 205, 50, 0.8);
				--loading-text-color: rgba(255, 255, 255, 1);

				--success-bg-color: rgba(0, 128, 0, 1);
				--success-text-color: rgba(255, 255, 255, 1);

				--error-bg-color: rgba(255, 99, 71, 1);
				--error-text-color: rgba(255, 255, 255, 1);
			}
		}
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		'av-button': AvButton;
	}
}
