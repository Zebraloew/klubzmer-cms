async function fetchData() {
    try {
        const response = await fetch('/api/sheet-data');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        displayData(data);
    } catch (error) {
        document.getElementById('sheet-data').textContent = `Error fetching data: ${error.message}`;
    }
}