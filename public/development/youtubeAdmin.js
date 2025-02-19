// youtubeAdmin.js
//
// List of functions
// MAIN
// -listCreator
// HELPER
//   -- loadList
//   -- generateVideoListHtml
//   -- renderVideoList
//   -- previewImage
// -Buttons
//   -- attachMoveButtons
//   -- moveVideoItem
//   -- refreshMoveButtons
//   -- buttonMovement
// -add Link
//   -- addLink
import { loadRawText } from "../js/textLoader.js";
import { youtubeIdExtractor } from "../js/youtubeIdExtractor.js";

export async function listCreator(file = "dev.txt", listId = "#vessel") {
  const list = await loadList(file);
  const listDisplay = await generateVideoListHtml(list);
  await renderVideoList(listDisplay, listId);
  await buttonMovement();
  addLink(listId);
}

export async function loadList(file = "default.txt") {
  //   Step 1: Load the video list from "videolist.txt"
  const text = await loadRawText(file);

  //   Step 2: Split the file content by new lines into an array
  let list = text.split("\n");

  //   Step 3: Filter out empty lines and comments (lines starting with "#")
  let listFiltered = [];
  for (let i = 0; i < list.length; i++) {
    // Check if line isn't empty and doesn't start with "#"
    if (list[i][0] !== "#" && list[i] !== "") {
      listFiltered.push(list[i]); //   Keep valid video links
    }
  }
  list = listFiltered; //   Replace original list with filtered list
  return list;
}

export async function generateVideoListHtml(list) {
  let listDisplay = "";
  const youtubeIds = await youtubeIdExtractor(list);
  console.log(youtubeIds[0]);
  for (let i = 0; i < list.length; i++) {
    listDisplay += `
    <li id="video-${i}" class="li-video">
      <span class="grip-symbol">☰</span> 
      <div class="button-video-container">
          <button class="button-video-up">⬆</button>
          <button class="button-video-down">⬇</button>
          <!-- Delete button (not implemented) -->
          <button class="button-video-delete">🗑️</button>
      </div>

      <img class="video-thumbnail" src="https://img.youtube.com/vi/${youtubeIds[i]}/hqdefault.jpg" alt="Video Preview">
      <a class="li-video-image"
        rel="noopener"
          target="_blank"
          href="${list[i]}">
        ${list[i]}
      </a>
    </li>`;
  }
  return listDisplay;
}

export async function renderVideoList(list, listId = "#vessel") {
  const vesselElement = document.querySelector(listId);
  if (vesselElement) {
    vesselElement.innerHTML = list; // Insert generated HTML into the page
    await enableDragAndDrop(listId); // ✅ Enable drag-and-drop after rendering
    await enableDeleteButtons(listId); // ✅ Aktiviert die Löschbuttons
  } else {
    console.error("❌ #vessel not found"); // Log error if element is missing
  }
}

// This function is connecting buttons to the move functions
export async function attachMoveButtons(
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

  //   Prevent out-of-bounds moves
  if (newIndex < 0 || newIndex >= items.length) return;

  if (direction === -1) {
    //   Move item up: insert current item before the previous item
    list.insertBefore(currentItem, items[newIndex]);
  } else if (direction === 1) {
    //   Move item down: insert current item after the next item
    const nextItem = items[newIndex].nextSibling;
    // list.insertBefore(currentItem, nextItem);
    list.insertBefore(currentItem, items[newIndex].nextSibling || null);
  }
  refreshMoveButtons();
}

// This function is keeping the move buttons aligned with the appropriate items
export async function refreshMoveButtons() {
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

async function buttonMovement(
  upButtonClass = ".button-video-up",
  downButtonClass = ".button-video-down"
) {
  document.querySelectorAll(upButtonClass).forEach((button, index) => {
    button.addEventListener("click", () => moveVideoItem(index, -1));
  });
  document.querySelectorAll(downButtonClass).forEach((button, index) => {
    button.addEventListener("click", () => moveVideoItem(index, 1));
  });
}

// Drag-and-Drop Video List Module integrated into youtubeAdmin.js
export async function enableDragAndDrop(listId = "#vessel") {
  const list = document.querySelector(listId);
  let draggedItem = null;

  list.querySelectorAll("li").forEach((item) => {
    item.setAttribute("draggable", true); // ✅ Make items draggable

    item.addEventListener("dragstart", (e) => {
      draggedItem = item; // ✅ Store dragged item
      e.dataTransfer.effectAllowed = "move";
    });

    item.addEventListener("dragover", (e) => {
      e.preventDefault(); // ✅ Allow drop
      e.dataTransfer.dropEffect = "move";
    });

    item.addEventListener("drop", (e) => {
      e.preventDefault();
      if (draggedItem !== item) {
        const listChildren = Array.from(list.children);
        const draggedIndex = listChildren.indexOf(draggedItem);
        const targetIndex = listChildren.indexOf(item);

        list.removeChild(draggedItem); // ✅ Remove dragged item
        list.insertBefore(
          draggedItem,
          targetIndex > draggedIndex ? item.nextSibling : item
        ); // ✅ Insert at new position
        refreshMoveButtons(); // ✅ Aktualisiert die Buttons nach Drag-and-Drop
      }
    });
  });
}

// Delete Button
export async function enableDeleteButtons(listId = "#vessel") {
  const list = document.querySelector(listId);
  list.querySelectorAll(".button-video-delete").forEach((button) => {
    button.addEventListener("click", (e) => {
      const item = button.closest("li"); // ✅ Finde das übergeordnete Listenelement
      list.removeChild(item); // ✅ Entferne es aus der Liste
    });
  });
}

function addLink(htmlContainer = "#vessel") {
  const addLink = document.createElement("li");
  addLink.className = "li-video add-link";
  addLink.innerHTML = `
    <h3>Link hinzufügen</h3>
    <form>
      <input type="text" name="link" placeholder="Link eingeben">
      <button type="submit">Hinzufügen</button>
    </form>
  `;
  const vesselElement = document.querySelector(htmlContainer);
  vesselElement.append(addLink);
}
