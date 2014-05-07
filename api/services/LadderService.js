/**
 * Update the Ladder based on a match.
 */
exports.updateFromMatch = function(match) {

    Ladder.find().limit(1).sort('createdAt').exec(function (err, currentLadder) {

        // the current ladder
        var currentLadder = currentLadder.players;


        // the updated order of the ladder
        var updatedLadder = new Array();


        // if a match is forfeited, the loser moves to the end of the ladder
        // and the winner remains where they are
        if (match.match_type == 'forfeit') {
            for (var i = 0; i < currentLadder.length; i++) {
                if (currentLadder[i] != match.loser) {
                    updatedLadder.push(currentLadder[i]);
                }
            };

            updatedLadder.push(match.loser);
        }

        // otherwise, if a match it is a regulation match, then the winner
        // takes the loser' position and everyone else is bumped down by one
        else {

            // copy the array or else it acts as a pointer
            updated = currentLadder.slice(0);

            var winnerIndex = currentLadder.indexOf(match.winner);
            var loserIndex  = currentLadder.indexOf(match.loser);

            if (winnerIndex > loserIndex) {
                for (var i = loserIndex; i <= winnerIndex; i++) {
                    if (i == loserIndex) {
                        updatedLadder[i] = match.winner;
                    }
                    else {
                        updatedLadder[i] = currentLadder[i-1];
                    }
                }
            }
        }

        Ladder.create({
            match: match.id,
            players: updatedLadder
        }).done(function (err, saved) {
            if (err) {
                console.log(err);
            }
        });

    });

}


/**
 * Update the ladder based on a new player / removed player.
 */
exports.updateFromPlayer = function(player) {



}
