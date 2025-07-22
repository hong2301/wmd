const { app, BrowserWindow, ipcMain, contextBridge } = require('electron');
const path = require('path');
const fs = require('fs');

// 加载 Node 扩展（假设扩展在项目根目录的 addon/ 目录下）
const grayscale = require(path.join(__dirname, 'addon', 'grayscale', 'build', 'Release', 'grayscale-node.node'));

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 启用预加载脚本
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // 保持上下文隔离（安全推荐）
      enableRemoteModule: false // 禁用远程模块（Electron 12+ 默认禁用）
    }
  });

  win.loadFile('index.html');
};

// 处理渲染进程的灰度转换请求
ipcMain.handle('convert-grayscale', (event, buffer) => {
  try {
    const bufferTemp = Buffer.from(buffer);
    const grayBuffer = grayscale.convertToGrayscale(bufferTemp);
    // const outputImagePath = path.join(__dirname, 'output-gray.jpg');
    // fs.writeFileSync(outputImagePath, grayBuffer);
    return grayBuffer; // 返回 Buffer
  } catch (error) {
    console.error('灰度转换失败:', error);
    return null;
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
