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
            vm.time = time.minutes + ':' + time.seconds;
            ipc.send('tick', {
                time: time,
                isBreak: vm.state == vm.timerStates.onBreak
            });
        }

        function startBreak() {
            vm.state = vm.timerStates.onBreak;
            timer.startBreak(onTick);
            timer.onDone(function () {
                vm.state = vm.timerStates.stopped;
            });
        }

        function testProgressRing(){
            var bar = new ProgressBar.Circle('#progress', {
                strokeWidth: 6,
                easing: 'easeInOut',
                duration: 1400,
                color: '#FFEA82',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: null
            });

            setTimeout(function () {
                bar.animate(1.0);
            }, 2000);
        }

        this.start = function () {
            testProgressRing();
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
    }]);