export function createSectionContact() {
    const sectionContact = document.createElement("div");
    sectionContact.className = "container";
    sectionContact.id = "contact-container";
    sectionContact.innerHTML = `
    <section class="section-contact" id="contact">
        <!-- <img class="head-img" src="img/hintereinander.jpg" alt="Gruppenfoto"> -->
        <div class="textwrapper">
            <h2>Kontakt</h2>
            <p> Wer uns für eine Geburtstagsfeier, eine Hochzeit, einen Gig im eigenen Wohnzimmer oder auf großer Bühne, drinnen oder draußen (unplugged oder verstärkt) buchen möchte, schreibt uns am besten eine Nachricht an:</p>
            <a id="main-contact-link" href="mailto:info@klubzmer.de">info<span class="atsign">@</span>klubzmer.de</a>
            <p>Aktuelles zu Gigs und andere Neuigkeiten gibt es auch auf unserer 
            <br> <a href="https://www.facebook.com/hamburgerklubzmer/" target="_blank" rel="noopener noreferrer">Facebook-Seite!</a>
            </p>
        </div>
    </section>

    <!-- Testing shadow at bottom -->
    <div class="width-restrictor">
        <div class="shadow"></div>
    </div>
    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionContact);
}