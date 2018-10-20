const express = require('express');
const boards = require('../../controllers/boards');
const { isVerifiedToken } = require('../middleware');

const router = express.Router();
router.get('/', isVerifiedToken, boards.getAllBoards);
router.get('/:id', isVerifiedToken, boards.getBoard);
router.post('/', isVerifiedToken, boards.createBoard);
router.delete('/:id', isVerifiedToken, boards.deleteBoard);
router.patch('/:id', isVerifiedToken, boards.updateBoard);

module.exports = router;
