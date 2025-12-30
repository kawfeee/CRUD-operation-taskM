const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { taskValidation, validate } = require('../middleware/validation');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');

// All routes are protected
router.use(protect);

// Task statistics
router.get('/stats', getTaskStats);

// CRUD routes
router.route('/')
  .get(getTasks)
  .post(taskValidation, validate, createTask);

router.route('/:id')
  .get(getTask)
  .put(taskValidation, validate, updateTask)
  .delete(deleteTask);

module.exports = router;
