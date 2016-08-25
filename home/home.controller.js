angular
    .module('electricTomato')
    .controller('HomeController', ['pomodoroTimerService', 'ipcService', function (timer, ipc) {
        this.timerStates = {
            running: "running",
            stopped: "stopped",
            paused: "paused",
            onBreak: "onBreak"
        }

        var vm = this;

        var currentWindow = require('electron').remote.getCurrentWindow();

        vm.state = vm.timerStates.stopped;

        vm.time = '25:00';

        vm.percentage = 0.0;

        vm.isAlwaysOnTop = false;

        function onTick(time) {
            var totalSeconds = vm.state == vm.timerStates.running ? 25 * 60 : 5 * 60;
            var elapsedSeconds = totalSeconds - (time.minutes * 60 + time.seconds);
            vm.percentage = elapsedSeconds / totalSeconds;
            vm.time = time.minutes + ':' + time.seconds;
            ipc.send('tick', {
                time: time,
                isBreak: vm.state == vm.timerStates.onBreak,
                percentage: vm.percentage
            });
        }

        function startBreak() {
            vm.state = vm.timerStates.onBreak;
            ipc.send('tick', {
                time: timer.getTime(),
                isBreak: true,
                percentage: 0
            });
            timer.startBreak(onTick, function () {
                vm.state = vm.timerStates.stopped;
                ipc.send('tick', {
                    time: timer.getTime(),
                    isBreak: true,
                    percentage: 0
                });
            });
        }


        this.start = function () {
            vm.state = vm.timerStates.running;
            timer.start(onTick, startBreak);            
        };

        this.stop = function () {
            timer.stop();
            vm.state = vm.timerStates.stopped;
        };

        this.toggleMiniTimer = function () {
            ipc.send('openMiniTimer');
        };

        this.close = function () {
            currentWindow.close();
        };

        this.minimize = function () {
            currentWindow.minimize();
        };

        this.setAsAlwaysOnTop = function () {
            currentWindow.setAlwaysOnTop(true);
            vm.isAlwaysOnTop = true;
        };

        this.setAsNotAlwaysOnTop = function () {
            currentWindow.setAlwaysOnTop(false);            
            vm.isAlwaysOnTop = false;
        };
    }]);