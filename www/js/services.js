angular.module('starter.services', [])

.constant('ApiEndpoint', {
	url: 'https://sis.cejam.org.br/cejam'
	//url: 'http://localhost:8100/api'
})

.factory('User', function($http, ApiEndpoint) {
  
  	var User = {};

	User.find = function (user) {
		return $http.post(ApiEndpoint.url + '/usuarios/login_json?rnd='+new Date().getTime(), user);
	};

	User.insertDevId = function (user, devId) {
		var data = { 'user': user, 'devId': devId, 'os': ionic.Platform.platform() };
		
		return $http.post(ApiEndpoint.url + '/usuarios/insert_dev_id?rnd='+new Date().getTime(), data);
	};

	User.deleteDevId = function (devId) {
		var data = { 'devId': devId }
		return $http.post(ApiEndpoint.url + '/usuarios/delete_dev_id?rnd='+new Date().getTime(), data);		
	};

	return User;
})

.factory('Notification', function($http, ApiEndpoint) {

	var Notification = {};

	Notification.find = function (user) {		
		return $http.get(ApiEndpoint.url + '/notificacoes/listar/'+user+'?rnd='+new Date().getTime());
	};

	return Notification;
});