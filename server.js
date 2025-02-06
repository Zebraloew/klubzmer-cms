// Import required modules
const express = require('express'); 
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');

dotenv.config(); 

const app = express(); 
const port = 3000;

// Retrieve the Google Sheets ID and API key from environment variables
const sheetId = process.env.SHEET_ID;  
const apiKey = process.env.API_KEY;   

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for fetching data from Google Sheets
app.get('/api/sheet-data', async (req, res) => {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1?key=${apiKey}`);
        if (!response.ok) throw new Error('Error fetching data from Google Sheets');
        
        const data = await response.json();
        
        res.json(data.values ? data.values : []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});