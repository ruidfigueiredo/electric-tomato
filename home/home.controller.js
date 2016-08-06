//check https://kimmobrunfeldt.github.io/progressbar.js/
angular
    .module('electricTomato')
    .controller('HomeController', ['pomodoroTimerService', 'ipcService', '$scope', function (timer, ipc, $scope) {
        this.timerStates = {
            running: "running",
            stopped: "stopped",
            paused: "paused",
            onBreak: "onBreak"
        }

        var vm = this;

        vm.state = this.timerStates.stopped;

        vm.time = '25:00';

        function onTick(time) {
            $scope.$apply(function () {                    
                vm.time = time.minutes + ':' + time.seconds;
            });
        }

        function startBreak(){
            $scope.$apply(function(){
              vm.state = vm.timerStates.onBreak;  
            });            
            timer.startBreak(onTick); 
        }

        this.start = function () {
            vm.state = vm.timerStates.running;
            timer.start(onTick);
            timer.onDone(startBreak);
            
        };

        this.stop = function(){
            timer.pause();
            vm.state = vm.timerStates.stopped;
        };

        this.toggleMiniTimer = function(){
            ipc.send('miniWindowOpen');
        };
    }]);