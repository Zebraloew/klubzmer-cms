export function createSectionImgContact() {
    const sectionImgContact = document.createElement("div");
    sectionImgContact.className = "container";
    sectionImgContact.id = "img-container-1";
    sectionImgContact.innerHTML = `
        <section class="section-img" id="section-img-1">
            <img class="" src="img/hintereinander_j.jpg" alt="Gruppenfoto">
    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionImgContact);
}