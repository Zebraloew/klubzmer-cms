export function createSectionAbout() {
    const sectionAbout = document.createElement("section");
    sectionAbout.className = "section-about";
    sectionAbout.id = "about";
    sectionAbout.innerHTML = `
    <img src="img/header.jpg" alt="About">
    <h2>About</h2>
    <p>Klubzmer ist ein Kollektiv: Wir sind 12, 14, 16… Freunde, die die Liebe zu osteuropäischer und Klezmer-Musik teilen und mit wild vergnügten Arrangements und Spielfreude Wärme im kühlen Norden verbreiten. Saiten, Bläser, Streicher, Stimme, Akkordeon, Tuba und Percussion bringen die Luft zum Vibrieren und die Hüften zum Schwingen. Anfangs trafen wir uns einfach wöchentlich zur (von Marco Tabilio gegründeten) Jam-Session im Hamburger Gängeviertel – inzwischen haben wir auf Wohnprojektpartys, in Clubs und auf Straßenfesten reihenweise Menschen jeden Alters zum Tanzen gebracht!

* Klubzmer freut sich über Post: info@klubzmer.de *</p>
    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionAbout);
}