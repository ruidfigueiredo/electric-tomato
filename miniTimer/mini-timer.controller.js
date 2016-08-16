function MiniTimerController(ipc) {
    var vm = this;
    var currentWindow = require('electron').remote.getCurrentWindow();
    vm.time = "--:--";
    vm.isBreak = false;

    ipc.on('tick', function (event, status) {
        vm.time = status.time.minutes + ":" + status.time.seconds;
        vm.isBreak = status.isBreak;
    });

    vm.close = currentWindow.close; 
}

MiniTimerController.$inject = ['ipcService'];

angular
    .module('electricTomato')
    .controller("miniTimerController", MiniTimerController);