export function createSectionTimetable() {
    const sectionTimetable = document.createElement("section");
    sectionTimetable.className = "section-timetable";
    sectionTimetable.id = "gigs";
    sectionTimetable.innerHTML = `
    <h2>Timetable</h2>
    <div id="sheet-data"></div>
    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionTimetable);
}