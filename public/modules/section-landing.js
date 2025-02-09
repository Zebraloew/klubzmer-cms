export function createSectionLanding() {
    const sectionLanding = document.createElement("section");
    sectionLanding.className = "section-landing";
    sectionLanding.id = "home";
    sectionLanding.innerHTML = `
    
    <a href="#gigs">
        <img id="jumbo" src="img/Header_3000x2000.jpg" alt="Klubzmer Logo">
        <div id="landingtext">
            <h3> Klubzmer </h3>
            <h2> Klezmer Musik Band </h2>
            <!--<p>Saiten, Bläser, Streicher, Stimme, Akkordeon, Tuba und Percussion bringen die Luft zum Vibrieren und die Hüften zum Schwingen</p> -->
            <p>Handmade Guerilla Klezmer from Hamburg</p>
        </div>
    </a>
    `;

    document.querySelector('body').prepend(sectionLanding);
}