const sheetId = 'YOUR_SHEET_ID_HERE'; // Replace with your actual sheet ID
const apiKey = 'YOUR_API_KEY_HERE';   // Replace with your API key

async function fetchData() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`);
    const data = await response.json();
    const sheetDataDiv = document.getElementById('sheet-data');
    
    if (response.ok) {
        // Displaying data in a simple table
        const table = document.createElement('table');
        data.values.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
        sheetDataDiv.appendChild(table);
    } else {
        sheetDataDiv.textContent = 'Error fetching data';
    }
}

fetchData();