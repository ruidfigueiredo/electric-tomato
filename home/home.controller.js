//check https://kimmobrunfeldt.github.io/progressbar.js/



angular
    .module("electricTomato")
    .controller("HomeController", ['pomodoroTimerService', '$scope', function (timer, $scope) {
        this.timerStates = {
            "running": "running",
            "stopped": "stopped",
            "paused": "paused",
            "onBreak": "onBreak"
        }

        var vm = this;

        vm.state = this.timerStates.stopped;

        vm.time = "25:00";

        this.start = function () {
            vm.state = vm.timerStates.running;
            timer.start(function (time) {
                $scope.$apply(function () {                    
                    vm.time = time.minutes + ":" + time.seconds;
                });
            });
        };

        this.stop = function(){
            timer.pause();
            vm.state = vm.timerStates.stopped;
        }
    }]);