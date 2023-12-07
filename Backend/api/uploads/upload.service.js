const pool = require('../../config/database');

module.exports = {
    createUpload: async (data, callback) => {
        pool.query(
            `INSERT INTO uploads
            (name, type, size, path, user)
            VALUES(?,?,?,?,?)`,
            [
                data.name, 
                data.type, 
                data.size, 
                data.path_file, 
                data.user
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getUploads: async (callback) => {
        pool.query(
            `SELECT * FROM uploads`,
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getUploadById: (id, callback) => {
        pool.query(
            `SELECT * FROM uploads WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },
    getUploadActive: (limit, offset, sort, callback) => {
        if(limit == -1){
            limit = '';
        }
        else{
            limit = 'LIMIT ' + limit;
        }

        if(offset == -1){
            offset = '';
        }
        else{
            offset = 'OFFSET ' + offset;
        }

        pool.query(
            `SELECT * FROM uploads  WHERE active = 1 ORDER BY id ${sort} ${limit} ${offset}`,
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getUploadPartial: (limit, offset, sort, callback) => {

        if(limit == -1){
            limit = '';
        }
        else{
            limit = 'LIMIT ' + limit;
        }

        if(offset == -1){
            offset = '';
        }
        else{
            offset = 'OFFSET ' + offset;
        }

        pool.query(
            `SELECT * FROM uploads ORDER BY id ${sort} ${limit} ${offset}`,
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    countUpload: (callback) => {
        pool.query(
            `SELECT COUNT(*) AS total FROM uploads`,
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }

                return callback(null, results[0].total);
            }
        );
    },
    updateUpload: (id, data, callback) => {

        pool.query(
            `UPDATE uploads SET user=?, active=? WHERE id = ?`,
            [
                data.user,
                data.active, 
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
    deleteUpload: (id, callback) => {
        pool.query(
            `DELETE FROM uploads WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    }
}