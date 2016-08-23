function PomodoroTimerService($interval) {
    var intervalPromise = null;
    var timeToWait;
    var startTime;


    function getRemainingTime(){
        var currentTime = new Date().getTime();
        var elapsedSeconds = Math.abs(Math.floor((currentTime - startTime) / 1000));
        var totalSecondsToWait = timeToWait - elapsedSeconds; 
        return {
            minutes: Math.max(0, Math.floor(totalSecondsToWait / 60)),
            seconds: Math.max(0, totalSecondsToWait % 60)
        }
    }

    function setupNewTimer(startValues, onTick, onDone) {
        if (intervalPromise != null){
            $interval.cancel(intervalPromise);
            intervalPromise = null;
        }

        timeToWait = startValues.minutes * 60 + startValues.seconds;
        startTime = new Date().getTime();
        intervalPromise = $interval(function(){
            onTick(getRemainingTime());
            if (isDone()){
                $interval.cancel(intervalPromise);
                intervalPromise = null;
                onDone();
            }
        }, 1000);
    }


    function isDone(){
        var elpasedTime = getRemainingTime();
        return elpasedTime.minutes == 0 && elpasedTime.seconds == 0; 
    }

    this.getRemainingTime = getRemainingTime;

    this.start = function (onTick, onDone) {
        setupNewTimer({ minutes: 25, seconds: 0 }, onTick, onDone);
    };

    this.startBreak = function (onTick, onDone) {
        setupNewTimer({ minutes: 5, seconds: 0 }, onTick, onDone);
    };

    this.stop = function () {
        $interval.cancel(intervalPromise);
        intervalPromise = null;
    };
}

angular
    .module('electricTomato')
    .service('pomodoroTimerService', ['$interval', PomodoroTimerService])