async function fetchData() {
    try {
        // Static data for demonstration purposes
        const staticData = [
            ['Date', 'Location', 'Details'],
            ['2023-11-01', 'Berlin', 'Concert at the Arena'],
            ['2023-12-05', 'Munich', 'Festival Appearance'],
        ];

        // Pass the static data to the displayData function for rendering
        displayData(staticData);
    } catch (error) {
        // Display an error message in case something unexpected occurs
        document.getElementById('sheet-data').textContent = `Error displaying data: ${error.message}`;
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

    // Iterate over each row of static data
    rows.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td');
            cellElement.textContent = cell;
            tr.appendChild(cellElement);
        });
        table.appendChild(tr);
    });

    // Clear any previous content from 'sheet-data' div
    sheetDataDiv.innerHTML = '';

    // Append the newly created table to the 'sheet-data' div
    sheetDataDiv.appendChild(table);
}