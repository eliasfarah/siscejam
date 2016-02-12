angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope) {

  ionic.Platform.ready(function(){
    // var PushNotification = window.plugins.PushNotification;

    var push = PushNotification.init({
            "android": {
                "senderID": "284873935680"
            },
            "ios": {
                "alert": "true", 
                "badge": "true", 
                "sound": "true"
            }, 
            "windows": {
                
            } 
        });
        
        push.on('registration', function(data) {
            console.log("registration event");
            document.getElementById("regId").innerHTML = data.registrationId;
            console.log(JSON.stringify(data));
        });

        push.on('notification', function(data) {
          console.log("notification event");
            console.log(JSON.stringify(data));
            var cards = document.getElementById("cards");
            var card = '<div class="row">' +
            '<div class="col s12 m6">' +
          '  <div class="card darken-1">' +
          '    <div class="card-content black-text">' +
          '      <span class="card-title black-text">' + data.title + '</span>' +
          '      <p>' + data.message + '</p>' +
          '    </div>' +
          '  </div>' +
          ' </div>' +
          '</div>';
            cards.innerHTML += card;
            
            push.finish(function () {
                console.log('finish successfully called');
            });
        });

        push.on('error', function(e) {
            console.log("push error");
        });

  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
