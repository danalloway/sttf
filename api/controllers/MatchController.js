/**
 * MatchController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    create: function(req, res) {
        var moment = require('moment');

        Match.create(req.body).exec(function (err, saved) {

            if (err) {
                console.log(err);
                res.send(500, err);
            }
            else {
                console.log(saved);
                res.send(saved);
            }

        });

    }

};
