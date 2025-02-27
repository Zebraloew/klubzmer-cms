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

  // ✅ **Preload hidden video early**
  const preloadedVideo = document.createElement("video");
  preloadedVideo.id = "preload-video";
  preloadedVideo.src = "video/klubzmer-2022-schaltzentrale.mp4";
  preloadedVideo.preload = "auto";
  preloadedVideo.muted = true;
  preloadedVideo.style.display = "none"; // Hidden
  document.body.appendChild(preloadedVideo);

  // ✅ **Use the 6 seconds to fully load the video**
  setTimeout(() => {
    const videoContainer = document.createElement("div");
    videoContainer.id = "video-wrapper";
    videoContainer.innerHTML = `
        <video poster="img/Header_3000.jpg" id="promo-video"
            controls 
            autoplay 
            muted
        ></video>
        <div id="pixel-grid"></div> 
        <img src="../img/Klubzmerlogo.png" alt="Klubzmer Logo" id="logo">
    `;
    sectionLanding.appendChild(videoContainer);

    const promoVideo = document.getElementById("promo-video");

    // ✅ **Replace video src instantly to avoid loading spinner**
    promoVideo.src = preloadedVideo.src;
    promoVideo.load();
    
    promoVideo.onloadedmetadata = () => {
      promoVideo.currentTime = 270; // Start at 4m30s
      promoVideo.playbackRate = 0.8;
    };

    // ✅ **Visibility observer to pause video when offscreen**
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            promoVideo.pause();
          } else {
            promoVideo.play();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(videoContainer);

    // ✅ **Remove the preloaded hidden video**
    preloadedVideo.remove();
  }, 6000); // Delay matches the initial 6s image display

  // ✅ **Ensure service worker caches the video**
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("Service Worker Registered ✅"))
      .catch((error) => console.error("Service Worker Registration Failed ❌", error));
  }
}