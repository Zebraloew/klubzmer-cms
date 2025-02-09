export function createSectionImgContact() {
    const sectionImgContact = document.createElement("div");
    sectionImgContact.className = "container wave-container";
    sectionImgContact.id = "img-container-1";
    sectionImgContact.innerHTML = `

    <div class="blur">
        <div class="wave"></div>
    </div>
    <section id="section-img-1" class="ontop">
        <a href="#contact">
            <img src="img/hintereinander_j.jpg" alt="Gruppenfoto">
        </a>
    </section>

    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionImgContact);
}