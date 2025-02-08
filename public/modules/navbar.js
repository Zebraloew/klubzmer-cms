export function createNavbar() {
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
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#gigs">Gigs</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    `;

    document.body.prepend(nav);

    // Add event listener to close menu on link click
    document.querySelectorAll('.menu li a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('menu-toggle').checked = false;
        });
    });
}