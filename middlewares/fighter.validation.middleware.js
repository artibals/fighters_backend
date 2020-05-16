const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    //POST
    next();
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    //PUT

    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;