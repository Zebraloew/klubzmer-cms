// youtubeAdmin.js
//
// List of functions
// - Buttons
//   -- attachMoveButtons
//   -- moveVideoItem
//   -- refreshMoveButtons
// - List creation
//   -- loadList
//   -- createListHtml
//   -- injectList

import { loadRawText } from "../js/textLoader.js";

// This function is connecting buttons to the move functions
export function attachMoveButtons(
  button,
  listId = "#vessel",
  direction = "up",
  index
) {
  //  index als Parameter hinzufügen
  if (direction === "up") {
    button.addEventListener("click", () => moveVideoItem(index, -1, listId));
  } else if (direction === "down") {
    button.addEventListener("click", () => moveVideoItem(index, 1, listId));
  }
}

// This function is moving an item up or down
export function moveVideoItem(index, direction, listId = "#vessel") {
  const list = document.querySelector(listId); // Get the container element
  const items = Array.from(list.children); // Convert HTMLCollection to Array
  const currentItem = items[index]; // Get the current item
  const newIndex = index + direction; // Calculate new position

  // ✅ Prevent out-of-bounds moves
  if (newIndex < 0 || newIndex >= items.length) return;

  if (direction === -1) {
    // ✅ Move item up: insert current item before the previous item
    list.insertBefore(currentItem, items[newIndex]);
  } else if (direction === 1) {
    // ✅ Move item down: insert current item after the next item
    const nextItem = items[newIndex].nextSibling;
    list.insertBefore(currentItem, nextItem);
  }
  refreshMoveButtons();
}

// This function is keeping the move buttons aligned with the appropriate items
export function refreshMoveButtons() {
  document.querySelectorAll(".button-video-up").forEach((button, index) => {
    button.replaceWith(button.cloneNode(true)); // Clear old listeners
  });

  document.querySelectorAll(".button-video-down").forEach((button, index) => {
    button.replaceWith(button.cloneNode(true)); // Clear old listeners
  });

  document.querySelectorAll(".button-video-up").forEach((button, index) => {
    button.addEventListener("click", () => moveVideoItem(index, -1));
  });

  document.querySelectorAll(".button-video-down").forEach((button, index) => {
    button.addEventListener("click", () => moveVideoItem(index, 1));
  });
}

export async function loadList(file = "default.txt") {
  // ✅ Step 1: Load the video list from "videolist.txt"
  const text = await loadRawText(file);

  // ✅ Step 2: Split the file content by new lines into an array
  let list = text.split("\n");

  // ✅ Step 3: Filter out empty lines and comments (lines starting with "#")
  let listTemp = [];
  for (let i = 0; i < list.length; i++) {
    // Check if line isn't empty and doesn't start with "#"
    if (list[i][0] !== "#" && list[i] !== "") {
      listTemp.push(list[i]); // ✅ Keep valid video links
    }
  }
  list = listTemp; // ✅ Replace original list with filtered list
  return list;
}

export function createListHtml(list) {
  let listDisplay = "";
  for (let i = 0; i < list.length; i++) {
    listDisplay += `
    <li id="video-${i}" class="li-video">
      <a class="link-video"
        rel="noopener"
          target="_blank"
          href="${list[i]}">
        ${list[i]}
      </a>
      <div class="button-video-container">
          <button class="button-video-up">⬆</button>
          <button class="button-video-down">⬇</button>
          <!-- Delete button (not implemented) -->
          <button class="button-video-delete">🗑️</button>
      </div>
    </li>`;
  }
  return listDisplay;
}

export function injectList(list, listId = "#vessel") {
  const vesselElement = document.querySelector(listId);
  if (vesselElement) {
    vesselElement.innerHTML = list; // Insert generated HTML into the page
  } else {
    console.error("❌ #vessel not found"); // Log error if element is missing
  }
}
