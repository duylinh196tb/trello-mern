const express = require('express');
const tasks = require('../../controllers/tasks');

const router = express.Router();
// router.get('/', tasks.getAllTasks);
// router.get('/:id', tasks.getTask);
router.post('/', tasks.createTask);
router.delete('/:id', tasks.deleteTask);
router.patch('/:id', tasks.updateTask);

module.exports = router;
