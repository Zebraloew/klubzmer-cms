const videoStart = 6000;
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
            <video poster="img/Header_3000.jpg" preload="auto" id="promo-video" src="video/klubzmer-2022-schaltzentrale.mp4" 
            controls 
            autoplay 
            muted
            
            ></video>
            <div id="pixel-grid"></div> 
            <img src="../img/Klubzmerlogo.png" alt="Klubzmer Logo" id="logo">

        `;
    sectionLanding.appendChild(videoContainer);

    const video = document.getElementById("promo-video");
    video.onloadedmetadata = () => {
      video.currentTime = videoEntry; // Start at 1 minute in
      video.playbackRate = 0.8; // Set speed to 0.5x (half speed)
      video.width = video.videoWidth; // Ensure full resolution
      video.height = video.videoHeight;
    };

    // Pause video when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            video.pause(); // Pause when not visible
          } else {
            video.play(); // Resume when visible
          }
        });
      },
      { threshold: 0.1 }
    ); // Adjust threshold if needed

    observer.observe(videoContainer);
  }, videoStart); // 10 seconds delay

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("Service Worker Registered ✅");
      })
      .catch((error) => {
        console.error("Service Worker Registration Failed ❌", error);
      });
  }
}
