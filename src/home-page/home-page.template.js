const template = document.createElement('template');

template.innerHTML = `
<div style="border: 1px solid grey;padding: 4px;">
<input
  type="text"
  placeholder="Search key"
/>
<input
  type="text"
  placeholder="Search Description"
/>
<input
  type="checkbox"
/>Show Selected
<config-table></config-table>
</div>`;

export default template;
