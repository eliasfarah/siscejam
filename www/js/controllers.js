angular.module('starter.controllers', ['ionic'])

.controller('RegistrationCtrl', function($scope) {

  ionic.Platform.ready(function(){
    
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
        document.getElementById("regId").innerHTML = data.registrationId;
        // post para o servidor
    });
        
    push.on('error', function(e) {
        console.log("Erro ao registrar seu device!");
    });

  });
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, User) {

    $scope.signIn = function(user) {        
        // console.log(User.find(user));
            User.find(user)
            .success(function (user) {

                if(typeof user.Usuario !== 'object') {
                    $ionicPopup.alert({
                        title: 'SIS CEJAM',
                        template: 'Usuário ou Senha Inválidos!'
                    });
                } else {
                    $scope.user = user;
                    console.log(user);
                    $state.go('tabs.registration');
                }                
            })
            .error(function (error) {                
                $scope.user = {};
                $scope.status = 'Unable to load customer data: ' + error.message;
                console.log(error);
            });        
    };
  
});
