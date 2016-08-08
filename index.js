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
                width: 70,
                height: 70,
                resizable: false,
                alwaysOnTop: true,
                frame: false            
            });

            miniWindow.loadURL('file:///' + __dirname + '/miniTimer/index.html');
        } else {
            miniWindow.close();
            miniWindow = null;
        }
    });

    ipc.on('tick', function(event, status){        
        if (miniWindow !== null){
            miniWindow.webContents.send('tick', status);
        }            
    });
})
