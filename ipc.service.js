var ipc = require('electron').ipcRenderer;

function IpcService(){
    this.send = function(eventName, e){
        ipc.send(eventName, e);
    }
}

angular
    .module("electricTomato")
    .service("ipcService", IpcService);