// section-videoplayer.js
// Video Player Module

// Goal: Editable in the admin panel
//Plan for modular updates
// 1) video-thumbnails created from list
// 2) list read from file data/video-links.yaml
// 3) Admin panel for editing the links

// Testing variable SUCCESS
const videoIdList = ["dQw4w9WgXcQ", "KxGRhd_iWuE", "3JZ_D3ELwOQ", "tgbNymZ7vqY", "9bZkp7q19f0", "L_jWHffIx5E", "RgKAFK5djSk"];
// Testing creating li from that array
var videoList = "";
function createVideoList() {
  for (let i=0; i<videoIdList.length; i++) {
    videoList += '<img class="video-thumbnail" data-video-id="' + videoIdList[i] + '" src="https://img.youtube.com/vi/' + videoIdList[i] + '/hqdefault.jpg" alt="Video Preview">';
  }
}
console.log("generating video list");
createVideoList();
console.log(videoList);

export function createSectionVideoplayer() {
  const sectionVideoplayer = document.createElement("div");
  sectionVideoplayer.className = "videoplayer-container container";
  sectionVideoplayer.id = "videoplayer";

  sectionVideoplayer.innerHTML = `
      <section class="section-videoplayer">
          <div class="videoplayer">
              <h2>Videoplayer</h2>
              <iframe id="main-videoplayer" 
                  src="https://www.youtube.com/embed/${videoIdList[1]}" 
                  frameborder="0" allowfullscreen>
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
