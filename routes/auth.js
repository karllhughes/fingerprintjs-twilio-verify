const express = require('express');
const router = express.Router();
const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID} = process.env;
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const users = [
    {
        id: 1,
        username: 'karl',
        password: 'abc123',
        phone: '+19018279637',
        lastKnownVisitorId: '27be69f19cf7951d0100ec48924c638b',
    },
];

const authenticate = (username, password) => {
    return username && password && users.find(user => user.username === username && user.password === password);
}

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.post('/login', (req, res) => {
    const session = req.session;
    const user = authenticate(req.body.username, req.body.password);
    if (user) {
        session.user = user;
        if (user.lastKnownVisitorId === req.body.visitorId) {
            session.verified = true;
            res.redirect('/');
        } else {
            session.verified = false;
            twilio.verify.services(VERIFICATION_SID)
                .verifications
                .create({to: user.phone, channel: 'sms'})
                .then(() => res.redirect('/auth/verify'));
        }
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/verify', function (req, res, next) {
    res.render('verify');
});

router.post('/verify', (req, res) => {
    const session = req.session;
    if (session.user) {
        twilio.verify.services(VERIFICATION_SID)
            .verificationChecks
            .create({to: session.user.phone, code: req.body.code})
            .then(verification_check => {
                if (verification_check.status === 'approved') {
                    session.verified = true;
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
            });
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;
