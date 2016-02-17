angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $ionicPopup, $localstorage, $ionicLoading, User) {

    var usuario = $localstorage.getObject('usuario');

    if(!angular.equals({}, usuario)) {        
        var devId = $localstorage.getObject('devId');
        if(!angular.equals({}, devId)) {            
            $state.go('tabs.notifications');
        } else {            
            $state.go('registration');
        }        
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
                $ionicLoading.show({
                    template: 'Carregando...'
                });
                $state.go('registration');
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
})

.controller('RegistrationCtrl', function($scope, $state, $ionicPopup, $localstorage, $ionicLoading, User) {

  ionic.Platform.ready(function() {
    
    var push = PushNotification.init({
        "android": {
            "senderID": "284873935680",
            "forceShow" : "true"
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
        $ionicLoading.hide();
        $localstorage.setObject('devId', data.registrationId);

        var user  = $localstorage.getObject('usuario');

        User.insertDevId(user, data.registrationId)
            .success(function (result) {
                $state.go('tabs.notifications');
            })
            .error(function (error) {                
                $ionicPopup.alert({
                    title: 'SIS CEJAM',
                    template: 'Verifique a conexão de internet!'
                });
                $state.go('login');
            });
    });
        
    push.on('error', function(e) {
        $ionicPopup.alert({
            title: 'SIS CEJAM',
            template: 'Erro no registro do dispostivo!'
        });
    });

  });
})

.controller('NotificationsCtrl', function($scope, $state, $sce, $ionicPopup, $localstorage, Notification) {

    var usuario = $localstorage.getObject('usuario');
    
    Notification.find(usuario.Usuario.id)
    .success(function (notifications) {        
        $scope.notifications = notifications;
    })
    .error(function (error) {
        $scope.user = {};

        $ionicPopup.alert({
            title: 'SIS CEJAM',
            template: 'Erro na conexão de internet!'
        });
    });    
});