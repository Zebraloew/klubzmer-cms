// textLoader.js
// ♥ Reusable text fetcher with support for multiple files
// loadText("filename.txt", "elementId");
// loadRawText("filename.txt");

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

/**
 * Fetches raw text content from the API and returns it.
 * @param {string} filename - Name of the text file to fetch
 * @returns {Promise<string|null>} Raw text content or null on error
 */
export async function loadRawText(filename) {
  try {
    const response = await fetch(`/api/text-raw?filename=${filename}`);
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();

    // Validate API response structure
    if (data?.text?.success && typeof data.text.content === "string") {
      console.log("✅ Raw Text reading success:", data.text.success);
      console.log("💿 Raw Text content:", data.text.content);
      return data.text.content;
    } else {
      console.warn("⚠ Unexpected API response structure:", data);
      return null;
    }
  } catch (err) {
    console.error(`❌ Failed to load raw text from ${filename}:`, err.message);
    return null;
  }
}
