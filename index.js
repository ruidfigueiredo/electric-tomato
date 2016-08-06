var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipc = electron.ipcMain;

var mainWindow = null;
var miniWindow = null;


app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 640,
        height: 480,
        resizable: true
    });

    mainWindow.loadURL('file:///' + __dirname + '/index.html');

    ipc.on('miniWindowOpen', function () {
        if (miniWindow == null) {
            miniWindow = new BrowserWindow({
                width: 200,
                height: 200,
                resizable: false,
                alwaysOnTop: true,
                frame: false            
            });

            miniWindow.loadURL('file:///' + __dirname + '/index.html');
        } else {
            miniWindow.close();
            miniWindow = null;
        }
    });
})
