// textLoader.js
// ♥ Reusable text fetcher with type annotations
/**
 * @param {string} endpoint - API endpoint
 * @param {string} elementId - DOM element to populate
 * @returns {Promise<void>}
 */
export async function loadText(endpoint, elementId) {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      document.getElementById(elementId).innerHTML = data.text;
    } catch (err) {
      console.error("Failed to load:", err);
    }
  }