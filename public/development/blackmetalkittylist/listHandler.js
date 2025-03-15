/*******************************************************************************  
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
    thumbnail (from youtube)
    videoTitle
- EXECUTE
   DOMContentLoaded
     - load video-list from file
     - Button activation
*/

import { loadRawText } from "../../js/textLoader.js";
import { youtubeIdExtractor } from "../../js/youtubeIdExtractor.js";
import { buttonImport } from "./buttonSave.js";

// New function: buildItemHTML
async function buildItemHTML(value = "", thumbnailOn = true) {
  // Builds item HTML without directly appending to the DOM
  const extract = await youtubeIdExtractor(value);
  let html = `<span class="grip-symbol">☰</span>`;

  // Add thumbnail and title if possible
  if (extract && thumbnailOn) {
    html += await thumbnail(extract);
    html += await videoTitle(extract);
  }

  // Add input + remove span
  html += `\n<input class="input-url" type="text" value="${value}" oninput="updateValue(this)"> \n<span class="remove">✖</span>\n`;

  return html;
}

// Initialize SortableJS
new Sortable(document.getElementById("sortable-list"), {
  animation: 200,
  ghostClass: "sortable-ghost",
});

// Function to add a new item to the list
export async function addItem(preloaded = "", thumbnailOn = true) {
  if (preloaded instanceof Event) preloaded = ""; // Verhindert PointerEvent-Fehler
  let input = document.getElementById("itemInput");
  let value = preloaded ? await preloaded : input.value.trim();
  if (!value) return;

  const list = document.getElementById("sortable-list");
  const li = document.createElement("li");
  // add grip
  li.innerHTML += `<span class="grip-symbol">☰</span>`;
  // add thumbnail
  const extract = await youtubeIdExtractor(value);
  if (extract && thumbnailOn) {
    li.innerHTML += await thumbnail(extract);
    li.innerHTML += await videoTitle(extract);
  }
  // add input
  li.innerHTML += `
    <input class="input-url" type="text" value="${value}" oninput="updateValue(this)"> 
    <span class="remove" >✖</span>
  `;

  li.querySelector(".remove").addEventListener("click", () => removeItem(li));
  // list.appendChild(li);
  list.insertBefore(li, list.firstChild);
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
export async function loadList(listfile = "dev.txt") {
  const raw = await loadRawText(listfile);
  if (!raw) return;
  const rawSplit = raw.split("\n");
  const list = document.getElementById("sortable-list");
  if (!list) return;

  // Gather all items data in parallel
  const itemsData = await Promise.all(
    rawSplit.map(async line => {
      const html = await buildItemHTML(line);
      return { line, html };
    })
  );

  // Now append items in order
  itemsData.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = item.html;
    // Hook remove button
    const removeBtn = li.querySelector(".remove");
    if (removeBtn) {
      removeBtn.addEventListener("click", () => removeItem(li));
    }

    list.appendChild(li);
  });
}

// Youtube Thumbnail
export async function thumbnail(id = "tgbNymZ7vqY") {
  // console.log("thumbnail id: ", id);
  let html =
    '<img class="video-thumbnail" data-video-id="' +
    id +
    '" src="https://img.youtube.com/vi/' +
    id +
    '/hqdefault.jpg" alt="Video Preview">';
  // document.getElementById("sortable-list").innerHTML = html;
  return html;
}

// Fetch video title using YouTube's oEmbed endpoint
export async function videoTitle(id) {
  try {
    // Construct the oEmbed URL for YouTube
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.title) {
      return `<span class="video-title">${data.title}</span>`;
    }
    return `<span class="video-title">Unknown Title</span>`;
  } catch (error) {
    console.error("Error fetching video title:", error); // ✅ Error handling
    return `<span class="video-title">Error fetching title</span>`;
  }
}

// Execute when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  await loadList();
  buttonImport("save-btn");
});

// add button
document.getElementById("summon-btn").addEventListener("click", addItem);
