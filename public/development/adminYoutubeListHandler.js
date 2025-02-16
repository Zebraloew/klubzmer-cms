import { loadRawText } from "./js/textLoader.js";

// ✅ Step 1: Load the video list from "videolist.txt"
const text = await loadRawText("videolist.txt");

// ✅ Step 2: Split the file content by new lines into an array
let list = text.split("\n");

// ✅ Step 3: Filter out empty lines and comments (lines starting with "#")
let listFiltered = [];
for (let i = 0; i < list.length; i++) {
  // Check if line isn't empty and doesn't start with "#"
  if (list[i][0] !== "#" && list[i] !== "") {
    listFiltered.push(list[i]); // ✅ Keep valid video links
  }
}
list = listFiltered; // ✅ Replace original list with filtered list

console.log(list); // ✅ Log the filtered video list for debugging

// ✅ Step 4: Create HTML list items for each video
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
        <!-- Up button moves the item up -->
        <button class="button-video-up">up</button>
        <!-- Down button moves the item down -->
        <button class="button-video-down">down</button>
        <!-- Delete button (not implemented) -->
        <button class="button-video-delete">🗑️</button>
      </div>
    </li>`;
}

// ✅ Step 5: Inject the list into the page
const vesselElement = document.querySelector("#vessel");
if (vesselElement) {
  vesselElement.innerHTML = listDisplay; // ✅ Insert generated HTML into the page
} else {
  console.error("❌ #vessel not found"); // ✅ Log error if element is missing
}
// ✅ Step 6: Add event listeners for "Up" buttons
document.querySelectorAll(".button-video-up").forEach((button, index) => {
  button.addEventListener("click", () => moveItem(index, -1));
});

// ✅ Step 7: Add event listeners for "Down" buttons
document.querySelectorAll(".button-video-down").forEach((button, index) => {
  button.addEventListener("click", () => moveItem(index, 1));
});

/**
 * ✅ Step 8: Function to move a video item up or down
 * @param {number} index - Current index of the item in the list.
 * @param {number} direction - -1 for up, 1 for down.
 */
function moveItem(index, direction) {
  const list = document.querySelector("#vessel"); // Get the container element
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

  // ✅ Step 9: Update event listeners because nodes change after moving
  refreshEventListeners();
}

/**
 * ✅ Step 9: Refresh event listeners to maintain proper functionality
 */
function refreshEventListeners() {
  document.querySelectorAll(".button-video-up").forEach((button, index) => {
    button.replaceWith(button.cloneNode(true)); // Clear old listeners
  });
  document.querySelectorAll(".button-video-down").forEach((button, index) => {
    button.replaceWith(button.cloneNode(true)); // Clear old listeners
  });
  // ✅ Re-add event listeners
  document.querySelectorAll(".button-video-up").forEach((button, index) => {
    button.addEventListener("click", () => moveItem(index, -1));
  });
  document.querySelectorAll(".button-video-down").forEach((button, index) => {
    button.addEventListener("click", () => moveItem(index, 1));
  });
}
