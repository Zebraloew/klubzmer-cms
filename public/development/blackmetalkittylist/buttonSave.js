//button listener script
import { saveRawToFile } from "../textSaver.js";
import { loadRawText } from "../../js/textLoader.js";

export async function buttonImport(buttonId = "save-btn") {
  document.getElementById(buttonId).addEventListener("click", async () => {
    const list = document.getElementById("sortable-list");
    const list_content = list.querySelectorAll("input");
    let text_to_export = "";
    for (let i = 0; i < list_content.length; i++) {
      text_to_export += list_content[i].value + "\n";
    }
    saveRawToFile(text_to_export, "dev.txt");
    console.log("text_to_export: ", await loadRawText("dev.txt"));
  });
}
