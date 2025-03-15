//button listener script
import { saveRawToFile } from "../textSaver.js";
import { loadRawText } from "../../js/textLoader.js";

// ✅ New helper function to handle file saving logic
async function saveFile() {
    const list = document.getElementById("sortable-list");
    const list_content = list.querySelectorAll("input");
    let text_to_export = "";
    for (let i = 0; i < list_content.length; i++) {
        text_to_export += list_content[i].value + "\n";
    }
    saveRawToFile(text_to_export, "dev.txt");
}

// ✅ Expose buttonImport function
export async function buttonImport(buttonId = "save-btn") {
    // Manual save on button click
    document.getElementById(buttonId).addEventListener("click", async () => {
        await saveFile();
    });

    // ✅ Auto-save: after 10s of no input
    let autoSaveTimer;
    document.addEventListener("input", () => {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(async () => {
            await saveFile();
            console.log("Autosaved after 10s of inactivity.");
        }, 1000);
    });
}
