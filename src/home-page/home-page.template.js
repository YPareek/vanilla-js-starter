const template = document.createElement('template');

template.innerHTML = `
<div style="border: 1px solid blue;padding: 4px;">
<input
  type="text"
  placeholder="Search key"
/>
<input
  type="text"
  placeholder="Search Description"
/>
</div>`;

export default template;
