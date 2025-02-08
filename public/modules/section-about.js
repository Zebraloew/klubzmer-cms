export function createSectionAbout() {
    const sectionAbout = document.createElement("section");
    sectionAbout.className = "section-about";
    sectionAbout.id = "about";
    sectionAbout.innerHTML = `
    <h2>About</h2>
    <p id="testabout">Klubzmer ist ein Kollektiv: Wir sind 12, 14, 16… Freunde, die die Liebe zu osteuropäischer und Klezmer-Musik teilen und mit wild vergnügten Arrangements und Spielfreude Wärme im kühlen Norden verbreiten. Saiten, Bläser, Streicher, Stimme, Akkordeon, Tuba und Percussion bringen die Luft zum Vibrieren und die Hüften zum Schwingen. Anfangs trafen wir uns einfach wöchentlich zur (von Marco Tabilio gegründeten) Jam-Session im Hamburger Gängeviertel – inzwischen haben wir auf Wohnprojektpartys, in Clubs und auf Straßenfesten reihenweise Menschen jeden Alters zum Tanzen gebracht!
   `;

    async function loadText() {
        try {
            const response = await fetch('/api/about-text');
            const data = await response.json();
            document.getElementById('testabout').textContent = data.text;
        } catch (error) {
            console.error("Failed to load text:", error);
            document.getElementById('testabout').textContent = "⚠ Could not load text.";
        }
    }

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionAbout);

    // Call loadText to fetch and display the text
    loadText();
}