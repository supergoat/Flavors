angular.module('clickPopup', []).directive('clickPopup', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            /* state can be 1 or 0 */
            elem.bind('click', function(){
                if (scope[attrs.clickPopup] !== 1) {
                    document.body.style.overflow = "hidden";
                    scope[attrs.clickPopup] = 1;
                    scope['flavorShowComments'] = 1;
                    scope.$apply();
                } else {
                    document.body.style.overflow = "visible";
                    scope[attrs.clickPopup] = '';
                    scope['flavorShowComments'] = '';
                    scope.$apply();
                }
            })
        }
    }
});

// (function(){
//     myBlurFunction = function(state) {
//         /* state can be 1 or 0 */
//         var containerElement = document.getElementById('main');
//         var overlayEle = document.getElementById('overlay');

//         if (state) {
//             overlayEle.style.display = 'block';
//             containerElement.setAttribute('class', 'blur');
//         } else {
//             overlayEle.style.display = 'none';
//             containerElement.setAttribute('class', null);
//         }
//     };
// })();
