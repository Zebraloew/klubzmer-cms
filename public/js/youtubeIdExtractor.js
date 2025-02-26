/*
Contains:
- FUNCTIONS
    youtubeIdListExtractor
    youtubeIdExtractor
*/

import { loadRawText } from "../js/textLoader.js";

// list of IDs put into html
// creates html but also returns array
export async function youtubeIdListExtractor() {
  const raw = await loadRawText("videolist.txt");

  //   Use regex with global flag to find all YouTube IDs
  const youtubeIdRegex = /(?:v=|embed\/|youtu\.be\/)([\w-]+)/g;
  const youtubeIdRegexResults = [...raw.matchAll(youtubeIdRegex)];

  //   Extract only the YouTube IDs from capture groups
  const ids = youtubeIdRegexResults.map((match) => match[1]);

  //   Format results into HTML
  const htmlResults = ids.map((id) => `<p>${id}</p>`).join("");

  return ids;
}

// single ID
export async function youtubeIdExtractor(
  link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
) {
  const youtubeIdRegex = /(?:v=|embed\/|youtu\.be\/)([\w-]{11})/;
  const match = link.match(youtubeIdRegex);

  if (match && match[1]) {
    // console.log("Extracted YouTube ID:", match[1]);
    return match[1];
  } else {
    console.log("No YouTube ID found.");
  }
}
