angular.module('electricTomato', ['ngRoute'])
    .directive("myProgressRing", function(){
        return{
            template: function(element, attrs) {
                return '<div style="position:relative;width:200px; height:200px; background-color: green"><div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)"><span>' + attrs.time + '</span></div></div>';                    
            }
        }
    })