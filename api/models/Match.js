/**
* Match.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {

        match_type: {
            type: 'string',
            in: ['regulation', 'forfeit'],
            defaultsTo: 'regulation',
            required: true
        },

        winner: {
            model: 'Player'
        },

        loser: {
            model: 'Player'
        },

        challenger: {
            model: 'Player',
            required: true
        },
        challenger_game1: {
            type: 'integer',
            required: true,
            min: 0,
            max: 99
        },
        challenger_game2: {
            type: 'integer',
            required: true,
            min: 0,
            max: 99
        },
        challenger_game3: {
            type: 'integer',
            min: 0,
            max: 99
        },

        defender: {
            model: 'Player',
            required: true
        },
        defender_game1: {
            type: 'integer',
            required: true,
            min: 0,
            max: 99
        },
        defender_game2: {
            type: 'integer',
            required: true,
            min: 0,
            max: 99
        },
        defender_game3: {
            type: 'integer',
            min: 0,
            max: 99
        }

    },

    /**
     * Determine the winner / loser of the match.
     */
    beforeValidate: function(values, next) {

        var challenger_wins = defender_wins = 0;

        // game 1
        if (values.challenger_game1 > values.defender_game1) {
            challenger_wins++;
        }
        else {
            defender_wins++;
        }

        // game 2
        if (values.challenger_game2 > values.defender_game2) {
            challenger_wins++;
        }
        else {
            defender_wins++;
        }

        // game 3 (optional)
        if (values.challenger_game3 && values.defender_game3) {
            if (values.challenger_game3 > values.defender_game3) {
                challenger_wins++;
            }
            else {
                defender_wins++;
            }
        }
        else {
            values.challenger_game3 = 0;
            values.defender_game3 = 0;
        }

        // determine the winner and loser
        if (challenger_wins > defender_wins) {
            values.winner = values.challenger;
            values.loser = values.defender;
        }
        else {
            values.winner = values.defender;
            values.loser = values.challenger;
        }

        next();

    }

};
