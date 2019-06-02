const sequelize = require('../models').sequelize;

module.exports = {
    insert(req,res){
        console.log("insert 실행");
        return sequelize
        .query('INSERT INTO test(testcol) VALUES(?)',
        { replacements : [ "테스트" ], type : sequelize.QueryTypes.INSERT})
    },

    reject(req, res){
        // setTimeout(()=> {
            console.log("reject 실행");
             return sequelize
            .query('SELECT testtt FROM test') },
        // 5000);
    // }

    transaction(req, res){
        return sequelize.transaction().then((t) => {
            return sequelize
            .query('INSERT INTO tests(testcol) VALUES(?)',
            { replacements : [ "테스트" ], type : sequelize.QueryTypes.INSERT }, {transaction : t})
            .then(() => {
                return sequelize
                .query('SELECT testtt FROM tests WHERE testcol = ?',
                { replacements : ["test"], type : sequelize.QueryTypes.SELECT }, {transaction : t})
            }).then(() => {
                t.commit();
            }).catch(err => {
                console.log( t);
                console.log("err");
                console.log(err);
                t.rollback();
            })
        })
        // return sequelize.transaction().then(t => {
        //     return sequelize
        //     .query('INSERT INTO test(testcol) VALUES(?)',
        //     { replacements : [ "테스트" ], type : sequelize.QueryTypes.INSERT }, {transaction : t})
        //     .then(() => {
        //         return sequelize
        //         .query('SELECT testtt FROM test WHERE testcol = ?',
        //         { replacements : ["test"], type : sequelize.QueryTypes.SELECT }, {transaction : t})
        //     }).then(() => {
        //         return t.commit();
        //     }).catch(err => {
        //         console.log("err");
        //         console.log(err);
        //         return t.rollback();
        //     })
        // })
    },
}