async function fetchFirstCell() {
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

        // Create a table row
        const row = document.createElement('tr');

        // Create a cell for the first value, with fallback text if empty
        const cell = document.createElement('td');
        cell.textContent = (data.length > 0 && data[0].length > 0) ? data[0][0] : 'No Data';

        // Append the cell to the row
        row.appendChild(cell);

        // Append the row to the table
        table.appendChild(row);

        // Clear any previous content
        sheetDataDiv.innerHTML = '';

        // Append the newly created table to the 'sheet-data' div
        sheetDataDiv.appendChild(table);
    } catch (error) {
        document.getElementById('sheet-data').textContent = `Error fetching data: ${error.message}`;
    }
}

fetchFirstCell(); // Call the function to fetch and display the first cell