// server.js
const express = require('express'); 
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const { getText, updateText } = require('./utils/textHandler'); // Updated functions

dotenv.config(); 

const app = express(); 
const port = 3000;

app.use(cors());
app.use(express.json());

////// Text Micro CMS //////
// Serve admin panel at `/admin`
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// Route to get text from a file (default: about.txt)
app.get('/api/text', async (req, res) => {
    const filename = req.query.filename || 'about.txt'; // Default to about.txt
    const text = await getText(filename);
    res.json({ filename, text });
});

// Route to update a text file (default: about.txt)
app.post('/api/update-text', async (req, res) => {
    const { text, filename = 'about.txt' } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required." });

    const result = await updateText(text, filename);
    res.json(result);
});

////// Google Sheets API //////
// Retrieve the Google Sheets ID and API key from environment variables
const sheetId = process.env.SHEET_ID;  
const apiKey = process.env.API_KEY;   

if (!sheetId || !apiKey) {
    console.warn('⚠️ Warning: SHEET_ID or API_KEY is missing. Check your .env file!');
}

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Define a route for fetching data from Google Sheets
app.get('/api/sheet-data', async (req, res) => {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:Z100?key=${apiKey}`);
        if (!response.ok) throw new Error('Error fetching data from Google Sheets');

        const data = await response.json();
        res.json(data.values ? data.values : []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

////// Server Startup //////
// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});