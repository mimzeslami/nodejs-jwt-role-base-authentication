const { body } = require('express-validator');


exports.rules = () => {
    return [
        body('title').notEmpty(),
    ]
}
