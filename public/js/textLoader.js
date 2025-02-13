// textLoader.js
// ♥ Reusable text fetcher with support for multiple files
/**
 * @param {string} filename - Name of the text file to fetch
 * @param {string} elementId - DOM element to populate
 * @returns {Promise<void>}
 */
export async function loadText(filename, elementId) {
  try {
    const response = await fetch(`/api/text?filename=${filename}`);
    const data = await response.json();
    document.getElementById(elementId).innerHTML = data.text;
    // console.log(data.text);
  } catch (err) {
    console.error(`⚠ Failed to load ${filename}:`, err);
  }
}

export async function loadRawText(filename, elementId) {
  try {
    const response = await fetch(`/api/text-raw?filename=${filename}`);
    const data = await response.json();
    document.getElementById(elementId).innerHTML = data.text.content;
    console.log("Raw Text reading success?" + data.text.success);
  } catch (err) {
    console.error(`⚠ Failed to load ${filename}:`, err);
  }
}