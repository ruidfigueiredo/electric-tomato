//check https://kimmobrunfeldt.github.io/progressbar.js/
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

        vm.state = vm.timerStates.stopped;

        vm.time = '25:00';

        vm.percentage = 0.0;

        function onTick(time) {
            var totalSeconds = vm.state == vm.timerStates.running ? 25*60 : 5*60;        
            var elapsedSeconds = totalSeconds - (time.minutes*60 + time.seconds);            
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
            timer.startBreak(onTick);
            timer.onDone(function () {
                vm.state = vm.timerStates.stopped;
            });
        }

        
        this.start = function () {            
            vm.state = vm.timerStates.running;
            timer.start(onTick);
            timer.onDone(startBreak);
        };

        this.stop = function () {
            timer.pause();
            vm.state = vm.timerStates.stopped;
        };

        this.toggleMiniTimer = function () {
            ipc.send('openMiniTimer');
        };

        this.close = function(){
            ipc.send('close');
        }

        this.minimize = function(){
            ipc.send('minimize');
        }
    }]);