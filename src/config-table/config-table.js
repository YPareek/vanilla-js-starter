import template from './config-table.template.js';

export class ConfigTable extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot
      .querySelector('button')
      .addEventListener('click', e => this.printResult());
  }

  async connectedCallback() {
    this.configData = this.data;
    this.generateTableHTML();
  }

  printResult() {
    console.log(
      this.configData.filter(data => data.selected).reduce((result, data) => {
        result[data.label] = data.selectedValue
          ? data.selectedValue
          : data.field.defaultValue;
        return result;
      }, {})
    );
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
          element.selected ? `checked` : ``
        }/>`;
        checkBoxcolumn.addEventListener('change', e =>
          this.sendCheckBoxChangeEvent(e)
        );
        let labelColumn = document.createElement('td');
        labelColumn.innerText = element.label;
        let descriptionColumn = document.createElement('td');
        descriptionColumn.innerText = element.description;
        rowElement.appendChild(checkBoxcolumn);
        rowElement.appendChild(labelColumn);
        rowElement.appendChild(inputBoxElement);
        rowElement.appendChild(descriptionColumn);
        rowElement.disabled = !element.selected;
        rowElement.addEventListener('onValueChange', e =>
          this.onValueChange(e)
        );
        tableBody.appendChild(rowElement);
      });
    }
  }

  sendCheckBoxChangeEvent(e) {
    let elementToUpdate = this.configData.find(
      element =>
        e.target.parentElement.parentElement.children[1].innerHTML ===
        element.label
    );
    elementToUpdate.selected = e.target.checked;
  }

  onValueChange(e) {
    let elementToUpdate = this.configData.find(
      element => e.target.parentElement.children[1].innerHTML === element.label
    );
    elementToUpdate.selectedValue = e.detail;
  }
}

customElements.define('config-table', ConfigTable);

export default ConfigTable;
