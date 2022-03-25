const asyncHandler = require('express-async-handler');
//@description: CREATE a new GOAL
//      @route: POST at /api/goals
//     @access: Private (the feature is in development)
const createNewGoal = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Add required information!');
  }
  res.status(200).json({ message: `The new GOAL is created successfuly!` });
};
//@description: READ all the GOALS
//      @route: GET at /api/goals
//     @access: Private (the feature is in development)
const readAllTheGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'All the GOALS are red successfuly!' });
});
//@description: UPDATE the GOAL by ID
//      @route: PUT at /api/goals
//     @access: Private (the feature is in development)
const updateGoalByID = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `The GOAL (with id = ${req.params.id}) is updated successfuly!`,
  });
});
//@description: DELETE the GOAL by ID
//      @route: DELETE at /api/goals
//     @access: Private (the feature is in development)
const deleteGoalByID = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `The GOAL (with id = ${req.params.id}) is deleted successfuly!`,
  });
});

module.exports = {
  createNewGoal,
  readAllTheGoals,
  updateGoalByID,
  deleteGoalByID,
};
