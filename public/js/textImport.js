async function fetchAndReplaceText() {
    try {
        const response = await fetch('/api/sheet-data');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        if (!data || data.length < 2) {
            throw new Error('Insufficient data from Google Sheets');
        }

        // Convert the first row into keys and the second row into values
        const keys = data[0];  // Header row (keys)
        const values = data[1]; // First content row (values)

        const sheetDataObject = {};
        keys.forEach((key, index) => {
            sheetDataObject[key] = values[index] || ''; // Assign values or empty string if undefined
        });

        console.log('Sheet Data:', sheetDataObject);

        // Replace text in elements with the corresponding data
        document.querySelectorAll('[data-replace]').forEach(element => {
            const key = element.getAttribute('data-replace');
            if (sheetDataObject[key]) {
                element.textContent = sheetDataObject[key];
            }
        });

    } catch (error) {
        console.error('Error fetching and replacing text:', error);
        document.querySelectorAll('[data-replace]').forEach(element => {
            element.style.color = 'var(--love)'; // Apply error styling
            element.textContent = `⚠ Error loading content ⚠`;
        });
    }
}

// Execute on page load
fetchAndReplaceText();