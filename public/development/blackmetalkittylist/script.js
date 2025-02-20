/*  
Sortable List

Contains:
- Sortable
- addItem
- removeItem
- updateValue
- loadList

*/

// Initialize SortableJS
new Sortable(document.getElementById("sortable-list"), {
  animation: 200,
  ghostClass: "sortable-ghost",
});

// Function to add a new item to the list
export async function addItem(preloaded = "") {
  let input = document.getElementById("itemInput");
  if (!input.value.trim()) return;

  const list = document.getElementById("sortable-list");
  const li = document.createElement("li");
  li.innerHTML = `<input type="text" value="${input.value}" oninput="updateValue(this)"> 
                      <span class="remove" onclick="removeItem(this)">✖</span>`;
  list.appendChild(li);
  input.value = "";
}

// Function to remove an item from the list
export function removeItem(element) {
  element.parentElement.remove();
}

// Function to log changes in input fields
export function updateValue(input) {
  console.log("Updated:", input.value);
}

// load list from file
import { loadRawText } from "../../js/textLoader.js";
export async function loadList() {
  const raw = await loadRawText("videolist.txt");
  const youtubeIdRegex = /(?:v=|embed\/|youtu\.be\/)([\w-]+)/g;
  const youtubeIdRegexResults = [...raw.matchAll(youtubeIdRegex)];
  const ids = youtubeIdRegexResults.map((match) => match[1]);
  console.log("🎯 Extracted YouTube IDs:", ids);

  // load items into addItem
  for (let i = 0; i < ids.length; i++) {
    addItem(ids[i]);
  }
}

document.getElementById("summon-btn").addEventListener("click", addItem);
