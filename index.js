var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipc = electron.ipcMain;

var mainWindow = null;
var miniTimerWindow = null;


app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 230,
        height: 320,
        resizable: false,
        frame: false
    });

    mainWindow.loadURL('file:///' + __dirname + '/index.html');
    mainWindow.on('close', function(){
        app.quit();
    });

    ipc.on('openMiniTimer', function () {
        if (miniTimerWindow == null) {
            miniTimerWindow = new BrowserWindow({
                width: 90,
                height: 65,
                resizable: false,
                alwaysOnTop: true,
                frame: false
            });

            miniTimerWindow.loadURL('file:///' + __dirname + '/miniTimer/index.html');
            miniTimerWindow.on('closed', function () {
                miniTimerWindow = null;
            });
        }
    });

    ipc.on('tick', function (event, status) {
        if (miniTimerWindow !== null) {
            miniTimerWindow.webContents.send('tick', status);
        }
    });
});
