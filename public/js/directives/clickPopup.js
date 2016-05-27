angular.module('clickPopup', []).directive('clickPopup', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            /* state can be 1 or 0 */
            elem.bind('click', function(){
                var overlayEle = document.getElementById('overlay');

                if (attrs.clickPopup) {
                    overlayEle.style.display = 'block';
                } else {
                    overlayEle.style.display = 'none';
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
