angular.module('fileUploadService', []).factory('fileUploadFactory', 
	['$http', 'auth', '$window', function($http, auth, $window){
		var factory = {}

		/*
		    Function to carry out the actual PUT request to S3 using the signed request from the app.
		*/
		function upload_file(file, signed_request, url){
			return new Promise(function(resolve, reject) { 
			    var xhr = new XMLHttpRequest();
			    xhr.open("PUT", signed_request);
			    xhr.setRequestHeader('x-amz-acl', 'public-read');
			    xhr.onload = function() {
			        if (xhr.status === 200) {
						resolve('done');   
					}
			    };
			    xhr.onerror = function() {
			        alert("Could not upload file."); 
			    };
			    xhr.send(file);
			});
		}

		/*
		    Function to get the temporary signed request from the app.
		    If request successful, continue to upload the file using this signed
		    request.
		*/
		function get_signed_request(file){
			return new Promise(function(resolve, reject) { 
			    var xhr = new XMLHttpRequest();
			    var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
			    var filename = Date.now().toString() + payload._id;
			   	
			    console.log(filename);
			    xhr.open("GET", "/sign_s3?file_name="+filename+"&file_type="+file.type);
			    xhr.onreadystatechange = function(){
			        if(xhr.readyState === 4){
			            if(xhr.status === 200){
			                var response = JSON.parse(xhr.responseText);
			                upload_file(file, response.signed_request, response.url).then(function(data){
			                	resolve(response.url);
			                }).catch(function(err){
			                	console.error('Augh, there was an error!', err.statusText);
			    				reject(err.statusText);
			                });
			                
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
		factory.init_upload = function(inputId){
			return new Promise(function(resolve, reject){
			    var files = document.getElementById(inputId).files;
			    var file = files[0];
			    if(file == null){
			        alert("No file selected.");
			        return;
			    }
			    get_signed_request(file).then(function(data){
			    	document.getElementById("file_input").value = '';
			    	resolve(data);
			    }).catch(function(err){
			    	console.error('Augh, there was an error!', err.statusText);
			    	reject(err.statusText);
			    });
			});
		}

		factory.readURL = function(files, file) {
			return new Promise(function(resolve, reject){
	  			if (files && file) {
	  				var reader = new FileReader();

	  				reader.onload = function(e) {
	  					resolve(e.target.result);
	  				}

	  				reader.readAsDataURL(file);
	  			};
	  		});
  		}
	return factory;
}]);