// listHtmlBuilder.js

export function listHtmlBuilder() {
    let html = `
<button id="save-btn">Save</button>
<input type="text" id="itemInput" placeholder="Summon a new item..." />
<button id="summon-btn">Summon</button>

<ul id="sortable-list"></ul>
`; 
  return html;
}

document.addEventListener("DOMContentLoaded", async () => {
    document.body.innerHTML += listHtmlBuilder();
});