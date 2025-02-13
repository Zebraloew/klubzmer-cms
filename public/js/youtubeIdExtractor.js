import { loadRawText } from "../js/textLoader.js";

export async function youtubeIdExtractor() {
  const raw = await loadRawText("videolist.txt");

  //   Use regex with global flag to find all YouTube IDs
  const youtubeIdRegex = /(?:v=|embed\/|youtu\.be\/)([\w-]+)/g;
  const youtubeIdRegexResults = [...raw.matchAll(youtubeIdRegex)];

  //   Extract only the YouTube IDs from capture groups
  const ids = youtubeIdRegexResults.map((match) => match[1]);

  //   Format results into HTML
  const htmlResults = ids.map((id) => `<p>${id}</p>`).join("");

  //   Create HTML
  //   const youtubeIdExtractorResult = document.createElement("div");
  //   youtubeIdExtractorResult.id = "youtube-id-extractor-result";
  //   youtubeIdExtractorResult.innerHTML = `
  //         <h2>Youtube ID Extractor Result</h2>
  //         ${htmlResults}
  //   `;
  //   if (!document.querySelector("#youtube-id-extractor-result")) {
  //     document.querySelector("main").append(youtubeIdExtractorResult);
  //   }

  console.log("🎯 Extracted YouTube IDs:", ids);
  return ids;
}
youtubeIdExtractor();
