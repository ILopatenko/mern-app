//IMPORT block
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//@description: CREATE a new USER
//      @route: POST at /api/users/register
//     @access: Public
const createNewUser = asyncHandler(async (req, res) => {
  //Save parameters from request to variables
  const { name, email, password, password2 } = req.body;
  //Checking that user sent all the required parameters
  if (!name || !email || !password || !password2) {
    res.status(400);
    throw new Error('Add required information!');
  }
  //Checking if user with given email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User with given email already exists!');
  }
  //HASH the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Try to CREATE a new USER
  const user = await User.create({ name, email, password: hashedPassword });
  //Checking if USER was CREATED
  if (user) {
    res.status(201).json({
      message: `The new USER is created successfuly!`,
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data!');
  }
});
//@description: LOG IN
//      @route: POST at /api/users/login
//     @access: Public
const loginUser = asyncHandler(async (req, res) => {
  //Save parameters from request to variables
  const { email, password } = req.body;
  //Checking if user with given email already exists
  const user = await User.findOne({ email });
  //Veryfy that user was found in DB and hash of given password is the same as hash in DB
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      message: `The USER is logged in successfuly!`,
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials!');
  }
});
//@description: READ a personal (loged in USER's) profile
//      @route: POST at /api/users/me
//     @access: Private
const readPersonalProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json({
    message: `The USER's profile is red successfuly!`,
    userFromGivenToken: user,
  });
});

//GENERATE JWT TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

module.exports = {
  createNewUser,
  loginUser,
  readPersonalProfile,
};
