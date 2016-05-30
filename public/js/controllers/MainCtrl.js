(function(){
	angular.module('MainCtrl', []).controller('MainController',
		['$scope', 'currentUserFactory', 'flavorsFactory', 'fileUploadFactory', 'auth', function($scope, currentUserFactory, flavorsFactory, fileUploadFactory, auth) {
  			$scope.isLoggedIn = auth.isLoggedIn;
  			$scope.flavors = flavorsFactory.flavors;
  			$scope.user = currentUserFactory.user;

  			var currentUserId = auth.currentUserId();

			$scope.addFlavor = function(){

	      if(!this.title || this.title === '') { 
					this.error = 'Title is required';
					return; 
				} else if ($scope.temporaryPicture && $scope.temporaryPicture !== '') {
					var title = this.title;
					fileUploadFactory.init_upload('file_input').then(function(data){
	          var flavorImage = data;
						flavorsFactory.create(currentUserId, {
							post: false,
							title: title,
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
					flavorsFactory.create(currentUserId, {
						title: this.title
					});
					this.error = '';
					this.title = '';
				}
			};

			$scope.removePhoto = function(){
				$scope.temporaryPicture = '';
				document.getElementById("file_input").value = '';
			}

			$scope.incrementUpvotes = function(flavor){
				flavorsFactory.upvote(flavor);
			}

	  		$scope.readURL = function(){
	  			var files = document.getElementById("file_input").files;
				var file = files[0];

	  			fileUploadFactory.readURL(files, file).then(function(data){
	  				$scope.temporaryPicture = data;
	  				$scope.$apply();
	  			}).catch(function(err){
            		console.error('Augh, there was an error!', err.statusText);
        		});
	  		}

 			$scope.addComment = function(flavor){
 				if(!this.body || this.body === '') {
					return; 
 				}
 				flavorsFactory.addComment(currentUserId, flavor._id,{
 					body: this.body
 				}).success(function(comment){
 					flavor.comments.push(comment);
 				});
 				this.body = '';
 			};

 			$scope.incrementCommentUpvotes = function(flavor, comment){
				flavorsFactory.upvoteComment(flavor, comment);
			}


 			$scope.showComments = function(flavorId){
 				if($scope.flavorShowComments !== flavorId){
 					$scope.flavorShowComments = flavorId;
 				} else {
 					$scope.flavorShowComments = '';
 				}
 			};


	}]);
})();