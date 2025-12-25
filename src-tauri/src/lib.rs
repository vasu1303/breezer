// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use enigo::{Enigo, Keyboard, Settings};

#[tauri::command]
fn type_text(text: String) -> Result<(), String> {
    let mut enigo = Enigo::new(&Settings::default()).map_err(|e| e.to_string())?;
    enigo.text(&text).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .setup(|app| {
            #[cfg(desktop)]
            {
                use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState};
                use tauri::Emitter;
                let ctrl_t = Shortcut::new(Some(Modifiers::CONTROL), Code::KeyT);
                let ctrl_k = Shortcut::new(Some(Modifiers::CONTROL), Code::KeyK);

                // Register Ctrl + T (Toggle)
                app.global_shortcut().on_shortcut(ctrl_t, move |app, _shortcut, event| {
                    if event.state() == ShortcutState::Pressed {
                        println!("Ctrl+T pressed - Toggle");
                        let _ = app.emit("shortcut-pressed", "toggle");
                    }
                })?;

                // Register Ctrl + K (Kill Switch / Stop)
                app.global_shortcut().on_shortcut(ctrl_k, move |app, _shortcut, event| {
                    if event.state() == ShortcutState::Pressed {
                        println!("Ctrl+K pressed - Kill Switch");
                        let _ = app.emit("shortcut-pressed", "stop");
                    }
                })?;
            }
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![type_text])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
