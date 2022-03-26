//IMPORT block
const express = require('express');
const router = express.Router();
const {
  createNewGoal,
  readAllTheGoals,
  readPersonalGoals,
  updateGoalByID,
  updatePersonalGoalByID,
  deleteGoalByID,
  deletePersonalGoalByID,
} = require('../controllers/goalController');

const { protect } = require('../middleware/authMiddleware');
// /api/goals endpoint

router
  .route('/my')
  .post(protect, createNewGoal)
  .get(protect, readPersonalGoals);

// /api/goals/:id endpoint
router
  .route('/my/:id')
  .put(protect, updatePersonalGoalByID)
  .delete(protect, deletePersonalGoalByID);

module.exports = router;
