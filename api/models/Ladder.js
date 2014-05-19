/**
* Ladder.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {

        match_event: {
            model: 'Match'
        },

        player_event: {
            model: 'Player'
        },

        standings: {
            collection: 'Player',
            via: 'standing'
        }

    }

};
