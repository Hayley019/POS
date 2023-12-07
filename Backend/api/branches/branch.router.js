const { createBranch, getBranches, getBranchById } = require('./branch.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
const upload = require('../../middleware/upload');

router.post('/', createBranch);
router.get('/', getBranches);
router.get('/:id', getBranchById);
module.exports = router;