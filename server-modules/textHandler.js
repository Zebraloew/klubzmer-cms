// CMS kind of
// Read and write to a text file

const fs = require('fs').promises; // Async file system operations
const textFile = 'content/about.txt'; // Path to the text file

// Function to read text from the file
async function getText() {
    try {
        const text = await fs.readFile(textFile, 'utf-8');
        return text.trim();
    } catch (error) {
        console.error("❌ Failed to read text file:", error.message);
        return "⚠ Error loading text.";
    }
}

// Function to write new text to the file
async function updateText(newText) {
    try {
        await fs.writeFile(textFile, newText, 'utf-8');
        console.log("✅ Text file updated successfully!");
        return { success: true, message: "✅ Text updated!" };
    } catch (error) {
        console.error("❌ Failed to update text file:", error.message);
        return { success: false, error: "⚠ Error saving text." };
    }
}

module.exports = { getText, updateText };