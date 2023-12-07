const { createBill, getBills, getBillById, updateBill, deleteBill, countBills, getBillsPartial, getBillsDate } = require('./bill.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.get('/count', countBills);
router.get('/partial', getBillsPartial);
router.get('/date', getBillsDate);

router.post('/', createBill);
router.get('/', getBills);
router.get('/:id', getBillById);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill);
module.exports = router;