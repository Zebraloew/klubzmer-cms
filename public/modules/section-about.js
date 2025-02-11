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
          <p id="about-content"></p>
      </div>
    </section>
  `;

  document.querySelector('main').append(sectionAbout);
  loadText("about.txt", "about-content");
}