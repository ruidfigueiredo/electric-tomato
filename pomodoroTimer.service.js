function PomodoroTimerService(){
    var timer = null;    
    this.start = function(onTick){
        timer = new Timer();
        timer.start({
            precision: 'seconds',
            startValues: {minutes: 25, seconds: 0},
            target: {minutes: 0, seconds: 0},
            countdown: true
        });        
        timer.addEventListener('secondsUpdated', function(){            
            onTick({
                minutes: timer.getTimeValues().minutes,
                seconds: timer.getTimeValues().seconds
            });
        });                
    };

    this.onDone = function(onDone){
        timer.addEventListener('targetAchieved', function(){
            onDone();
        });
    };

    this.pause = function(){
        timer.pause();
    };
}

angular
    .module('electricTomato')
    .service('pomodoroTimerService', PomodoroTimerService)