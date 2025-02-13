import { loadRawText } from "../js/textLoader.js";

export async function createYoutubeIdExtractorResult() {
  const raw = await loadRawText("videolist.txt");
  const youtubeIdExtractorResult = document.createElement("div");
  youtubeIdExtractorResult.id = "youtube-id-extractor-result";
  youtubeIdExtractorResult.innerHTML = `
        <h2>Youtube ID Extractor Result</h2>
        <p id="vessel-bark">${raw}</p>
  `;
  if (!document.querySelector("#youtube-id-extractor-result")) {
    document.querySelector("main").append(youtubeIdExtractorResult);
  }
}
