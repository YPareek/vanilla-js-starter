import template from './config-table.template.js';
import inputBox from '../input-box/input-box.js';

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
      this.configData.forEach(element => {
        let inputBoxElement = document.createElement('input-box');
        inputBoxElement.field = element.field;
        let rowElement = document.createElement('tr');
        let checkBoxcolumn = document.createElement('td');
        checkBoxcolumn.innerHTML = `<input type="checkbox" ${
          element.selected ? 'checked = "true"' : 'checked = "false"'
        }"/>`;
        let labelColumn = document.createElement('td');
        labelColumn.innerText = element.label;
        let descriptionColumn = document.createElement('td');
        descriptionColumn.innerText = element.description;
        rowElement.appendChild(checkBoxcolumn);
        rowElement.appendChild(labelColumn);
        rowElement.appendChild(inputBoxElement);
        rowElement.appendChild(descriptionColumn);
        rowElement.disabled = !element.selected;
        tableBody.appendChild(rowElement);
      });
    }
  }
}

customElements.define('config-table', ConfigTable);

export default ConfigTable;
