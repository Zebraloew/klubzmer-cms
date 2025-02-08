export function createSectionContact() {
    const sectionContact = document.createElement("section");
    sectionContact.className = "section-contact";
    sectionContact.id = "contact";
    sectionContact.innerHTML = `
    <h2>Kontakt</h2>
    <p>
Wer uns für eine Geburtstagsfeier, eine Hochzeit, einen Gig im eigenen Wohnzimmer oder auf großer Bühne, drinnen oder draußen (unplugged oder verstärkt) buchen möchte, schreibt uns am besten eine Nachricht an:

info@klubzmer.de

Aktuelles zu Gigs und andere Neuigkeiten gibt es auch auf unserer Facebook-Seite!</p>
    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionContact);
}