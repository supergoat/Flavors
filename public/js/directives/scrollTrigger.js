angular.module('scrollTrigger', []).directive('scrollTrigger', [ '$document', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            $document.bind('scroll', function () {
                // console.log(raw.scrollTop + raw.offsetHeight);
                // console.log(raw.scrollHeight + 2886);
                if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight + 2886) { //at the bottom
                    // console.log('load');
                    // scope.$apply(attrs.scrollTrigger);
                }
            })
        }
    }
}]);