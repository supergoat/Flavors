(function(){
	angular.module('FindFriendsCtrl', []).controller('FindFriendsController', 
		[ 'friendsFactory', 'auth', '$window', function(friendsFactory, auth, $window) {
  			var friendsList = this;
  			friendsList.isLoggedIn = auth.isLoggedIn;

  			friendsList.currentUser = auth.currentUser;
        friendsList.currentUserId = auth.currentUserId;
  			
        friendsList.users = friendsFactory.users;
        friendsList.friends = friendsFactory.friends;
        friendsList.friendRequests = friendsFactory.friendRequests;

  			friendsList.sendFriendRequest = function(userId){
  				friendsFactory.sendFriendRequest(userId);
          $window.location.reload();
  			}

        friendsList.acceptFriendRequest = function(userId){
          friendsFactory.acceptFriendRequest(userId);
          $window.location.reload();
        }

        friendsList.deleteFriend = function(friendId){
          friendsFactory.deleteFriend(friendId);
          $window.location.reload();
        }

        friendsList.isPending = function(pendingRequests){
          if(pendingRequests.indexOf(friendsList.currentUserId()) !== -1){
            return true;
          } else {
            return false;
          }
        }

        friendsList.haveRequest = function(userId){
          for (var i = 0; i < friendsList.friendRequests.length; i++){
            if(friendsList.friendRequests[i]["_id"] === userId){
              return true;
            }  
          }
          return false;
        }

        friendsList.isFriend = function(userId){
          for (var i = 0; i < friendsList.friends.length; i++){
            if(friendsList.friends[i]["_id"] === userId){
              return true;
            }  
          }
          return false;
        }
		}]);
})();