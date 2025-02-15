// youtubeAdmin.js
//
// List of functions
// -- attachMoveButtons
// -- moveVideoItem
// -- refreshMoveButtons
//

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
