const bcrypt = require('bcrypt-nodejs');

exports.generateErrorJSON = (message, details) => {
    return {error: message, details: details};
}

exports.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

exports.matchHash = function (val1, val2) {
    return bcrypt.compareSync(val1, val2);
};
