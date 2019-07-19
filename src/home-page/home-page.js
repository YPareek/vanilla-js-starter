import template from './home-page.template.js';
import { getConfigData } from '../data.service.js';

export class HomePage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.attachEventsToSearchInputs();
    this.initializeConfigTable();
    this.configData = [];
    this.descriptionKey = undefined;
    this.searchLabelKey = undefined;
    this.showSelected = false;
  }

  attachEventsToSearchInputs() {
    let inputElements = this.shadowRoot.querySelectorAll('input');
    let searchKeyInput = inputElements[0];
    searchKeyInput.addEventListener('change', e => this.onSearchKeyChange(e));
    let searchDescInput = inputElements[1];
    searchDescInput.addEventListener('change', e =>
      this.onDescriptionKeyChange(e)
    );
    let showSelected = inputElements[2];
    showSelected.addEventListener('change', e => this.onSelctedCheckBox(e));
  }

  initializeConfigTable() {
    getConfigData().then(configData => {
      this.configData = configData.config;
      this.attachConfigTable(this.configData);
    });
  }

  attachConfigTable(configData) {
    let configTableElement = document.createElement('config-table');
    configTableElement.data = configData;
    if (this.shadowRoot.firstElementChild.children.length > 3) {
      this.shadowRoot.firstElementChild.removeChild(
        this.shadowRoot.firstElementChild.children[3]
      );
    }
    this.shadowRoot.firstElementChild.appendChild(configTableElement);
  }

  onSelctedCheckBox(e) {
    this.showSelected = e.target.checked;
    this.attachConfigTable(this.filterdData());
  }

  onDescriptionKeyChange(e) {
    this.descriptionKey = e.target.value.toLowerCase();
    this.attachConfigTable(this.filterdData());
  }

  onSearchKeyChange(e) {
    this.searchLabelKey = e.target.value.toLowerCase();
    this.attachConfigTable(this.filterdData());
  }

  filterdData() {
    let a = this.configData.filter(
      item =>
        (this.searchLabelKey
          ? item.label.toLowerCase().includes(this.searchLabelKey)
          : true) &&
        (this.descriptionKey
          ? item.label.toLowerCase().includes(this.descriptionKey)
          : true) &&
        (this.showSelected ? item.selected : true)
    );
    return a;
  }
}

customElements.define('home-page', HomePage);
