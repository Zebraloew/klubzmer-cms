export function createSectionContact() {
    const sectionContact = document.createElement("div");
    sectionContact.className = "container";
    sectionContact.id = "contact-container";
    sectionContact.innerHTML = `
    <section class="section-contact" id="contact">
        <img class="head-img" src="img/hintereinander.jpg" alt="Gruppenfoto">
        <div class="textwrapper">
            <h2>Kontakt</h2>
            <p>
                Wer uns für eine Geburtstagsfeier, eine Hochzeit, einen Gig im eigenen Wohnzimmer oder auf großer Bühne, drinnen oder draußen (unplugged oder verstärkt) buchen möchte, schreibt uns am besten eine Nachricht an:
                info@klubzmer.de
                Aktuelles zu Gigs und andere Neuigkeiten gibt es auch auf unserer Facebook-Seite!
            </p>
        </div>
    </section>
    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionContact);
}