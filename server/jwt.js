const config = {
    secret: 'yani_mrz_33',
    expiresIn: '24h',
}

const jsonwebtoken = require('jsonwebtoken');

const createToken = (payload) => {
    return jsonwebtoken.sign(payload, config.secret, { expiresIn: config.expiresIn });
}

const verifyToken = (token) => {
    return jsonwebtoken.verify(token, config.secret);
}

module.exports = { createToken, verifyToken };