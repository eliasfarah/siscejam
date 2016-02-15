angular.module('starter.controllers', [])

.controller('RegistrationCtrl', function($scope, $ionicPopup, $localstorage, User) {

  ionic.Platform.ready(function() {
    
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
        $localstorage.setObject('devId', data.registrationId);

        var user  = $localstorage.getObject('usuario');        

        User.insertDevId(user, data.registrationId)
            .success(function (result) {
                
            })
            .error(function (error) {                
                $ionicPopup.alert({
                    title: 'SIS CEJAM',
                    template: 'Erro no registro do dispostivo!'
                });
            });
    });
        
    push.on('error', function(e) {
        $ionicPopup.alert({
            title: 'SIS CEJAM',
            template: 'Erro ao registrar seu device!'
        });
    });

  });
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, $localstorage, User) {

    var usuario = $localstorage.getObject('usuario');

    if(!angular.equals({}, usuario)) {
        $state.go('tabs.registration');
    }

    $scope.signIn = function(user) {
        User.find(user)
        .success(function (user) {
            if(typeof user.Usuario !== 'object') {
                $ionicPopup.alert({
                    title: 'SIS CEJAM',
                    template: 'Usuário ou Senha Inválidos!'
                });
            } else {
                $localstorage.setObject('usuario', user);
                $state.go('tabs.registration');
            }
        })
        .error(function (error) {                
            $scope.user = {};
            $ionicPopup.alert({
                title: 'SIS CEJAM',
                template: 'Erro na conexão de internet!'
            });
        });
    };
});