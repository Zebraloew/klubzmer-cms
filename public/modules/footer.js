export function createFooter() {
    const footer = document.createElement("footer");
    footer.innerHTML = `
    <container>
        <a href="" rel="noopener noreferrer" target="_blank">Impressum</a>
    </container>

    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(footer);
}