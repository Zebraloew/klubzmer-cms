// textSaver.js

export async function saveRawToFile(text, filename) {
  await fetch("/api/update-raw-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, filename }),
  });
}

export async function extractHyperlinksFromUl(ulId) {
  let text = "";
  const ul = document.querySelector(ulId);
  if (ul) {
    for (let i = 0; i < ul.children.length; i++) {
      const li = ul.children[i];
      if (li.tagName === "LI") {
        const a = li.querySelector("a");
        if (a) {
          text += a.href + "\n";
        }
      }
    }
  }
  console.log("🙀\n" + text);
  return text;
}

export async function saveButtonForListToFile(buttonId, listId, filename) {
  document.querySelector(buttonId).addEventListener("click", async () => {
    let textFromModule = await extractHyperlinksFromUl(listId);
    await saveRawToFile(textFromModule, filename);
  });
}