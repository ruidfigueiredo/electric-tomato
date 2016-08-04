var Timer = require('easytimer');

var timer = new Timer();

timer.start({
        precision: 'seconds',
        startValues: {minutes: 1, seconds: 0},
        target: {minutes: 0, seconds: 0},
        countdown: true
    });

timer.addEventListener('secondsUpdated', function(e){
    console.log(timer.getTimeValues().minutes + '-' + timer.getTimeValues().seconds);
});

timer.addEventListener('targetAchieved', function(e){
    console.log("END");
});
