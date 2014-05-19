/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true
        },

        password: {
            type: 'string',
            required: true
        }
    },

    beforeCreate: function (user, next) {
        var bcrypt = require('bcrypt');

        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    }

};
