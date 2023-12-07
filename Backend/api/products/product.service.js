const pool = require('../../config/database');

module.exports = {
    createProducto: (data, callback) => {
        pool.query(
            `INSERT INTO products(name, price, description, status, category, sku, image, user,  created_at,  updated_at)
            VALUES(?,?,?,?,?,?,?,?, NOW(), NOW())`,
            [
                data.name,
                data.price,
                data.description,
                data.status,
                data.category,
                data.sku,
                data.image,
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
    getProductos: (callback) => {
        pool.query(
            `SELECT * FROM products`,
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                } 
                return callback(null, results); 
            });
    },
    getProductoById: (id, callback) => {
        pool.query(
            `SELECT * FROM products WHERE id = ?`,
            [id],
            (error, results, fields) => {

                if(error){
                    return callback(error);
                }

                return callback(null, results[0]);
            }
        )
    },
    getProductosActive: (limit, offset, sort, callback) => {

        if(offset == -1){
            offset = '';
        }else{
            offset = 'OFFSET ' + offset;
        }

        if(limit == -1){
            limit = '';
        }else{
            limit = 'LIMIT ' + limit;
        }

        pool.query(
            `SELECT * FROM products WHERE status = 1 ORDER BY id ${sort} ${limit} ${offset}`,
            [limit, offset],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getProductosPartial: (limit, offset, sort, callback) => {
        pool.query(
            `SELECT * FROM products ORDER BY id ${sort} LIMIT ? OFFSET ?`,
            [limit, offset],
            (error, results, fields) => {
                if(error){
                    console.log(error)
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    countProductos: (callback) => {
        pool.query(
            `SELECT COUNT(*) AS total FROM products`,
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0].total);
            }
        );
    },
    updateProducto(data, id, callback) {
        pool.query(
            `UPDATE products SET name = ?, price = ?, description = ?, status = ?, category = ?, sku = ?, image = ?,  updated_at = NOW() WHERE id=?`,
            [
                data.name,
                data.price,
                data.description,
                data.status,
                data.category,
                data.sku,
                data.image,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteProducto: (id, callback) => {
        pool.query(
            `DELETE FROM products WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    setActiveProducto(id, status, callback) {
        pool.query(
            `UPDATE products SET status = ? WHERE id = ?`,
            [status, id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    }
}
