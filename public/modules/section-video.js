export function createSectionVideo() {
    const sectionVideo = document.createElement("div");
    sectionVideo.className = "container ";
    sectionVideo.id = "section-video";
    sectionVideo.innerHTML = `

    <section id="video-container" class="">
        <video src="video/klubzmer-2022-schaltzentrale.mp4" controls autoplay></video>
    </section>

    `;

    // Correctly append the section to the <main> element
    document.querySelector('main').append(sectionVideo);
}