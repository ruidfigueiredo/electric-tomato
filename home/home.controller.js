angular
    .module("electricTomato")
    .controller("HomeController", ['pomodoroTimerService', '$scope', function(timer, $scope){
        var vm = this;                
        vm.time = "25:00";

        this.start = function(){
            timer.start(function(time){
                vm.time = time.minutes + ":" + time.seconds;
                $scope.$digest();                                
            });            
        };        
    }]);