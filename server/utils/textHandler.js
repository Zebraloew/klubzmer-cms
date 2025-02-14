// server/utils/textHandler.js
// Handles reading and writing to text files dynamically
// getText(filename) - Reads text from a specified file (defaults to about.txt)
// getRawText(filename) - Reads raw text from a specified file (defaults to about.txt)
// updateText(newText, filename) - Writes new text to a specified file (defaults to about.txt)
// DEVELOPING: updateRawText(newText, filename) - Writes new raw text to a specified file (defaults to about.txt)

const _ = require("lodash");
const fs = require("fs").promises; // Async file system operations
const contentDir = "content"; // Directory where text files are stored
const defaultFile = "about.txt"; // Default file

// Function to read text from a specified file (defaults to about.txt)
async function getText(filename = defaultFile) {
  try {
    const filePath = `${contentDir}/${filename}`;
    const text = await fs.readFile(filePath, "utf-8");
    const paragraphs = _.split(_.trim(text), /\n{2,}/); // Split paragraphs by double newline
    const formattedText = _.map(
      paragraphs,
      (p) => `<p>${p.replace(/\n/g, "<br>")}</p>`
    ).join(""); // Format for display
    return formattedText;
  } catch (error) {
    console.error(`❌ Failed to read file (${filename}):`, error.message);
    return `⚠ Error loading text from ${filename}.`;
  }
}

// Function to just read a file without any formatting
const path = require("path");
async function getRawText(filename = defaultFile) {
  try {
    // Validate filename
    if (!filename || typeof filename !== "string") {
      throw new Error("Invalid filename provided.");
    }

    // Secure file path to prevent directory traversal
    const filePath = path.join(contentDir, path.basename(filename));

    // Read file content
    const text = await fs.readFile(filePath, "utf-8");

    // Return success response
    return { success: true, content: text };
  } catch (error) {
    console.error(`❌ Failed to read file (${filename}):`, error.message);
    return { success: false, error: `⚠ Error loading text from ${filename}.` };
  }
}

// Function to write new text to a specified file (defaults to about.txt)
async function updateText(newText, filename = defaultFile) {
  try {
    const filePath = `${contentDir}/${filename}`;

    // Convert from HTML back to plain text; preserving paragraphs
    const plainText = _.chain(newText)
      .replace(/<\/p><p>/g, "\n\n") // Convert paragraph separation back to double newlines
      .replace(/<br\s*\/?>/gi, "\n") // Convert <br> to newline
      .replace(/^<p>|<\/p>$/g, "") // Remove any surrounding <p> tags
      .value();

    await fs.writeFile(filePath, plainText, "utf-8"); // Write plain text to the file
    console.log(`✅ File updated successfully: ${filename}`);
    return {
      success: true,
      message: `✅ Text updated in ${filename}! Reload to see changes.`,
    };
  } catch (error) {
    console.error(`❌ Failed to update file (${filename}):`, error.message);
    return { success: false, error: `⚠ Error saving text to ${filename}.` };
  }
}

// Function to write unformatted text to a specified file (defaults to about.txt)
async function updateRawText(newText, filename = defaultFile) {
  try {
    const filePath = `${contentDir}/${filename}`;

    const plainText = newText;
    console.log(plainText);

    await fs.writeFile(filePath, plainText, "utf-8"); // Write plain text to the file
    console.log(`✅ File updated successfully: ${filename}`);
    return {
      success: true,
      message: `✅ Text updated in ${filename}! Reload to see changes.`,
    };
  } catch (error) {
    console.error(`❌ Failed to update file (${filename}):`, error.message);
    return { success: false, error: `⚠ Error saving text to ${filename}.` };
  }
}

module.exports = { getText, updateText, getRawText, updateRawText };
