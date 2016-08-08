var ipc = require('electron').ipcRenderer;

function IpcService($rootScope){
    this.send = function(eventName, arg){
        ipc.send(eventName, arg);
    };

    this.on = function(eventName, listener){
        ipc.on(eventName, function(){            
            var args = arguments;
            $rootScope.$apply(function(){
                listener.apply(null, args);
            });                    
        });        
    };
}

angular
    .module("electricTomato")
    .service("ipcService", ['$rootScope', IpcService]);