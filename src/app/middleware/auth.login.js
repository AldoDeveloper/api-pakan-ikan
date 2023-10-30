const { verify } = require('jsonwebtoken');
const { JWT_SECRET } = require('../service/service.app');

async function protectedAuthJwt(req, res, next) {
    const token = req.header('Authorization');
    if (token) {
        const [type, tokenJwt] = token.split(' ');

        if (!tokenJwt) {
            return (
                res.status(401).json({ message: 'Authorization token is missing' })
            )
        }
        verify(tokenJwt, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    code: 403,
                    error: true,
                    message: err.message
                })
            }
            req.user = user;
            next()
        })
    }else{
        next(new Error('No Header Authorization...'))
    }
}

module.exports = { protectedAuthJwt }