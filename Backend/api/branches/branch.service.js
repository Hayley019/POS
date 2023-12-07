const pool = require('../../config/database');

module.exports = {
    createBranch: (data, callback) => {
        pool.query(
            `INSERT INTO branchs(name, telephone, address, created_at,  updated_at)
            VALUES(?,?,?, NOW(), NOW())`,
            [
                data.name,
                data.telephone,
                data.address,
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getBranches: (callback) => {
        pool.query('SELECT * FROM branchs', [], (error, result, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, result);
        });
    },
    getBranchById: (id, callback) => {
        pool.query('SELECT * FROM branchs WHERE id = ?', [id], (error, result, fields) => {
            if(error){
                return callback(error);
            }
            return callback(null, result);
        });
    }
}
