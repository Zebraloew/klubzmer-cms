// section-videoplayer.js
// Video Player Module

import { youtubeIdListExtractor } from "../js/youtubeIdExtractor.js";

var videoIdList = [
  "dQw4w9WgXcQ",
  "KxGRhd_iWuE",
  "3JZ_D3ELwOQ",
  "tgbNymZ7vqY",
  "9bZkp7q19f0",
  "L_jWHffIx5E",
  "RgKAFK5djSk",
];
videoIdList = await youtubeIdListExtractor();

// creating li from that array
var videoList = "";
function createVideoList() {
  for (let i = 1; i < videoIdList.length; i++) {
    videoList +=
      '<img class="video-thumbnail" data-video-id="' +
      videoIdList[i] +
      '" src="https://img.youtube.com/vi/' +
      videoIdList[i] +
      '/hqdefault.jpg" alt="Video Preview">';
  }
}
try {
  createVideoList();
  console.log("generating video list");
} catch (error) {
  console.error("Error creating video list:", error);
}

export function createSectionVideoplayer() {
  const sectionVideoplayer = document.createElement("div");
  sectionVideoplayer.className = "videoplayer-container container";
  sectionVideoplayer.id = "videoplayer";

  sectionVideoplayer.innerHTML = `
      <section class="section-videoplayer">
          <div class="videoplayer">
              <h2>Videoplayer</h2>
              <iframe id="main-videoplayer" 
                  src="https://www.youtube.com/embed/${videoIdList[0]}" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                  referrerpolicy="strict-origin-when-cross-origin">
              </iframe>
          </div>
  
          <div class="video-list">
              <p>Weitere Videos</p>
              <div class="video-thumbnails">
                  ${videoList}
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
