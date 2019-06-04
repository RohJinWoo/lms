const sequelize = require('../models').sequelize;
const tests = require('../models').tests;

module.exports = {
    insert(req, res, t){
        console.log("insert 실행");
        return sequelize
        .query('INSERT INTO test(testcol) VALUES(?)',
        { replacements : [ "테스트" ], type : sequelize.QueryTypes.INSERT}, { transaction : t })
    },

    reject(req, res, t){
        // setTimeout(()=> {
            console.log("reject 실행");
             return sequelize
            .query('SELECT testtt FROM test', { transaction : t }) },
        // 5000);
    // }

    // 확인용
    transaction(req, res){
        return sequelize.transaction().then((t) => {
            return tests
            .create({ testcol : "테스트" }, { transaction : undefined })
            .then((result) => {
                // console.log(result);
                // t.commit();
                // res.send("커밋");
                // return { t : t, result : result };
                if(req.query.bool){
                    this.test(req,res,t);
                    console.log("TRTRETYE");
                    console.log(result);
                    return result;
                }
                return result;
            })
            .catch(err => {
                return { t : t, err : err };
                // console.log("err");
                // console.log(err);
                // t.rollback();
                // res.send("롤백");
            })
        })
    },

    test(req, res, t){
        return sequelize
        .query("SELECT * FROM tests", { transaction : t })
        .then(result => {
            return { result : true, transaction : t, data : result };
        })
        .catch(err => {
            return { result : false, transaction : t, data : err };
        });
    },

    transaction_s(req, res){
        return sequelize.transaction().then((t) => {
            return sequelize
            .query('INSERT INTO tests(testcol, createdAt, updatedAt) VALUES("테스트", "2019-06-04 05:04:58", "2019-06-04 05:04:58")',
            { transaction : t })
            .then(() => {
                t.commit();
                res.send("되는가?");
            })
            .catch(err => {
                console.log(err);
                t.rollback();
                res.send(err);
            })
        })
    }
}