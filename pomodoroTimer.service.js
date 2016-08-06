function PomodoroTimerService(){
    var timer = null;   

    function setupNewTimer(startValues, onTick){
        timer = new Timer();
        timer.start({
            precision: 'seconds',
            startValues: startValues,
            target: {minutes: 0, seconds: 0},
            countdown: true
        });        
        timer.addEventListener('secondsUpdated', function(){            
            onTick({
                minutes: timer.getTimeValues().minutes,
                seconds: timer.getTimeValues().seconds
            });
        });
    }

    this.start = function(onTick){
        setupNewTimer({minutes: 25, seconds: 0}, onTick);                        
    };

    this.onDone = function(onDone){
        timer.addEventListener('targetAchieved', function(){
            onDone();
        });
    };

    this.startBreak = function (onTick){
        setupNewTimer({minutes: 5, seconds: 0}, onTick);
    };

    this.pause = function(){
        timer.pause();
    };
}

angular
    .module('electricTomato')
    .service('pomodoroTimerService', PomodoroTimerService)