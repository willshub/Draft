/**
 * Service factory which calls the Server side component //UBC Action classes
 * User: wraphale
 * Date: 7/17/13
 * Time: 11:35 AM
 * Note:: All DOM manipulations are to be done in the Directives and NOT in Controllers or Services
 */

angular.module('jsonService', ['ngResource'])
.factory('DraftManagementService', function($http) {

        var json = $http.get('industry.json').then(function(response) {
            return response.data;
        });

        var players = function(data) {
            if (data) angular.copy(data, this);
        };

        // The query function returns an promise that resolves to
        // an array of players, one for each in the JSON.
        players.query = function() {
            return json.then(function(data) {
                return data.map(function(player) {
                    return new players(player);
                });
            })
        };

        // The get function returns a promise that resolves to a
        // specific player, found by ID. We find it by looping
        // over all of them and checking to see if the IDs match.
        players.get = function(id) {
            return json.then(function(data) {
                var result = null;
                angular.forEach(data, function(player) {
                    if (player.id == id) result = new players(player);
                });
                return result;
            })
        };

        // Finally, the factory itself returns the entire
        // players constructor (which has `query` and `get` attached).
        return players;

});
