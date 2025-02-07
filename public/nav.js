export function createNavbar() {
    const nav = document.createElement("nav");
    nav.className = "navbar";
    nav.innerHTML = `
        <nav class="navbar">
    <input type="checkbox" id="menu-toggle" class="menu-toggle">
    <label for="menu-toggle" class="menu-icon">
      <span></span>
      <span></span>
      <span></span>
    </label>
    <ul class="menu">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
    `;

    document.body.prepend(nav);

    // Burger menu functionality
    document.getElementById("burger").addEventListener("click", () => {
        document.querySelector(".menu").classList.toggle("active");
    });
}