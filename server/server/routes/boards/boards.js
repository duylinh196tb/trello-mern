const express = require('express');
const boards = require('../../controllers/boards');

const router = express.Router();
router.get('/', boards.getAllBoards);
router.get('/:id', boards.getBoard);
router.post('/', boards.createBoard);
router.delete('/:id', boards.deleteBoard);
router.patch('/:id', boards.updateBoard);

module.exports = router;
