var app = angular.module('dischat', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl',
			})

			.state('chat', {
				url: '/chat/{id}',
				templateUrl: '/chat.html',
				controller: 'MainCtrl'
			})

		$urlRouterProvider.otherwise('home');
}]);

app.factory('socket', function($rootScope) {
	var socket = io();
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;

				argsFixed = {
					msg: args[0],
					user: args[1]
				}

				console.log(argsFixed.msg);

				$rootScope.$apply(function() {
					callback(argsFixed);
				})
			})
		},

		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if (callback) {
						callback(socket, args);
					}
				})
			})
		}
	}
});

app.controller('MainCtrl', [
	'$scope',
	'$state',
	'socket',
	function($scope, $state, socket) {
		$scope.messages = [];

		socket.on('chat message', function (message) {
			console.log("RECEIVED");

			console.log($scope.messages);
    		$scope.messages.push(message);
    		console.log($scope.messages);
  		});

		$scope.genChars = function(length, chars) {
   			var result = '';
    		for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    		return result;
		};

		$scope.goChat = function() {
			var charString = $scope.genChars(15, 'abcdefghijklmnoABCDEFGHIJK');
			$state.go('chat', {'id': charString});
		};

    	$scope.sendMessage = function () {
    		console.log($scope.message);
    		console.log($scope.user);
    		socket.emit('chat message', {
      			msg: $scope.message,
      			user: $scope.user
    		});


    		// clear message box
    		$scope.message = '';
  		};
  }]);