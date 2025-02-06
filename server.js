// Import required modules
const express = require('express'); // Import Express, a web framework for Node.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // Import 'node-fetch' to make HTTP requests
const dotenv = require('dotenv'); // Import 'dotenv' to manage environment variables

dotenv.config(); // Load environment variables from a .env file into process.env

const app = express(); // Create an instance of an Express application
const port = 3000; // Specify the port the server will listen on

// Retrieve the Google Sheets ID and API key from environment variables
const sheetId = process.env.SHEET_ID; // The ID of your Google Sheet
const apiKey = process.env.API_KEY;   // Your Google API key

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for fetching data from Google Sheets
app.get('/api/sheet-data', async (req, res) => {
    try {
        // Construct the URL for the Sheets API request
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`);
        
        // Check if the response is not successful
        if (!response.ok) throw new Error('Error fetching data from Google Sheets');
        
        // Parse the JSON data from the response
        const data = await response.json();
        
        // Send the sheet data as a JSON response
        res.json(data.values);
    } catch (error) {
        // Send an error message as JSON if the request fails
        res.status(500).json({ error: error.message });
    }
});

// Start the server and print a message indicating the server is running
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});