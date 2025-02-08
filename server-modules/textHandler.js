// CMS kind of
// Read and write to a text file

const fs = require('fs').promises; // Async file system operations
const textFile = 'content/about.txt'; // Path to the text file

// Function to read text from the file and replace newline characters
async function getText() {
    try {
        const text = await fs.readFile(textFile, 'utf-8');
        const paragraphs = text.trim().split(/\n{2,}/);
        const formattedText = paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
        return formattedText;   
    } catch (error) {
        console.error("❌ Failed to read text file:", error.message);
        return "⚠ Error loading text.";
    }
}

// Function to write new text to the file, converting <br> back into newline characters
async function updateText(newText) {
    try {
        const formattedText = newText.replace(/<br\s*\/?>/gi, '\n'); // Convert <br> to newline
        await fs.writeFile(textFile, formattedText, 'utf-8');
        console.log("✅ Text file updated successfully!");
        return { success: true, message: "✅ Text updated! Reload to see changes." };
    } catch (error) {
        console.error("❌ Failed to update text file:", error.message);
        return { success: false, error: "⚠ Error saving text." };
    }
}

module.exports = { getText, updateText };