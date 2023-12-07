const pool = require('../../config/database');

module.exports = {
    createBill: (data, callback) => {
        pool.query(
            `INSERT INTO bills
            (concept, amount, notes, created_at, updated_at)
            VALUES(?,?,?,NOW(),NOW())`,
            [
                data.concept, 
                data.amount, 
                data.notes, 
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getBills: (callback) => {
        pool.query(
            `SELECT * FROM bills`,
            [],
            (error, results, fields) => {
                if(error){
                    callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getBillById: (id, callback) => {
        pool.query(
            `SELECT * FROM bills WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )   
    },
    updateBill: (id, data, callback) => {
        pool.query(
            `UPDATE bills SET concept = ?, amount = ?, notes = ?, updated_at = NOW() WHERE id = ?`,
            [
                data.concept, 
                data.amount, 
                data.notes, 
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    deleteBill: (id, callback) => {
        pool.query(
            `DELETE FROM bills WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },
    countBills: (callback) => {
        pool.query(
            'SELECT COUNT(*) AS total FROM bills',
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },
    getBillsPartial: (limit, offset, sort, date, callback) => {
        pool.query(
            `SELECT * FROM bills WHERE YEAR(created_at) = ? AND MONTH(created_at) = ? ORDER BY id ${sort} LIMIT ? OFFSET ? `,
            [ parseInt(date[0]), parseInt(date[1]), limit, offset],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getBillsDate: (date, callback) => {
        pool.query(
            `SELECT * FROM bills WHERE YEAR(created_at) = ? AND MONTH(created_at) = ?`,
            [ parseInt(date[0]), parseInt(date[1])],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
   }
};