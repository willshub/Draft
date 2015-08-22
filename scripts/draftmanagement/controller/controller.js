/**
 * Controller which handles all Angular interations to the server side in Draft Management Module
 * User: wraphale
 * Date: 7/17/13
 * Time: 3:48 PM
 * Note:: All DOM manipulations are to be done in the Directives and NOT in Controllers
 */
'use strict';

draftManagementApp.controller('DraftController', function($scope, DraftManagementService) {
    $scope.rb = "RB";
    $scope.wr = "WR";
    $scope.qb = "QB";
    $scope.te = "TE";
    $scope.k = "K";
    $scope.dst = "DST";
/*
    $scope.qb = "QB";
    $scope.wr = "WR";
    $scope.rb = "TE";
*/

    $scope.players = DraftManagementService.query();
    console.log($scope.players);

    $scope.selectPlayer = function(player, action){
        if (action == 1) {
            player.selected="YES";
        } else if (action = 2) {
            player.selected = "MINE";
        }
    }

    $scope.isPlayerSelected = function(player){
        if (player.selected=="YES") {
            return 'picked';
        } else if (player.selected=="MINE") {
            return 'myPick';
        } else {
            return '';
        }
    }

});

draftManagementApp.filter('matchPosition', function() {
    return function( items, userAccessLevel ) {
        console.log('matchPosition',arguments);
        var filtered = [];
        angular.forEach(items, function(item) {
            if( item.position.indexOf(userAccessLevel) > -1) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});
