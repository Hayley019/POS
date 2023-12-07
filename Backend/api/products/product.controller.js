const { createProducto, getProductos, getProductosPartial, countProductos, deleteProducto, updateProducto, getProductoById, getProductosActive, setActiveProducto } = require('./product.service');
const { createUpload, deleteUpload, getUploadById } = require('./../uploads/upload.service');
const path = require('path');
const Resize = require('./../../middleware/resize');
const { unlink } = require('fs');

module.exports = {
    createProducto: async (req, res) => {
        const imagePath = path.join(__dirname, './../../uploads');
        const fileUpload = new Resize(imagePath);

        const body = JSON.parse(req.body.data);
        if (req.files.length > 0) {

            const filename = await fileUpload.save(req.files[0].buffer);
            var name = filename;
            var size = req.files[0].size;
            var type = req.files[0].mimetype;
            var path_file = "uploads/" + filename;
            var user = body.user;

            const data = {
                name,
                size,
                type,
                path_file,
                user
            }

            //Verificar 
            createUpload(data, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                body.image = result.insertId;
                createProducto(body, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            error: err
                        });
                    }
                    return res.json({
                        ok: true,
                        data: result
                    });
                });
            });
        } else {
            createProducto(body, (error, results) => {
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
            }
            );
        }
    },
    getProductos: (req, res) => {
        getProductos((error, results) => {
            if (error) {
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error",
                    error: error
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getProductoById: (req, res) => {
        const id = req.params.id;
        getProductoById(id, (error, results) => {
            if (error) {
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            /** Problema para adquirir el objeto de la imagen si existe */
            
            if (results.image != null) {
                
                let promise = new Promise((resolve, reject) => {
                    getUploadById(results.image, (error, upload) => {
                
                        if (error) {
                            reject(error);
                        }
                        
                         resolve(upload);
                    });
                });

                promise.then(
                    (upload) => {
                        results.image = upload;
                                
                        return res.status(200).json({
                            success: 1,
                            data: results
                        });
                    },
                    (error) => {
                    }
                );
            }else{

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }

        });
    },
    getProductosPartial: (req, res) => {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const sort = req.query.sort;

        console.log(req.query);
        getProductosPartial(limit, offset, sort, (error, results) => {
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
    },
    getProductosActive: (req, res) => {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const sort = req.query.sort;
        getProductosActive(limit, offset, sort, (error, results) => {
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
    },
    countProductos: (req, res) => {
        countProductos((error, results) => {
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
    },
    updateProducto: async (req, res) => {
        const imagePath = path.join(__dirname, './../../uploads');
        const fileUpload = new Resize(imagePath);
        const body = JSON.parse(req.body.data);
        const id = req.params.id;

        /** Mejorar el codigo para actualizar la imagen */
        if (req.files.length > 0) {

            const filename = await fileUpload.save(req.files[0].buffer);
            var name = filename;
            var size = req.files[0].size;
            var type = req.files[0].mimetype;
            var path_file = "uploads/" + filename;
            var user = body.user;

            const data = {
                name,
                size,
                type,
                path_file,
                user
            }
            createUpload(data, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                body.image = result.insertId;
                updateProducto(body, id, (err, resultado) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            error: err
                        });
                    }
                    return res.json({
                        ok: true,
                        data: resultado
                    });
                });
            });
        } else {
            updateProducto(body, id, (error, results) => {
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
            }
            );
        }
    },
    deleteProducto: (req, res) => {
        const id = req.params.id;
        deleteProducto(id, (error, results) => {
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
    },
    setActiveProducto: (req, res) => {
        const id = req.params.id;
        const body = req.body;

        setActiveProducto(id, body.status, (error, results) => {
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
