const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");


const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// router.post(
//   '/',
//   validateSignup,
//   async (req, res) => {
//     const { firstName, lastName, email, username, password } = req.body;
//     const user = await User.signup({ firstName, lastName, email, username, password });

//     let token = await setTokenCookie(res, user);
//      user.dataValues.token = token;
//     return res.json(
//       user

//   );
//   }
// );

//sign up
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  const findbyemail = await User.findAll({
      where: { email: email }
  })
  const findbyusername = await User.findAll({
    where:{username: username}
  })

  if (findbyemail.length >0){
    return res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    })
  }

  if(findbyusername.length >0){
    return res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    })
  }
  if (!firstName){
   res.json({
    "message": "Validation error",
   "statusCode": 400,
   "errors": {

    "firstName": "First Name is required",

  }
   })
  };

  if(!lastName){
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {

        "lastName": "Last Name is required"

     }
    })
  };
  if(!username){
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "username": "Username is required",

     }
    })
  };
  const user = await User.signup({
     firstName: firstName,
     lastName: lastName,
     email: email,
     username: username,
     password: password,
  })

  const token= await setTokenCookie(res,user);
  user.dataValues.token= token;
  console.log('user--------', user);
  res.json(user);




});





module.exports = router;
