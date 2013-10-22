angular
  .module('OverlayApp', ['ng-overlay'])
  .controller('OverlayCtrl', ['$scope', function($scope) {
    'use strict';
    $scope.active = true;
    $scope.position = 'top-right';
  }]);
