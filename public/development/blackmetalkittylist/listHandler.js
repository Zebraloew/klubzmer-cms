/*  
listHandler.js

# Sortable List
The goal is an admin tool for managing the youtube videos.

# Contains:
- FUNCTIONS
    Sortable
    addItem
    removeItem
    updateValue
    loadList
    saveToFile
- EXECUTE
   DOMContentLoaded
     - load video-list from file
     - Button activation
*/

import { buttonImport } from "./buttonSave.js";

// Initialize SortableJS
new Sortable(document.getElementById("sortable-list"), {
  animation: 200,
  ghostClass: "sortable-ghost",
});

// Function to add a new item to the list
export async function addItem(preloaded = "") {
  if (preloaded instanceof Event) preloaded = ""; // Verhindert PointerEvent-Fehler
  let input = document.getElementById("itemInput");
  let value = preloaded ? await preloaded : input.value.trim();
  if (!value) return;

  const list = document.getElementById("sortable-list");
  const li = document.createElement("li");
  li.innerHTML = `<input type="text" value="${value}" oninput="updateValue(this)"> 
                      <span class="remove" >✖</span>`;
  li.querySelector(".remove").addEventListener("click", () => removeItem(li));
  list.appendChild(li);
  input.value = "";
}

// Function to remove an item from the list
export function removeItem(element) {
  element.remove();
}

// Function to log changes in input fields
export function updateValue(input) {
  console.log("Updated:", input.value);
}

// load list from file
import { loadRawText } from "../../js/textLoader.js";
export async function loadList(listfile = "dev.txt") {
  const raw = await loadRawText(listfile);
  const rawSplit = raw.split("\n");
  for (let i = 0; i < rawSplit.length; i++){
    addItem(rawSplit[i]);
  }
}

// Execute when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  loadList();
  buttonImport("save-btn"); 
});
document.getElementById("summon-btn").addEventListener("click", addItem);