const videoStart = 1000;
const videoEntry = 270;

export function createSectionLanding() {
    const sectionLanding = document.createElement("section");
    sectionLanding.className = "section-landing";
    sectionLanding.id = "home";
    sectionLanding.innerHTML = `
        <a href="#gigs">
            <img id="jumbo" src="img/Header_3000x2000.jpg" alt="Klubzmer Logo">
            <div id="landingtext">
                <h3> Klubzmer </h3>
                <h2> Klezmer Musik Band </h2>
                <p>Handmade Guerilla Klezmer from Hamburg</p>
            </div>
        </a>
    `;

    document.querySelector("body").prepend(sectionLanding);

    // Delay video insertion by 10 seconds
    setTimeout(() => {
        const videoContainer = document.createElement("div");
        videoContainer.id = "video-wrapper";
        videoContainer.innerHTML = `
            <video id="promo-video" src="video/klubzmer-2022-schaltzentrale.mp4" 
            controls 
            autoplay 
            muted
            
            ></video>
            <div id="pixel-grid"></div> 

        `;
        sectionLanding.appendChild(videoContainer);

        const video = document.getElementById("promo-video");
        video.onloadedmetadata = () => {
            video.currentTime = videoEntry; // Start at 1 minute in
            video.playbackRate = 0.8; // Set speed to 0.5x (half speed)
            this.width = this.videoWidth; // Ensure full resolution
            this.height = this.videoHeight;

        };
    }, videoStart); // 10 seconds delay
}