const { user } = require('../models/user');
const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    //POST

    next();
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    //PUT

    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;