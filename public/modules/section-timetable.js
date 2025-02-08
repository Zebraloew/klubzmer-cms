export function createSectionTimetable() {
    const sectionTimetable = document.createElement("section");
    sectionTimetable.className = "section-timetable";
    sectionTimetable.id = "gigs";
    sectionTimetable.innerHTML = `
    <h2>Gigs</h2>
    <div id="sheet-data"></div>
    <p>    Das reicht euch nicht?
    <br>   Bucht uns unter:
    <br>   <a href="mailto:info@klubzmer.de">info@klubzmer.de</a></p>
    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionTimetable);
}