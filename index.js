var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        width: 320,
        height: 240,
        resizable: false
    });

    mainWindow.loadURL('file:///' + __dirname + '/index.html');
})
