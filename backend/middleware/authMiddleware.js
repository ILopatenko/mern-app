//IMPORT block
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //Verify that user provided a token and token starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Separate token value
      token = req.headers.authorization.split(' ')[1];
      //Decode token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      //Get the user from DB by decoded ID and add that data to req.user
      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized!');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized! No token!');
  }
});

module.exports = { protect };
