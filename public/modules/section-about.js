export function createSectionAbout() {
    const sectionAbout = document.createElement("section");
    sectionAbout.className = "section-about";
    sectionAbout.id = "about";
    sectionAbout.innerHTML = `
    <h2>Über uns</h2>
    <p id="aboutpaste"></p>
    `;

    async function loadText() {
        try {
            const response = await fetch('/api/about-text');
            const data = await response.json();
            document.getElementById('aboutpaste').innerHTML = data.text; // Use innerHTML for formatted text
        } catch (error) {
            console.error("Failed to load text:", error);
            document.getElementById('aboutpaste').textContent = "⚠ Could not load text.";
        }
    }

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionAbout);

    // Call loadText to fetch and display the text
    loadText();
}