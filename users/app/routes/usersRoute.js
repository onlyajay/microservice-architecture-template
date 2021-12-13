'use strict';
module.exports = function (app) {
    var usersInstance = require('../controllers/usersController');

    app.route('/users')
        .get(usersInstance.listAll)
        .post(usersInstance.createNew);

    app.route('/users/:user_id')
        .get(usersInstance.readById)
        .put(usersInstance.updateById)
        .delete(usersInstance.deleteById);
};
