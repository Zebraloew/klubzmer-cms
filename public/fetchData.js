async function fetchData() {
    try {
        // Fetch data from the server endpoint '/api/sheet-data'
        const response = await fetch('/api/sheet-data');

        // Check if the network response was successful (status code 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Pass the parsed data to the displayData function for rendering
        displayData(data);
    } catch (error) {
        // If an error occurs, display an error message in the 'sheet-data' element
        document.getElementById('sheet-data').textContent = `Error fetching data: ${error.message}`;
    }
}

// Define the function to display the data in a table format
function displayData(rows) {
    // Find the element where the table will be rendered
    const sheetDataDiv = document.getElementById('sheet-data');

    // Create a new table element
    const table = document.createElement('table');

    // Create a header row for TOURDATES
    const headerRow = document.createElement('tr');
    const headerCell = document.createElement('th');
    headerCell.colSpan = rows[0].length; // Span the header across all columns
    headerCell.textContent = 'TOURDATES';
    headerRow.appendChild(headerCell);
    table.appendChild(headerRow);

    // Iterate over each row of data received from the server
    rows.forEach((row, rowIndex) => {
        // Create a new table row element
        const tr = document.createElement('tr');

        // Iterate over each cell in the row
        row.forEach(cell => {
            // Create a table header ('th') for the first data row, otherwise create table data ('td')
            const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td');

            // Set the text content of the cell
            cellElement.textContent = cell;

            // Append the cell to the current row
            tr.appendChild(cellElement);
        });

        // Append the row to the table
        table.appendChild(tr);
    });

    // Clear any previous content from 'sheet-data' div
    sheetDataDiv.innerHTML = '';

    // Append the newly created table to the 'sheet-data' div
    sheetDataDiv.appendChild(table);
}