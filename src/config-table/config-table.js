import template from './config-table.template.js';

export class ConfigTable extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  async connectedCallback() {
    this.configData = this.data;
    this.generateTableHTML();
  }

  generateTableHTML() {
    if (this.configData) {
      let tableBody = this.shadowRoot.querySelector('tbody');
      let innerHtml = '';
      this.configData.config.forEach(element => {
        innerHtml += `<tr> 
      <td><input type="checkbox" value="${element.selected}"/></td>
      <td>${element.label}</td>
      <td>${element.field.defaultValue}</td>
      <td>${element.description}</td>
      </tr>`;
      });
      tableBody.innerHTML = innerHtml;
    }
  }
}

customElements.define('config-table', ConfigTable);

export default ConfigTable;
