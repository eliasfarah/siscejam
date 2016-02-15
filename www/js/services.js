angular.module('starter.services', [])

.factory('User', function($http) {
  
	var urlBase = 'https://sis.cejam.org.br/cejam';
	//var urlBase = 'http://localhost:8100/api';
	var User = {};

	User.find = function (user) {		
		return $http.post(urlBase + '/usuarios/login_json?rnd='+new Date().getTime(), user);
	};

	return User;
});