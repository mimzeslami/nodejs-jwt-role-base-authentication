const { body } = require('express-validator');


exports.rules = () => {
    return [
        body('email').notEmpty(),
        body('password').notEmpty(),
        body('email').isEmail()

    ]
}
