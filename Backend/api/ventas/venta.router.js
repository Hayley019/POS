const { createVenta, getVentasPartial, getVentaporById, getVentas, countVentas, addProducto, updateProducto, deleteProducto, updateVenta, deleteVentaPorId, getVentasDate} = require('./venta.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.get('/', getVentas);
router.get('/partial', getVentasPartial);
router.get('/count', countVentas);
router.get('/date', getVentasDate);
router.get('/:id', getVentaporById);
router.delete('/:id', deleteVentaPorId);
router.post('/', createVenta);
router.get('/partial', getVentasPartial);
router.post('/producto', addProducto);
router.put('/producto/:id', updateProducto);
router.delete('/producto/:id', deleteProducto);
router.put('/:id', updateVenta);
module.exports = router;