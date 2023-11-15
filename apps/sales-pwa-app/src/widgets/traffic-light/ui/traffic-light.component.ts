import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TTrafficLight, trafficLightService } from '../service/traffic-light.service';

@customElement('avx-traffic-light')
export class AVXTrafficLight extends LitElement {
  private service = trafficLightService;

  @state() light: TTrafficLight | null = null;
  @state() active = false;

  render() {
    const trafficLight = this.active
      ? this._getActiveTrafficLight()
      : this._getInactiveTrafficLight();
    return html`<div>${trafficLight}</div>`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.service.start();

    this.service.onTransition((state) => {
      console.log(state.value);

      const isMatchingRed = state.matches({ active: 'red' });
      const isMatchingGreen = state.matches({ active: 'green' });
      const isMatchingYellow = state.matches({ active: 'yellow' });

      if (state.matches('idle')) {
        this.active = false;
      } else if (state.matches('active')) {
        this.active = true;

        if (isMatchingGreen) {
          this.light = 'green';
        } else if (isMatchingRed) {
          this.light = 'red';
        } else if (isMatchingYellow) {
          this.light = 'yellow';
        }
      }
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.service.stop();
  }

  private _startTrafficLight() {
    this.service.send('ACTIVATE');
  }
  private _stopTrafficLight() {
    this.service.send('DEACTIVATE');
  }

  private _changeTrafficLight() {
    this.service.send('CHANGE_LIGHT');
  }

  private _circle(color: TTrafficLight) {
    const isActive = this.light === color;
    const combinedClass = `traffic-light-circle ${color} ${isActive ? 'active' : ''}`;
    return html`<div class=${combinedClass}></div>`;
  }

  private _getTrafficLightBox() {
    return html`<div class="traffic-light-box">
      ${this._circle('red')} ${this._circle('yellow')} ${this._circle('green')}
    </div>`;
  }

  private _getActiveTrafficLight() {
    return html`
      <div>
        Traffic Light is Active ${this.light} ${this._getTrafficLightBox()}
        <button @click=${() => this._changeTrafficLight()}>Change Light</button>
        <button @click=${() => this._stopTrafficLight()}>Stop</button>
      </div>
    `;
  }

  private _getInactiveTrafficLight() {
    return html`
      <div>
        Traffic Light is Inactive ${this.light}
        <button @click=${() => this._startTrafficLight()}>Start</button>
      </div>
    `;
  }

  static styles = css`
    :host {
      --circle-width: 100px;
      --traffic-box-width: calc(var(--circle-width) + 10px);
    }

    .traffic-light-circle {
      width: var(--circle-width);
      aspect-ratio: 1/1;
      border-radius: 50%;
      border: 2px solid black;
    }

    .traffic-light-box {
      border: 2px solid black;
      width: var(--traffic-box-width);
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .red {
      border-color: red;
    }
    .red:is(.active) {
      background-color: red;
    }
    .yellow {
      border-color: yellow;
    }
    .yellow:is(.active) {
      background-color: yellow;
    }
    .green {
      border-color: green;
    }
    .green:is(.active) {
      background-color: green;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'avx-traffic-light': AVXTrafficLight;
  }
}
