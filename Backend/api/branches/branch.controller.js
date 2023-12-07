const { createBranch, getBranches, getBranchById } = require('./branch.service');
const { createUpload, deleteUpload, getUploadById } = require('../uploads/upload.service');
const path = require('path');
const Resize = require('../../middleware/resize');
const { unlink } = require('fs');

module.exports = {
    createBranch: (req, res) => {
        createBranch(req.body, (err, result) => {
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
    },
    getBranches: (req, res) => {
        getBranches((err, result) => {
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
    },
    getBranchById: (req, res) => {
        const id = req.params.id; 
        getBranchById(id, (err, result) => {
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
    }
}
