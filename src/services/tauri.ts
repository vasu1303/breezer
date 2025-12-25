import { invoke } from "@tauri-apps/api/core"
import { listen, UnlistenFn } from "@tauri-apps/api/event";

export const typeText = async (text: string) => {
    try {
        await invoke("type_text", {text});
    } catch (err) {
        console.error("Failed to invoke Rust type_text", err);
    };
};

export type ShortcutAction = "toggle" | "stop";

export const setupShortcutListener = async (
    onToggle: () => void,
    onStop: () => void
): Promise<UnlistenFn> => {
    return listen<ShortcutAction>("shortcut-pressed", (event) => {
        if (event.payload === "toggle") {
            onToggle();
        } else if (event.payload === "stop") {
            console.log("Kill switch triggered");
            onStop();
        }
    });
}