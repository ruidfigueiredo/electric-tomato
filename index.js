var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipc = electron.ipcMain;

var mainWindow = null;
var miniTimerWindow = null;


app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 640,
        height: 480,
        resizable: true
    });

    mainWindow.loadURL('file:///' + __dirname + '/index.html');
    mainWindow.on('close', function(){
        app.quit();
    });

    ipc.on('openMiniTimer', function () {
        if (miniTimerWindow == null) {
            miniTimerWindow = new BrowserWindow({
                width: 70,
                height: 70,
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

    ipc.on('closeMiniTimer', function(event){
        miniTimerWindow.close();
    });

    ipc.on('tick', function (event, status) {
        if (miniTimerWindow !== null) {
            miniTimerWindow.webContents.send('tick', status);
        }
    });
});
