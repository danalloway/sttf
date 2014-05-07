/**
 * PlayerController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    create: function(req, res) {

        Player.create(req.body).exec(function (err, saved) {

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
