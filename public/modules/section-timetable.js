export function createSectionTimetable() {
  const sectionTimetable = document.createElement("div");
  sectionTimetable.className = "container wave-container";
  sectionTimetable.id = "timetable-container";
  sectionTimetable.innerHTML = `
    <div class="blur">
        <div class="wave"></div>
    </div>
    <section class="section-timetable" id="gigs">
        <h2>Gigs</h2>
        <div id="sheet-data">
        <h1>Konzerte werden geladen <span class="rotating">😺</span></h1>
        </div>
        <p>    Das reicht euch nicht?
        <br>   Bucht uns unter:
        <br>   <a href="mailto:info@klubzmer.de">info<span class="atsign">@</span>klubzmer.de</a></p>
    </section>
    `;

  // Correctly append the section to the <main> element
  document.querySelector("main").append(sectionTimetable);
}
