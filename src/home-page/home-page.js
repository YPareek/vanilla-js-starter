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
  }

  attachEventsToSearchInputs() {
    let inputElements = this.shadowRoot.querySelectorAll('input');
    let searchKeyInput = inputElements[0];
    searchKeyInput.addEventListener('change', this.onSearchKeyChange);
    let searchDescInput = inputElements[1];
    searchDescInput.addEventListener('change', this.onDescriptionKeyChange);
  }

  initializeConfigTable() {
    let configTableElement = document.createElement('config-table');
    getConfigData().then(configData => {
      console.log(configData);
      configTableElement.data = configData;
      this.shadowRoot.firstElementChild.appendChild(configTableElement);
    });
  }

  onSearchKeyChange() {
    console.log(this.value);
  }

  onDescriptionKeyChange() {
    console.log(this.value);
  }
}

customElements.define('home-page', HomePage);
