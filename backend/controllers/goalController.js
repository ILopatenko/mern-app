//IMPORT block
const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');
//@description: CREATE a new GOAL
//      @route: POST at /api/goals
//     @access: Private
const createNewGoal = asyncHandler(async (req, res) => {
  //IF user does not provide a text value for a new GOAl
  // - sever returns error and statusCode 400
  if (!req.body.text) {
    res.status(400);
    throw new Error('Add required information!');
  }
  //Create a new goal in DB
  const goal = await Goal.create({ text: req.body.text, user: req.user.id });
  //Send a response to a client
  res.status(200).json({
    message: `The new GOAL is created successfuly!`,
    createdGoal: goal,
  });
});
//@description: READ only personal GOALS
//      @route: GET at /api/goals/my
//     @access: Private
const readPersonalGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({
    message: 'All your GOALS are red successfuly!',
    allPersonalGoalsArray: goals,
  });
});
//@description: UPDATE PERSONAL GOAL by ID
//      @route: PUT at /api/goals/my/:id
//     @access: Private
const updatePersonalGoalByID = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error(
      `The GOAL (with given id = ${req.params.id}) is not found!`
    );
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error(`User is not found!`);
  }
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error(`User is not authorized!`);
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: `The GOAL (with id = ${req.params.id}) is updated successfuly!`,
    updatedGoal: updatedGoal,
  });
});
//@description: DELETE PERSONAL GOAL by ID
//      @route: DELETE at /api/goals
//     @access: Private
const deletePersonalGoalByID = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error(
      `The GOAL (with given id = ${req.params.id}) is not found!`
    );
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error(`User is not found!`);
  }
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error(`User is not authorized!`);
  }
  const deleteGoal = await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: `The GOAL (with id = ${req.params.id}) is deleted successfuly!`,
    deletedGoal: deleteGoal,
  });
});
module.exports = {
  createNewGoal,
  readPersonalGoals,
  updatePersonalGoalByID,
  deletePersonalGoalByID,
};
