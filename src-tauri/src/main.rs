#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::net::{TcpStream, ToSocketAddrs};
use std::time::Duration;
use tauri::menu::{MenuBuilder, SubmenuBuilder};
use tauri::{AppHandle, Emitter, Manager, Runtime};

#[tauri::command]
fn check_port(host: String, port: u16, timeout_ms: u64) -> bool {
  let addr = format!("{}:{}", host, port);
  let timeout = Duration::from_millis(timeout_ms);
  if let Ok(addrs) = addr.to_socket_addrs() {
    for socket_addr in addrs {
      if TcpStream::connect_timeout(&socket_addr, timeout).is_ok() {
        return true;
      }
    }
  }
  false
}

fn main() {
  tauri::Builder::default()
    .menu(|handle| build_menu(handle))
    .on_menu_event(|app, event| {
      let window = app.get_webview_window("main");
      match event.id().0.as_str() {
        "menu_quit" => {
          app.exit(0);
        }
        "menu_close_window" => {
          if let Some(window) = window {
            let _ = window.close();
          }
        }
        "menu_minimize" => {
          if let Some(window) = window {
            let _ = window.minimize();
          }
        }
        "menu_maximize" => {
          if let Some(window) = window {
            let _ = window.maximize();
          }
        }
        "menu_unmaximize" => {
          if let Some(window) = window {
            let _ = window.unmaximize();
          }
        }
        "menu_reload" => {
          let _ = app.emit("menu:reload", ());
        }
        "menu_about" => {
          let _ = app.emit("menu:about", ());
        }
        "menu_docs" => {
          let _ = app.emit("menu:docs", ());
        }
        "menu_report_issue" => {
          let _ = app.emit("menu:report-issue", ());
        }
        _ => {}
      }
    })
    .invoke_handler(tauri::generate_handler![check_port])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn build_menu<R: Runtime>(handle: &AppHandle<R>) -> tauri::Result<tauri::menu::Menu<R>> {
  let app_menu = SubmenuBuilder::new(handle, "Devknife Toolbox")
    .text("menu_about", "About Devknife Toolbox")
    .separator()
    .text("menu_quit", "Quit")
    .build()?;

  let file_menu = SubmenuBuilder::new(handle, "File")
    .text("menu_close_window", "Close Window")
    .build()?;

  let edit_menu = SubmenuBuilder::new(handle, "Edit")
    .undo()
    .redo()
    .separator()
    .cut()
    .copy()
    .paste()
    .select_all()
    .build()?;

  let view_menu = SubmenuBuilder::new(handle, "View")
    .text("menu_reload", "Reload")
    .build()?;

  let window_menu = SubmenuBuilder::new(handle, "Window")
    .text("menu_minimize", "Minimize")
    .text("menu_maximize", "Maximize")
    .text("menu_unmaximize", "Unmaximize")
    .build()?;

  let help_menu = SubmenuBuilder::new(handle, "Help")
    .text("menu_docs", "Documentation")
    .text("menu_report_issue", "Report Issue")
    .build()?;

  MenuBuilder::new(handle)
    .items(&[
      &app_menu,
      &file_menu,
      &edit_menu,
      &view_menu,
      &window_menu,
      &help_menu,
    ])
    .build()
}
