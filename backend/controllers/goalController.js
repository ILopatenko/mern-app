//IMPORT block
const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
//@description: CREATE a new GOAL
//      @route: POST at /api/goals
//     @access: Private (the feature is in development)
const createNewGoal = async (req, res) => {
  //IF user does not provide a text value for a new GOAl
  // - sever returns error and statusCode 400
  if (!req.body.text) {
    res.status(400);
    throw new Error('Add required information!');
  }
  //Create a new goal in DB
  const goal = await Goal.create({ text: req.body.text });
  //Send a response to a client
  res.status(200).json({
    message: `The new GOAL is created successfuly!`,
    createdGoal: goal,
  });
};
//@description: READ all the GOALS
//      @route: GET at /api/goals
//     @access: Private (the feature is in development)
const readAllTheGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json({
    message: 'All the GOALS are red successfuly!',
    allGoalsArray: goals,
  });
});
//@description: UPDATE the GOAL by ID
//      @route: PUT at /api/goals
//     @access: Private (the feature is in development)
const updateGoalByID = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error(
      `The GOAL (with given id = ${req.params.id}) is not found!`
    );
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: `The GOAL (with id = ${req.params.id}) is updated successfuly!`,
    updatedGoal: updatedGoal,
  });
});
//@description: DELETE the GOAL by ID
//      @route: DELETE at /api/goals
//     @access: Private (the feature is in development)
const deleteGoalByID = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error(
      `The GOAL (with given id = ${req.params.id}) is not found!`
    );
  }
  const deleteGoal = await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: `The GOAL (with id = ${req.params.id}) is deleted successfuly!`,
    deletedGoal: deleteGoal,
  });
});

module.exports = {
  createNewGoal,
  readAllTheGoals,
  updateGoalByID,
  deleteGoalByID,
};
