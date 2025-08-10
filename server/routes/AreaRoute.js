const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
    createArea,
    getAreas,
    updatedArea,
    deleteArea
} = require('../controllers/areaController');

router.post('/',upload.single('image'),createArea);
router.get('/',getAreas);
router.put('/:id',upload.single('image'),updatedArea);
router.delete('/:id',deleteArea);

module.exports = router;