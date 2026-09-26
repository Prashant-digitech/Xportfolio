const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  isElectron: true,
  openAssetsFolder: () => ipcRenderer.invoke("electron:open-assets-folder"),
  openExternal: (url) => ipcRenderer.invoke("electron:open-external", url),
  triggerUploadModal: () => ipcRenderer.invoke("electron:trigger-upload-modal"),
  onTriggerUpload: (callback) => {
    const subscription = () => callback();
    ipcRenderer.on("electron:trigger-upload", subscription);
    return () => ipcRenderer.removeListener("electron:trigger-upload", subscription);
  },
});
