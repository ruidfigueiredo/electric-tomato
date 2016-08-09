function MiniTimerController(ipc) {
    var vm = this;
    vm.time = "--:--";
    vm.isBreak = false;

    ipc.on('tick', function (event, status) {
        vm.time = status.time.minutes + ":" + status.time.seconds;
        vm.isBreak = status.isBreak;
    });

    vm.close = function(){
        ipc.send('closeMiniTimer');
    }; 
}

MiniTimerController.$inject = ['ipcService'];

angular
    .module('electricTomato')
    .controller("miniTimerController", MiniTimerController);

//get time from source
