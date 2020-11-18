const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../user/User');
const VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    }, 
    (err, user) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
            return;
        }

        var token = jwt.sign(
            {
                id: user._id, 
            }, config.secret, 
            {
                expiresIn: 86400
            });

        res.status(200).json({
                auth: true,
                token: token
            });
    });
});

router.get('/me', VerifyToken, (req, res, next) => {
    User.findById(req.userId, { password: 0 }, (err, user) => {
        if (err) {
            res.status(500).send("There was a problem finding the user.");
        }
        if (!user) { 
            res.status(404).send("No user found.");
        }
        next(user);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(500).send('Error on the server');
            return;
        }
        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                auth: false,
                token: null
            });
            return;
        }

        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });

        next(user);
    });
});

router.use((user, req, res, next) => {
    res.status(200).send(user);
});

module.exports = router;
