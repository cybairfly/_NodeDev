const jwt = require('jsonwebtoken');
const User = require('../models/user');

const access = async (req, res, next) => {
    console.log('verify access');

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwtsecret');
        // find matching token in the array of tokens for user
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            // handle below
            throw new Error();
        }

        req.token = token;
        req.user = user;
    } catch (error) {
        return res
            .status(401)
            .send({ error: 'Access denied' });
    }

    next();
};

module.exports = access;
