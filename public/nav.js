export function createNavbar() {
    const nav = document.createElement("nav");
    nav.className = "navbar";
    nav.innerHTML = `
        <h1>Klubzmer</h1>
        <ul class="menu">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
        <div class="burger" id="burger">
            <div></div>
            <div></div>
            <div></div>
        </div>
    `;

    document.body.prepend(nav);

    // Burger menu functionality
    document.getElementById("burger").addEventListener("click", () => {
        document.querySelector(".menu").classList.toggle("active");
    });
}