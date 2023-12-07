const { createVenta, getVentasPartial, getVentaporById, getVentas, countVentas, addProducto, updateProducto, deleteProducto, updateVenta, deleteVentaPorId, getVentasDate } = require('./venta.service');
/*Crea una venta nueva. El request invoca a un json para crear una nueva venta.*/ 
module.exports = {
    createVenta: (req, res) => {
        const body = req.body;
        createVenta(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                data: {
                    result,
                }
            });
        });
    },
    /*Este procedimiento modificar las ventas antes de cerrar una compra.*/ 
    updateVenta: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        updateVenta(id, body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                data: {
                    result,
                }
            });
        });
    },
    // con este procedimiento eliminamos la venta en cuestion.
    deleteVentaPorId: (req, res) => {
        const id = req.params.id;

        deleteVentaPorId(id, (err, result) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                data: {
                    result,
                }
            })
        });
    },
    
    getVentasPartial: (req, res) => {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const sort = req.query.sort;
        const date = req.query.date;

        const options = {
            limit,
            offset,
            sort,
            date,
        };
        getVentasPartial(options, (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                data: result
            });
        });
    },
    getVentaporById: (req, res) => {
        const id = req.params.id;
        getVentaporById(id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                data: result
            });
        });
    },
    getVentas: (req, res) => {
        getVentas((err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                data: result
            });
        });
    },
    countVentas: (req, res) => {
        countVentas((err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                data: result
            });
        });
    },
    addProducto: (req, res) => {
        const { venta, producto, quantity } = req.body;
        addProducto({ venta, producto, quantity }, (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                data: result
            });
        });
    }, 
    updateProducto: (req, res) => {
        const { id, quantity } = req.body;
        updateProducto({ id, quantity }, (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                data: result
            });
        });
    },
    deleteProducto: (req, res) => {
        const id = req.params.id;
        deleteProducto(id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                data: result
            });
        });
    },
    getVentasDate: (req, res) => {
        const date = req.query.date.split('-');
        getVentasDate(date, (error, results) => {
            if (error) {
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }
}
