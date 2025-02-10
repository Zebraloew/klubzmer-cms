import { loadText } from "../textLoader.js";

export function createSectionAbout() {
  const sectionAbout = document.createElement("div");
  sectionAbout.className = "container";
  sectionAbout.id = "about";
  sectionAbout.innerHTML = `
    <section class="section-about">
      <img class="head-img" src="img/about_j.jpg" alt="Gruppenfoto">
      <div class="textwrapper">
          <h2>Über uns</h2>
          <p id="aboutpaste"></p>
      </div>
    </section>
  `;

  document.querySelector('main').append(sectionAbout);
  loadText("/api/about-text", "aboutpaste");
}