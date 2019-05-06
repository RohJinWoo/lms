var sequelize = require('../models').sequelize;

module.exports = {
    notice(req, res){
        return sequelize
        .query('', {})
        .then(result => {

        })
        .catch(err => {

        });
    }
}