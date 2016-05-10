angular.module('fileUploadService', []).factory('fileUploadFactory', 
	['$http', 'auth', function($http, auth){
		var factory = {}

		/*
		    Function to carry out the actual PUT request to S3 using the signed request from the app.
		*/
		function upload_file(file, signed_request, url){
		    var xhr = new XMLHttpRequest();
		    xhr.open("PUT", signed_request);
		    xhr.setRequestHeader('x-amz-acl', 'public-read');
		  //   xhr.onload = function() {
		  //       if (xhr.status === 200) {
				// 	request = {
				// 		profilePic: url 
				// 	}
				// 	return $http.post('/api/user/save-profile-pic', request, {
				// 		headers: {Authorization: 'Bearer '+auth.getToken()}
				// 	});      
				// }
		  //   };
		    xhr.onerror = function() {
		        alert("Could not upload file."); 
		    };
		    xhr.send(file);
		}

		/*
		    Function to get the temporary signed request from the app.
		    If request successful, continue to upload the file using this signed
		    request.
		*/
		function get_signed_request(file){
			return new Promise(function(resolve, reject) { 
			    var xhr = new XMLHttpRequest();
			    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
			    xhr.onreadystatechange = function(){
			        if(xhr.readyState === 4){
			            if(xhr.status === 200){
			                var response = JSON.parse(xhr.responseText);
			                upload_file(file, response.signed_request, response.url);
			                resolve(response.url);
			            }
			            else {
			                alert("Could not get signed URL.");
			                reject({
					          status: this.status,
					          statusText: xhr.statusText
					        });
			            }
			        }
			    };
			    xhr.send();
			});
		}

		/*
		   Function called when file input updated. If there is a file selected, then
		   start upload procedure by asking for a signed request from the app.
		*/
		factory.init_upload = function(){
			return new Promise(function(resolve, reject){
			    var files = document.getElementById("file_input").files;
			    var file = files[0];
			    if(file == null){
			        alert("No file selected.");
			        return;
			    }
			    get_signed_request(file).then(function(data){
			    	resolve(data);
			    }).catch(function(err){
			    	console.error('Augh, there was an error!', err.statusText);
			    	reject(err.statusText);
			    });
			});
		}
	return factory;
}]);