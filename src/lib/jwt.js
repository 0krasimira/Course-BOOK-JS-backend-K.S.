const util = require('util');
const jwt = require('jsonwebtoken');

const sign = util.promisify(jwt.sign)

// turning jwt.verify from callback into a promise with util core module - same functionality as the sign function
const verify = util.promisify(jwt.verify);

module.exports = {
    sign,
    verify,
};