const express = require('express');
const columns = require('../../controllers/columns');

const router = express.Router();
router.get('/', columns.getAllColumns);
router.get('/:id', columns.getColumn);
router.post('/', columns.createColumn);
router.delete('/:id', columns.deleteColumn);
router.patch('/:id', columns.updateColumn);

module.exports = router;
