import { useEffect } from "react";
import { setupShortcutListener } from "../services/tauri";

export function useShortcut( onToggle: () => void) {
    useEffect(() => {
        let unlisten: (() => void) | null = null;

        const init = async () => {
            if ( typeof window !== "undefined" && "__TAURI_INTERNALS__" in window) {
                unlisten = await setupShortcutListener(() => {
                    console.log("Global Shortcut Triggered");
                    onToggle();
                });
            };
        };

        init();

        return () => {
            if (unlisten) unlisten();
        };
    }, [onToggle]);
};