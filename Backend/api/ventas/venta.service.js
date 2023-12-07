const pool = require('../../config/database');

module.exports = {
   createVenta: async (data, callback) => {
        // const lastFolio = `SELECT folio FROM pos.ventas WHERE date(created_at) = ${date} ORDER BY id DESC LIMIT 1;`;
        //crear venta
        var folio = null;
          
        // folio = await pool.query(`SELECT folio FROM ventas WHERE date(created_at) = CURRENT_DATE() ORDER BY id DESC LIMIT 1;`, (err, result) => {
        //     if (err) {
        //         return -1;
        //     }
        //     return result;
        // });

        let promise = new Promise((resolve, reject) => {
            pool.query(`SELECT folio FROM ventas WHERE date(created_at) = CURRENT_DATE() ORDER BY id DESC LIMIT 1;`, (err, result) => {
                if (err) {
                    reject(-1);
                }
                resolve(result);
            });
        });

        await promise.then(result => {
            folio = result;
        });

        if(folio.length <= 0) folio = 0;
        else folio = folio[0].folio + 1;
        const query = `INSERT INTO ventas(user, created_at, updated_at, folio, status) VALUES(${data.user}, NOW(), NOW(), ${folio}, '${data.status}');`;
        pool.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result.insertId);
        });   
   },
   updateVenta: async (id, data, callback) => {
        const query = `UPDATE ventas SET total = ${data.total}, subtotal = ${data.subtotal}, iva = ${data.iva}, total = ${data.total}, name = '${data.name}', notes = '${data.notes}',status = '${data.status}', updated_at = NOW() WHERE id = ${id};`;
        pool.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
    },
    deleteVentaPorId: async(id, callback) => {
        pool.query("DELETE FROM productos_en_venta WHERE venta = ?", [id]);
        
        pool.query(
            'DELETE FROM ventas WHERE id = ?', [id], (err, result) => {
                if(err) {
                    return callback(err);
                }

                return callback(null, result);
            }
        )
    },
   getVentasPartial: async (options, callback) => {
        const query = `SELECT * FROM ventas WHERE date(created_at) = '${options.date}' ORDER BY id ${options.sort} LIMIT ${options.limit} OFFSET ${options.offset};`;
        await pool.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
   },
   countVentas: async (callback) => {
        const query = `SELECT COUNT(*) as total FROM ventas`;
        await pool.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result[0]);
        });
   },
   getVentaporById: async (id, callback) => {
        let promise = new Promise((resolve, reject) => {
            pool.query(`SELECT productos_en_venta.id, productos_en_venta.venta, productos_en_venta.producto, productos_en_venta.quantity, products.name, products.price FROM productos_en_venta INNER JOIN products WHERE productos_en_venta.producto = products.id AND productos_en_venta.venta = ${id};`, (err, result) => {
                if (err) {
                    reject(-1);
                }
                resolve(result);
            });
        });

        var productos;
        await promise.then(result => {
            productos = result;
        });
        const query = `SELECT * FROM ventas WHERE id = ${id}`;
        await pool.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }

            const data = {
                venta: result[0],
                productos: productos
            } 

            return callback(null, data);
        });
   },
   getVentas: async (callback) => {
        const query = `SELECT * FROM ventas`;
        await pool.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
   },
   addProducto: async (data, callback) => {
        const query = `INSERT INTO productos_en_venta(venta, producto, quantity) VALUES(${data.venta}, ${data.producto}, ${data.quantity});`;
        await pool.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
   },
   updateProducto: async (data, callback) => {
        const query = `UPDATE productos_en_venta SET quantity = ${data.quantity} WHERE id = ${data.id};`;
        await pool.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
   },
   deleteProducto: async(id, callback) => {
        const query = `DELETE FROM productos_en_venta WHERE id = ${id};`;
        await pool.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
   },
   getVentasDate: (date, callback) => {
        pool.query(
            `SELECT * FROM ventas WHERE YEAR(created_at) = ? AND MONTH(created_at) = ? AND status = 'CERRADA'`,
            [ parseInt(date[0]), parseInt(date[1])],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
   }
}
