async function fetchSheetData() {
    try {
        // Fetch data from the server endpoint
        const response = await fetch('/api/sheet-data');
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Find the element where the table will be placed
        const sheetDataDiv = document.getElementById('sheet-data');

        // Create a new table element
        const table = document.createElement('table');

        // Iterate over each row of data received from the server
        data.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');

            // Iterate over each cell in the row
            row.forEach(cell => {
                // Create and populate cell elements
                const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td');
                cellElement.textContent = cell;

                // Append the cell to the row
                tr.appendChild(cellElement);
            });

            // Append the row to the table
            table.appendChild(tr);
        });

        // Clear any previous content
        sheetDataDiv.innerHTML = '';

        // Append the newly created table to the 'sheet-data' div
        sheetDataDiv.appendChild(table);
    } catch (error) {
        const sheetDataElement = document.getElementById('sheet-data');
        sheetDataElement.style.color = 'beige';
        sheetDataElement.textContent = `Error fetching data: ${error.message} ••• start server with »node server.js«`;
    }
}

fetchSheetData(); // Call the function to fetch and display the table