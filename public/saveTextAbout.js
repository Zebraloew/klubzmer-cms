export default async function saveTextAbout() {
    const plainText = document.getElementById('adminAboutText').value;

    const formattedText = _.chain(plainText)
        .split(/\n{2,}/)
        .map(paragraph => `<p>${_.replace(paragraph, /\n/g, '<br>')}</p>`)
        .join('')
        .value();

    try {
        const response = await fetch('/api/update-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: formattedText })
        });
        const result = await response.json();
        document.getElementById('status').textContent =
            result.message || '⚠ Error saving text.';
    } catch (error) {
        console.error('Failed to save text:', error);
        document.getElementById('status').textContent = '⚠ Could not save text.';
    }
}