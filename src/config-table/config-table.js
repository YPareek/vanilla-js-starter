import template from './config-table.template.js';

export class ConfigTable extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('config-table', ConfigTable);

export default ConfigTable;
