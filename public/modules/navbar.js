export function createNavbar() {
  // Das Burger Menu und die Links oben erstellen
  const nav = document.createElement("nav");
  nav.className = "navbar";
  nav.innerHTML = `
    <input type="checkbox" id="menu-toggle" class="menu-toggle">
    <label for="menu-toggle" class="menu-icon">
      <span></span>
      <span></span>
      <span></span>
    </label>
    <ul class="menu">
      <li><a href="#home">Klubzmer</a></li>
      <li><a href="#gigs">Gigs</a></li>
      <li><a href="#about">Über uns</a></li>
      <li><a href="#contact-container">Kontakt</a></li>
      <li><a href="#videoplayer">Videos</a></li>
    </ul>
    `;

  document.body.prepend(nav);

  // Click schließt das Menu
  document.querySelectorAll(".menu li a").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("menu-toggle").checked = false;
    });
  });
}
