angular.module('electricTomato')
    .directive("myProgressRing", function () {
        return {
            scope: {
                width: "@",
                height: "@",
                percentage: "<"
            },
            bindToController: true,
            transclude: true,
            templateUrl: "my-progress-ring/my-progress-ring.html",
            controller: ['$timeout', '$scope', function ($timeout, $scope) {
                var vm = this;
                vm.id = "progress";
                vm.progressRing = null;
                $timeout(function () {
                    vm.progressRing = new ProgressBar.Circle("#progress", {
                        strokeWidth: 6,
                        easing: 'easeInOut',
                        duration: 1400,
                        color: '#2E4272',
                        trailColor: '#eee',
                        trailWidth: 1,
                        svgStyle: null
                    });
                });
                console.log("percentage value before $onInit: "+ vm.percentage);
                vm.$onInit = function () {
                    console.log("percentage value $onInit: "+ vm.percentage);                        
                };
                /*$scope.$watch('vm.percentage', function (newValue) {
                    console.log("new value for percentage " + newValue);
                    if (vm.progressRing !== null) {                        
                        vm.progressRing.animate(newValue);
                    }
                });*/
            }],
            controllerAs: "vm",
            require: "myProgressRing",
            link: function (scope, element, attrs, controller, transcludeFn) {
                scope.$watch("vm.percentage", function (newValue) {
                    if (controller.progressRing !== null) {
                        console.log("new value for percentage", newValue);
                        controller.progressRing.animate(newValue);
                    }
                });
            }
        }
    })