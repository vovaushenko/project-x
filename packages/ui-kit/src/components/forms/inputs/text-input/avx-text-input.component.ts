import { customElement, property, state } from 'lit/decorators.js';
import { UiKitBaseElement } from '../../../ui-kit-base-element/ui-kit-base.component';
import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

const InputTypeAttribute = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
] as const;

type InputType = (typeof InputTypeAttribute)[number];
const elementName = 'avx-text-input';
@customElement(elementName)
export class AvxTextInput extends UiKitBaseElement {
  render() {
    return html`
      <div class="text-field-container">
        <label class=${classMap(this.labelClasses)} for=${this.id}>${this.label}</label>
        <div class="form-input-container">
          <input class="form-input-base" id=${this.id} type=${this.type} name=${this.name} />
          <fieldset class=${classMap(this.fieldsetClasses)}>
            <legend class=${classMap(this.fieldsetLegendClasses)}>
              <span>${this.label}</span>
            </legend>
          </fieldset>
        </div>
      </div>
    `;
  }

  @property({ type: String }) label: string = 'AVX text input';
  @property({ type: String }) type: InputType = 'text';
  @property({ type: String }) id: string = 'text-input';
  @property({ type: String }) name: string = 'text-input';
  @state()
  labelClasses = { 'input-label-base': true, 'input-label-focus': false };
  @state()
  fieldsetClasses = { 'form-fieldset-base': true, 'form-fieldset-focus': false };
  @state()
  fieldsetLegendClasses = { 'form-fieldset-legend': true, 'form-fieldset-legend-focus': false };
  static formAssociated: boolean = true;
  _internals: ElementInternals;
  _value: string | null = null;
  _form: HTMLElement | null = null;
  _input: HTMLInputElement | null = null;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this.addEventListener('focus', () => {
      this.labelClasses = { ...this.labelClasses, 'input-label-focus': true };
      this.fieldsetClasses = { ...this.fieldsetClasses, 'form-fieldset-focus': true };
      this.fieldsetLegendClasses = {
        ...this.fieldsetLegendClasses,
        'form-fieldset-legend-focus': true,
      };
    });

    this.addEventListener('blur', () => {
      this.fieldsetClasses = { ...this.fieldsetClasses, 'form-fieldset-focus': false };
      if (!this._input?.value) {
        this.labelClasses = { ...this.labelClasses, 'input-label-focus': false };
        this.fieldsetLegendClasses = {
          ...this.fieldsetLegendClasses,
          'form-fieldset-legend-focus': false,
        };
      }
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._form = this.findContainingForm();
    if (this._form) {
      this._form.addEventListener('formdata', this.handleFormData.bind(this));
    }
  }

  firstUpdated(): void {
    this._input = this.renderRoot.querySelector('input');
    if (!this._input) {
      throw `input not found in: ${elementName}`;
    }
  }

  findContainingForm() {
    const root = this.getRootNode() as HTMLElement;
    const form = Array.from(root.querySelectorAll('form'));
    return form.find((form) => form.contains(this)) || null;
  }

  handleFormData({ formData }: FormDataEvent) {
    if (!this._input?.disabled && this._input) {
      formData.append(this._input?.name, this._input?.value);
    }
  }

  // Form controls usually expose a "value" property
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = v;
  }
  // The following properties and methods aren't strictly required,
  // but browser-level form controls provide them. Providing them helps
  // ensure consistency with browser-provided controls.
  get form() {
    return this._internals.form;
  }
  get validity() {
    return this._internals.validity;
  }
  get validationMessage() {
    return this._internals.validationMessage;
  }
  get willValidate() {
    return this._internals.willValidate;
  }
  checkValidity() {
    return this._internals.checkValidity();
  }
  reportValidity() {
    return this._internals.reportValidity();
  }

  // sync observed attributes to <input>
  // attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
  //   this._internals.setFormValue(value);
  // }

  static styles = [
    ...super.styles,
    css`
      :host {
        display: inline;
      }

      input:focus {
        outline: none;
      }

      .input-label-base {
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(14px, 12px) scale(1);
        transition:
          color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
          transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
          max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      }

      .input-label-focus {
        transform-origin: top left;
        transform: translate(14px, -9px) scale(0.85);
      }

      .form-input-base {
        width: 25ch;
        background: none;
        border: 0;
        padding: 12px 12px;
        font: inherit;
      }

      .form-fieldset-base {
        position: absolute;
        bottom: 0;
        right: 0;
        top: -10px;
        left: 0;
        margin: 0;
        padding: 0 8px;
        border-width: 1px;
        border-style: solid;
        border-color: var(--avx-theme-color-surface-variant);
        pointer-events: none;
      }

      .form-fieldset-focus {
        border-color: #1976d2;
        border-width: 2px;
      }

      .form-fieldset-legend {
        visibility: hidden;
        max-width: 0.01px;
        padding: 0;
      }

      .form-fieldset-legend-focus {
        max-width: 100%;
      }

      .form-input-container {
        position: relative;
      }

      .text-field-container {
        position: relative;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'avx-text-input': AvxTextInput;
  }
}
