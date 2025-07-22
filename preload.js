const { contextBridge, ipcRenderer } = require('electron');

// 暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electron', {
    grayscaleAPI: {
        convertToGrayscale: (buffer) => {
            // 通过 IPC 请求主进程处理
            return ipcRenderer.invoke('convert-grayscale', buffer);
        }
    }
});
