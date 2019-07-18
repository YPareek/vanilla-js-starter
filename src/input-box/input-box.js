const template = document.createElement('template');
template.innerHTML = `
<style>
input {
  width: 90%;
  height: 100%;
  padding: 12px 20px;
  border: none;
}
</style>
<span></span>`;

export default class InputBox extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  async connectedCallback() {
    let innerHTML = '';
    if (this.field.type === 'text') {
      innerHTML = `<input class="input-style" type="text" value="${
        this.field.defaultValue
      }"/>`;
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
    this.shadowRoot.addEventListener('change', e =>
      this.onClick(e.target.value)
    );
  }

  onClick(value) {
    this.dispatchEvent(
      new CustomEvent('onValueChange', {
        bubbles: true,
        detail: value
      })
    );
  }
}

customElements.define('input-box', InputBox);
