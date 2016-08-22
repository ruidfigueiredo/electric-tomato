function PomodoroTimerService($interval) {
    var intervalPromise = null;
    var timeToWait;
    var startTime;


    function getTime(){
        var currentTime = new Date().getTime();
        var elapsedSeconds = Math.abs(Math.floor((currentTime - startTime) / 1000));
        var totalSecondsToWait = timeToWait - elapsedSeconds; 
        return {
            minutes: Math.floor(totalSecondsToWait / 60),
            seconds: totalSecondsToWait % 60
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
            onTick(getTime());
            if (isDone()){
                $interval.cancel(intervalPromise);
                intervalPromise = null;
                onDone();
            }
        }, 1000);
    }


    function isDone(){
        var elpasedTime = getTime();
        return elpasedTime.minutes <= 0 && elpasedTime.seconds <= 0; //can't rely on interval being 1s, when the window is minimized browser might trigger it less often
    }

    this.getTime = getTime;

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