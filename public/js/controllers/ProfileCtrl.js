(function(){
	angular.module('ProfileCtrl', []).controller('ProfileController', 
		['$scope', 'auth', 'currentUserFactory', 'fileUploadFactory', 'flavorsFactory', 'friendsFactory', function($scope, auth, currentUserFactory, fileUploadFactory, flavorsFactory, friendsFactory) {
      $scope.isLoggedIn = auth.isLoggedIn;
  		$scope.user = currentUserFactory.user;
      $scope.flavors = flavorsFactory.flavors;
      $scope.friends = friendsFactory.friends;
      $scope.flavorShowComments = 1;

  		$scope.uploadProfile = function(){
  			fileUploadFactory.init_upload('profile_input').then(function(data){
  				currentUserFactory.uploadProfilePicture(data);
          // $scope.user.profilepicture = data;
          // $scope.user.temporaryProfile = '';
          location.reload();
  			}).catch(function(err){
			    	console.error('Augh, there was an error!', err.statusText);
			  });
  		}

      $scope.addFlavor = function(){

        if(!this.title || this.title === '') { 
          this.error = 'Title is required';
          return; 
        } else if ($scope.temporaryPicture && $scope.temporaryPicture !== '') {
          var title = this.title;
          fileUploadFactory.init_upload('file_input').then(function(data){
            var flavorImage = data;
            flavorsFactory.create($scope.user._id, {
              post: false,
              title:  title,
              picture: flavorImage
            });
            $scope.temporaryPicture = '';
            flavorImage = '';
          }).catch(function(err){
            console.error('Augh, there was an error!', err.statusText);
          });
          this.error = '';
          this.title = '';
        } else {
          flavorsFactory.create($scope.user._id, {
            title: this.title
          });
          this.error = '';
          this.title = '';
        }
      };

      $scope.removePhoto = function(){
        $scope.user.temporaryProfile = '';
        $scope.temporaryPicture = '';
        document.getElementById("file_input").value = '';
        document.getElementById("profile_input").value = '';
      }

      $scope.incrementUpvotes = function(flavor){
        flavorsFactory.upvote(flavor);
      }
   
      $scope.addComment = function(flavor){
        if(!this.body || this.body === '') {
          return; 
        }
        flavorsFactory.addComment($scope.user._id, flavor._id,{
          body: this.body
        }).success(function(comment){
          flavor.comments.push(comment);
        });
        this.body = '';
      };

      $scope.incrementCommentUpvotes = function(flavor, comment){
        flavorsFactory.upvoteComment(flavor, comment);
      }

      $scope.readURL = function(scope){

        if (scope === 'temporaryProfile') {
          var files = document.getElementById("profile_input").files;
          var file = files[0];
          fileUploadFactory.readURL(files, file).then(function(data){
            $scope.user.temporaryProfile = data;
            $scope.$apply();
          }).catch(function(err){
              console.error('Augh, there was an error!', err.statusText);
          });
        } else {
          var files = document.getElementById("file_input").files;
          var file = files[0];
          fileUploadFactory.readURL(files, file).then(function(data){
            $scope.temporaryPicture = data;
            $scope.$apply();
          }).catch(function(err){
              console.error('Augh, there was an error!', err.statusText);
          });
        }


      }
	
	}]);
})();

