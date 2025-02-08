export function createSectionLanding() {
    const sectionLanding = document.createElement("section");
    sectionLanding.className = "section-landing";
    sectionLanding.id = "home";
    sectionLanding.innerHTML = `
    <img src="img/Klubzmerlogo_big.png" alt="Klubzmer Logo">
    <h1>Klubzmer</h1>
    <p>Willkommen bei Klubzmer</p>
    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionLanding);
}