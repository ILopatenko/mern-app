//IMPORT block
const express = require('express');
const router = express.Router();
const {
  createNewGoal,
  readAllTheGoals,
  updateGoalByID,
  deleteGoalByID,
} = require('../controllers/goalController');

// /api/goals endpoint
router.route('/').post(createNewGoal).get(readAllTheGoals);

// /api/goals/:id endpoint
router.route('/:id').put(updateGoalByID).delete(deleteGoalByID);

module.exports = router;
