export function createSectionImgContact() {
    const sectionImgContact = document.createElement("div");
    sectionImgContact.className = "container wave-container";
    sectionImgContact.id = "img-container-1";
    sectionImgContact.innerHTML = `
        <div class="wave"></div>

        <section id="section-img-1" class="ontop">
            <img class="" src="img/hintereinander_j.jpg" alt="Gruppenfoto">
        </section>
    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionImgContact);
}