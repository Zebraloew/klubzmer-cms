export function createSectionAbout() {
    const sectionAbout = document.createElement("div");
    sectionAbout.className = "container";
    sectionAbout.id = "about";
    sectionAbout.innerHTML = `
    <section class="section-about">
        <img class="head-img" src="img/about_j.jpg" alt="Gruppenfoto">
        <div class="textwrapper">
            <h2>Über uns</h2>
            <p id="aboutpaste"></p>
        </div>
    </section>
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