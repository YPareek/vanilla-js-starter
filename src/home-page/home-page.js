import template from './home-page.template.js';
import { getConfigData } from '../data.service.js';
import ConfigTable from '../config-table/config-table.js';

export class HomePage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.attachEventsToSearchInputs();
    this.initializeConfigTable();
    this.configData = [];
  }

  attachEventsToSearchInputs() {
    let inputElements = this.shadowRoot.querySelectorAll('input');
    let searchKeyInput = inputElements[0];
    searchKeyInput.addEventListener('change', e => this.onSearchKeyChange(e));
    let searchDescInput = inputElements[1];
    searchDescInput.addEventListener('change', e =>
      this.onDescriptionKeyChange(e)
    );
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
    if (this.shadowRoot.firstElementChild.children.length > 2) {
      this.shadowRoot.firstElementChild.removeChild(
        this.shadowRoot.firstElementChild.children[2]
      );
    }
    this.shadowRoot.firstElementChild.appendChild(configTableElement);
  }

  onSearchKeyChange(e) {
    this.attachConfigTable(
      this.configData.filter(item =>
        item.label.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }

  onDescriptionKeyChange(e) {
    this.attachConfigTable(
      this.configData.filter(item =>
        item.description.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }
}

customElements.define('home-page', HomePage);
