angular.module('flavorTemplate', []).directive('flavorTemplate', function(){
  return {  
    templateUrl: function(elem, attrs) { return attrs.ngIncludeTemplate; },  
    restrict: 'A',  
    scope: {  
      'ngIncludeVariables': '&'  
    },  
    link: function(scope, elem, attrs) {  
      var vars = scope.ngIncludeVariables();  
      Object.keys(vars).forEach(function(key) {  
        scope[key] = vars[key];  
      });  
    }  
  }  
});