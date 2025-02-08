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

        // Container for header labels
        let headers = [];

        // Iterate over each row of data received from the server
        data.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');

            row.forEach((cell, colIndex) => {
                // Use header labels from the first row
                if (rowIndex === 0) {
                    const th = document.createElement('th');
                    th.textContent = cell;
                    tr.appendChild(th);
                    headers[colIndex] = cell; // Save header text for later rows
                } else {
                    const td = document.createElement('td');
                    td.textContent = cell;

                    // Add data-label attribute using corresponding header
                    if (headers[colIndex]) {
                        td.setAttribute('data-label', headers[colIndex]);
                    }

                    tr.appendChild(td);
                }
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
        sheetDataElement.style.color = 'var(--love)';
        sheetDataElement.textContent = `Error fetching data: ${error.message} ••• start server with »node server.js«`;
    }
}

fetchSheetData(); // Call the function to fetch and display the table