import { AvxDesignSystem } from '@project-x/ui-kit';
import { LitElement, css } from 'lit';

export class AvxBaseElement extends LitElement {
  static styles = [
    ...AvxDesignSystem,
    css`
      :host {
        display: block;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      * {
        margin: 0;
      }

      body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }

      img,
      picture,
      video,
      canvas,
      svg {
        display: block;
        max-width: 100%;
      }

      input,
      button,
      textarea,
      select {
        font: inherit;
      }

      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        overflow-wrap: break-word;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    `,
  ];
}
