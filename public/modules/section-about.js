import { loadText } from "../js/textLoader.js";

export function createSectionAbout() {
  const sectionAbout = document.createElement("div");
  sectionAbout.className = "container";
  sectionAbout.id = "about";
  sectionAbout.innerHTML = `
    <section class="section-about">
      <img class="head-img" src="img/about_j.jpg" alt="Gruppenfoto">
      <div class="textwrapper">
          <h2>Über uns</h2>
          <p id="about-content"></p>
          
          <!-- Minimaler Audio-Player -->
          <div class="audio-wrapper">
              <button class="player-button" id="play-btn">⏵</button>
              <button class="player-button" id="stop-btn">⏹</button>
              <audio id="about-audio">
                  <source src="media/audio.mp3" type="audio/mpeg">
              </audio>
              <p class="text-small inline">Klubzmer – Lalala Hey Hey (2022 David Guetta Remix)</p>
          </div>
      </div>
    </section>
  `;

  if (!document.querySelector("#about")) {
    document.querySelector("main").append(sectionAbout);
  }

  loadText("about.txt", "about-content");

  // Audio-Player Steuerung
  const audio = sectionAbout.querySelector("#about-audio");
  const playBtn = sectionAbout.querySelector("#play-btn");
  const stopBtn = sectionAbout.querySelector("#stop-btn");

  const togglePlayPause = () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸";
    } else {
      audio.pause();
      playBtn.textContent = "⏵";
    }
  };

  playBtn.addEventListener("click", togglePlayPause);

  stopBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    playBtn.textContent = "⏵";
  });
}
