const template = document.createElement('template');
template.innerHTML = `<span></span>`;

export default class InputBox extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  async connectedCallback() {
    let innerHTML = '';
    if (this.field.type === 'text') {
      innerHTML = `<input type="text" value="${this.field.defaultValue}"/>`;
    } else {
      innerHTML = `<select>
      ${this.field.options.reduce(
        (options, option) =>
          (options += `<option value="${option}" ${
            this.field.defaultValue === option ? 'selected' : ''
          }>${option}</option>`),
        ''
      )}
      </select>`;
    }
    this.shadowRoot.innerHTML = innerHTML;
  }
}

customElements.define('input-box', InputBox);
