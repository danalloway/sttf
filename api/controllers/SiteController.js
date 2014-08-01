var needle  = require('needle');
var utility = require('../services/utility')

/**
 * SiteController.js
 *
 * @description :: Handles interaction with the API routes providing the UI.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    // home
    index: function(req, res) {
        res.view('home');
    },

    // rules
    rules: function(req, res) {
        res.view('rules');
    },

    // new player form
    join: function(req, res) {
        res.view('join');
    },

    // post submitted form to the player API route
    postJoin: function(req, res) {
        needle.post('http://localhost:1337/player', req.body, function (err, resp, player) {
            if (!err && resp.statusCode == 200) {
                req.flash('success', player.nickname + ' has joined S.T.T.F!');
                res.redirect('/');
            }
            else {
                req.flash('danger', 'The S.T.T.F minions didnt like that, try again!');
                res.redirect('/join');
            }
        });
    },

    // new match form
    record: function(req, res) {
        Player.find().sort('firstName ASC').exec(function (err, players) {
            if (!err) {
                res.view('record', { players: players });
            }
        });
    },

    // post the submitted form to the match API route
    postRecord: function(req, res) {
        if (req.body.challenger == req.body.defender) {
            req.flash('danger', 'HEY! Players can not play with themselves!');
            res.redirect('/record');
        }
        else {
            needle.post('http://localhost:1337/match', req.body, function (err, resp, match) {
                if (!err && resp.statusCode == 200) {
                    req.flash('success', 'Your match has been RECORDED!');
                    res.redirect('/matches');
                }
                else {
                    req.flash('danger', 'The S.T.T.F minions didnt like that, try again!');
                    res.redirect('/record');
                }
            });
        }
    },

    matches: function(req, res) {
        Match.find().sort({ createdAt: 'desc' })
            .populate('winner').populate('loser').populate('challenger').populate('defender')
            .exec(function (err, matches) {
                res.view('matches', { matches: matches, utility: utility });
        });
    },

    roster: function(req, res) {
        Player.find().sort('firstName ASC').exec(function (err, players) {
            if (!err) {
                res.view('roster', { players: players });
            }
        });
    },

    login: function(req, res) {
        res.view('login');
    },

    postAuth: function(req, res) {
        var bcrypt = require('bcrypt');

        User.findOneByUsername(req.body.username).exec(function (err, user) {
            if (!err && user) {
                bcrypt.compare(req.body.password, user.password, function (err, match) {
                    if (!err && match) {
                        req.session.user = user;
                        req.session.authenticated = true;
                        req.flash('success', 'You have been logged in!');
                        res.view('home');
                    }
                    else {
                        req.flash('danger', 'The S.T.T.F minions didnt like that, try again!');
                        res.view('login');
                    }
                });
            }
            else {
                req.flash('danger', 'The S.T.T.F minions didnt like that, try again!');
                res.view('login');
            }
        });
    },

    logout: function (req,res){
        req.session.authenticated = null;
        req.session.destroy();
        req.flash('success', 'You have been logged out!');
        res.redirect('/');
    },
    
    // live feed
    livefeed: function(req, res) {
        res.view('live-feed');
    },

};
