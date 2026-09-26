const { app, BrowserWindow, Menu, ipcMain, shell } = require("electron");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");

let mainWindow = null;
let nextServerProcess = null;
const PORT = 3000;
const URL = `http://localhost:${PORT}`;
const ASSETS_FOLDER = "C:\\Users\\sisod\\Desktop\\portfolio assets";

function isServerReady(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      resolve(true);
    });
    req.on("error", () => {
      resolve(false);
    });
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function startNextServerIfNeeded() {
  const ready = await isServerReady(PORT);
  if (ready) {
    console.log(`[Electron] Next.js server already running on port ${PORT}`);
    return;
  }

  console.log(`[Electron] Launching Next.js dev server on port ${PORT}...`);
  const rootDir = path.resolve(__dirname, "..");

  nextServerProcess = spawn("cmd.exe", ["/c", "npm", "run", "dev"], {
    cwd: rootDir,
    stdio: "inherit",
    shell: true,
  });

  // Poll until ready
  let attempts = 0;
  while (attempts < 45) {
    await new Promise((r) => setTimeout(r, 1000));
    const nowReady = await isServerReady(PORT);
    if (nowReady) {
      console.log(`[Electron] Next.js server is now live on ${URL}`);
      return;
    }
    attempts++;
  }
  console.warn("[Electron] Next.js server start timed out, proceeding anyway.");
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1080,
    minHeight: 720,
    title: "Prashant Sisodhiya — Executive Product Designer & Motion Lab",
    backgroundColor: "#090A0E",
    icon: path.join(__dirname, "..", "public", "file.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  buildAppMenu();

  mainWindow.loadURL(URL);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function buildAppMenu() {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Upload Asset to Portfolio (Ctrl+U)",
          accelerator: "CmdOrCtrl+U",
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send("electron:trigger-upload");
            }
          },
        },
        {
          label: "Open Desktop Assets Folder",
          click: () => {
            shell.openPath(ASSETS_FOLDER);
          },
        },
        { type: "separator" },
        { role: "quit", label: "Exit Portfolio App" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload", label: "Refresh (Hot-Reload)" },
        { role: "forceReload", label: "Hard Reload" },
        { role: "toggleDevTools", label: "Toggle Developer Tools" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Toggle Full Screen" },
      ],
    },
    {
      label: "Navigate",
      submenu: [
        {
          label: "Selected Work",
          click: () => mainWindow && mainWindow.loadURL(`${URL}#work`),
        },
        {
          label: "Motion / Film Lab",
          click: () => mainWindow && mainWindow.loadURL(`${URL}#motion`),
        },
        {
          label: "Canva Executive Deck",
          click: () => mainWindow && mainWindow.loadURL(`${URL}#canva-deck`),
        },
        {
          label: "Figma Design Lab",
          click: () => mainWindow && mainWindow.loadURL(`${URL}#figma`),
        },
        {
          label: "Visual Systems",
          click: () => mainWindow && mainWindow.loadURL(`${URL}#visual`),
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Open Live Web Production",
          click: () => shell.openExternal("https://xportfolio-sigma.vercel.app"),
        },
        {
          label: "GitHub Repository",
          click: () => shell.openExternal("https://github.com/Prashant-digitech/Xportfolio"),
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC Handlers
ipcMain.handle("electron:open-assets-folder", () => {
  shell.openPath(ASSETS_FOLDER);
  return true;
});

ipcMain.handle("electron:open-external", (event, url) => {
  if (url) shell.openExternal(url);
  return true;
});

ipcMain.handle("electron:trigger-upload-modal", () => {
  if (mainWindow) {
    mainWindow.webContents.send("electron:trigger-upload");
  }
  return true;
});

app.whenReady().then(async () => {
  await startNextServerIfNeeded();
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (nextServerProcess) {
      try {
        nextServerProcess.kill();
      } catch (e) {
        // ignore
      }
    }
    app.quit();
  }
});

app.on("before-quit", () => {
  if (nextServerProcess) {
    try {
      nextServerProcess.kill();
    } catch (e) {
      // ignore
    }
  }
});
