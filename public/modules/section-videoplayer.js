// section-videoplayer.js
// Video Player Module

// Goal: Editable in the admin panel
//Plan for modular updates
// 1) video-thumbnails created from list
// 2) list read from file data/video-links.yaml
// 3) Admin panel for editing the links

export function createSectionVideoplayer() {
  const sectionVideoplayer = document.createElement("div");
  sectionVideoplayer.className = "videoplayer-container container";
  sectionVideoplayer.id = "videoplayer";

  sectionVideoplayer.innerHTML = `
      <section class="section-videoplayer">
          <div class="videoplayer">
              <h2>Videoplayer</h2>
              <iframe id="main-videoplayer" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  frameborder="0" allowfullscreen>
              </iframe>
          </div>
  
          <div class="video-list">
              <p>Weitere Videos</p>
              <div class="video-thumbnails">
                  <img class="video-thumbnail" data-video-id="3JZ_D3ELwOQ" src="https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg" alt="Video 1">
                  <img class="video-thumbnail" data-video-id="tgbNymZ7vqY" src="https://img.youtube.com/vi/tgbNymZ7vqY/hqdefault.jpg" alt="Video 2">
                  <img class="video-thumbnail" data-video-id="KxGRhd_iWuE" src="https://img.youtube.com/vi/KxGRhd_iWuE/hqdefault.jpg" alt="Video 3">
                  <img class="video-thumbnail" data-video-id="9bZkp7q19f0" src="https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg" alt="Video 4">
                  <img class="video-thumbnail" data-video-id="L_jWHffIx5E" src="https://img.youtube.com/vi/L_jWHffIx5E/hqdefault.jpg" alt="Video 5">
                  <img class="video-thumbnail" data-video-id="RgKAFK5djSk" src="https://img.youtube.com/vi/RgKAFK5djSk/hqdefault.jpg" alt="Video 6">
              </div>
          </div>
      </section>
    `;

  // Event Listener for thumbnails to update the main video
  sectionVideoplayer
    .querySelectorAll(".video-thumbnail")
    .forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        const videoId = this.getAttribute("data-video-id");
        document.getElementById(
          "main-videoplayer"
        ).src = `https://www.youtube.com/embed/${videoId}`;
      });
    });

  document.querySelector("main").append(sectionVideoplayer);
}
