angular.module('electricTomato')
    .directive("myProgressRing", function () {
        return {
            scope: {},
            bindToController: {
                percentage: "<",
                stroke: "@" 
            },
            transclude: true,
            templateUrl: "my-progress-ring/my-progress-ring.html",
            controller: ['$timeout', '$scope', function ($timeout, $scope) {
                var vm = this;
                vm.progressHolderId = "progress_" + new Date().getTime();
                var progressRing = null;
                vm.stroke = vm.stroke || 6;

                $timeout(function () {
                    progressRing = new ProgressBar.Circle("#" + vm.progressHolderId, {
                        strokeWidth: vm.stroke,
                        easing: 'linear',
                        duration: 100,
                        color: '#7485AB',
                        trailColor: '#2E4272',
                        trailWidth: vm.stroke,
                        svgStyle: null
                    });
                });

                this.$onChanges = function (changes) {                    
                    if (changes.percentage && progressRing !== null) {
                        progressRing.animate(changes.percentage.currentValue);
                    }
                };
            }],
            controllerAs: "vm"
        }
    })
