// textSaver.js

export async function safeRawToFile(text, filename) {
  await fetch("/api/update-raw-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, filename }),
  });
}
