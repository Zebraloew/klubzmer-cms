// utils/textHandler.js
// CMS kind of
// Read and write to a text file

const _ = require('lodash');
const fs = require('fs').promises; // Async file system operations
const textFile = 'content/about.txt'; // Path to the text file

// Function to read text from the file
async function getText() {
    try {
        const text = await fs.readFile(textFile, 'utf-8');
        const paragraphs = _.split(_.trim(text), /\n{2,}/); // Split paragraphs by double newline
        const formattedText = _.map(paragraphs, p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join(''); // Format for display
        return formattedText;
    } catch (error) {
        console.error("❌ Failed to read text file:", error.message);
        return "⚠ Error loading text.";
    }
}

// Function to write new text to the file
async function updateText(newText) {
    try {
        // Convert from HTML back to plain text; preserving paragraphs
        const plainText = _.chain(newText)
            .replace(/<\/p><p>/g, '\n\n') // Convert paragraph separation back to double newlines
            .replace(/<br\s*\/?>/gi, '\n') // Convert <br> to newline
            .replace(/^<p>|<\/p>$/g, '') // Remove any surrounding <p> tags
            .value();
        
        await fs.writeFile(textFile, plainText, 'utf-8'); // Write plain text to the file
        console.log("✅ Text file updated successfully!");
        return { success: true, message: "✅ Text updated! Reload to see changes." };
    } catch (error) {
        console.error("❌ Failed to update text file:", error.message);
        return { success: false, error: "⚠ Error saving text." };
    }
}

module.exports = { getText, updateText };