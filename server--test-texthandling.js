const express = require('express');
const cors = require('cors');
const { getText, updateText } = require('./developing/text-from-web/js/textHandler'); // Import text functions

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('developing/text-from-web/public2'));

// Route to get the current about text
app.get('/api/about-text', async (req, res) => {
    const text = await getText();
    res.json({ text });
});

// Route to update the text
app.post('/api/update-text', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required." });

    const result = await updateText(text);
    res.json(result);
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});