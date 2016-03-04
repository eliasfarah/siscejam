angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $ionicPopup, $localstorage, $ionicLoading, User) {

    $ionicLoading.hide();
    var usuario = $localstorage.getObject('usuario');

    if(!angular.equals({}, usuario)) {
        $state.go('tabs.notifications');
    }

    $scope.signIn = function(user) {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

        User.find(user)
        .success(function (user) {
            if(typeof user.Usuario !== 'object') {
                $ionicPopup.alert({
                    title: 'SIS CEJAM',
                    template: 'Usuário ou Senha Inválidos!'
                });
                $ionicLoading.hide();
            } else {
                $localstorage.setObject('usuario', user);
                                
                var devId = $localstorage.getObject('devId');

                if(!angular.equals({}, devId)) {
                    User.insertDevId(user, devId)
                        .success(function (result) {
                            $state.go('tabs.notifications');
                        })
                        .error(function (error) {
                            $ionicPopup.alert({
                                title: 'SIS CEJAM',
                                template: 'Verifique a conexão de internet!'
                            });
                            $localstorage.setObject('usuario', {});
                            $ionicLoading.hide();
                            $state.go('login');
                        });
                }
            }
        })
        .error(function (error) {
            $ionicPopup.alert({
                title: 'SIS CEJAM',
                template: 'Erro na conexão de internet!'
            });
            $ionicLoading.hide();
            $state.go('login');
        });
    };
})

.controller('NotificationsCtrl', function($scope, $state, $sce, $ionicPopup, $localstorage, $ionicLoading, Notification) {
    $ionicLoading.hide();    
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
})

.controller('AccountCtrl', function($scope, $state, $ionicPopup, $localstorage, $ionicLoading, Notification, User) {

    var usuario = $localstorage.getObject('usuario');
    $scope.user = usuario;
    
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

    $scope.signOut = function() {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

        var usuario = $localstorage.getObject('usuario');
        var devId = $localstorage.getObject('devId');

        User.deleteDevId(devId)
            .success(function (result) {
                $localstorage.setObject('usuario', {});
                $ionicLoading.hide();
                $state.go('login');
            })
            .error(function (error) {                            
                $ionicPopup.alert({
                    title: 'SIS CEJAM',
                    template: 'Erro na conexão de internet!'
                });
                $ionicLoading.hide();
            });        
    };
});