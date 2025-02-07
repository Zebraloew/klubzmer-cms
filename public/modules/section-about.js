export function createSectionAbout() {
    const sectionAbout = document.createElement("section");
    sectionAbout.className = "section-about";
    sectionAbout.innerHTML = `
    <img src="img/header.jpg" alt="About">
    <h2>About</h2>
    <p>This is a simple web page.</p>
    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionAbout);
}