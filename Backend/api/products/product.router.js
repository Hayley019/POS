const { createProducto, getProductos, getProductosPartial, countProductos, deleteProducto, updateProducto, getProductoById, getProductosActive, setActiveProducto } = require('./product.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
const upload = require('./../../middleware/upload');

router.get('/', getProductos);
router.post('/',upload.any(), createProducto);
router.get('/partial', getProductosPartial);
router.get('/active', getProductosActive);
router.get('/count', countProductos);
router.delete('/:id', deleteProducto);
router.put('/:id',upload.any(), updateProducto);
router.get('/:id', getProductoById);
router.put('/activate/:id', setActiveProducto);

module.exports = router;