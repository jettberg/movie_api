const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport');

let generateJWTToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            Username: user.Username,
            isAdmin: user.isAdmin
        },
        jwtSecret,
        {
            subject: user.Username,
            expiresIn: '7d',
            algorithm: 'HS256'
        }
    );
};

module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', {session: false}, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, {session: false}, (error) => {
                if (error) {
                   return res.send(error);
                }

                const token = generateJWTToken(user.toJSON());
            return res.json({ user, token});
            });
        })(req, res);
    });
};