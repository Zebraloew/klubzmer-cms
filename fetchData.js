const sheetId = '1DUgBEpNiNear4spHeeysMkhfGlInb-StFHKaeO2laos'; // Your sheet ID
const apiKey = 'AIzaSyAMjyZmxOgjbUEMXgibbUSDsWu_VnvxQYg';       // Your API key

async function fetchData() {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        displayData(data.values);
    } catch (error) {
        document.getElementById('sheet-data').textContent = `Error fetching data: ${error.message}`;
    }
}

function displayData(rows) {
    const sheetDataDiv = document.getElementById('sheet-data');
    const table = document.createElement('table');
    
    rows.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td'); // Use 'th' for headers
            cellElement.textContent = cell;
            tr.appendChild(cellElement);
        });
        table.appendChild(tr);
    });
    
    sheetDataDiv.innerHTML = ''; // Clear any previous content
    sheetDataDiv.appendChild(table);
}

fetchData();