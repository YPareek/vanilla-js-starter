const template = document.createElement('template');

template.innerHTML = `
<style>
#productsTable {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
#productsTable td, #productsTable th {
  border: 1px solid #ddd;
  padding: 8px;
}
#productsTable tr:nth-child(even){background-color: #f2f2f2;}
#productsTable tr:hover {background-color: #ddd;}

.m-t-5{
  margin-top: 5px;
}
.buttons {
  display:flex;
  justify-content:flex-end;
  align-items:center; 
} 
</style>
<div class="m-t-5">
<form id="form1">
<table id="productsTable" class="m-t-5">
<thead>
<th ></th>
<th>Key</th>
<th>Value</th>
<th>Description</th>
</thead>
<tbody>
</tbody>
</table>
</form>
<div class="m-t-5 buttons">
<button >Done</button>
</div>
</div>`;

export default template;
