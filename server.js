// Import required modules
const express = require('express'); 
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');

const cors = require('cors');
const { getText, updateText } = require('./developing/text-from-web/js/textHandler'); // Import text functions

dotenv.config(); 

const app = express(); 
const port = 3000;

app.use(cors());
app.use(express.json());

////// Text Micro CMS //////
// Serve admin panel at `/admin`
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html');
});

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

////// Google Sheets API //////
// Retrieve the Google Sheets ID and API key from environment variables
const sheetId = process.env.SHEET_ID;  
const apiKey = process.env.API_KEY;   

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for fetching data from Google Sheets
app.get('/api/sheet-data', async (req, res) => {
    try {
        // Adjust the range from 'Sheet1!A1' to the desired range, e.g., 'Sheet1!A1:Z100' for a large area
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:Z100?key=${apiKey}`);
        if (!response.ok) throw new Error('Error fetching data from Google Sheets');

        const data = await response.json();
        
        // Send the fetched data as a JSON response
        res.json(data.values ? data.values : []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

////// Server Startup //////
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});