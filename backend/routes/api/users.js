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
    .withMessage('Username cannot be an email'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required.'),
  handleValidationErrors
];
const validateSignupunique = async (req, res, next)=>{
  const findbyemail = await User.findOne({
    where: { email: req.body.email }
})
  const findbyusername = await User.findOne({
  where:{username: req.body.username}
})

if (findbyemail){  res.status(403)
    res.json({
    message: "User already exists",
    statusCode: 403,
    errors: {
      email: "User with that email already exists"
    }
  })}
  if(findbyusername){
  res.status(403)
  res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          username: "User with that username already exists",

       }
      })
}
// if (!firstName || !lastName || !username) {
//   res.status(400)
//   res.json({

//       message: "Validation error",
//       statusCode: 400,
//       errors: {
//           email: "Invalid email",
//           username: "Username is required",
//           firstName: "First Name is required",
//           lastName: "Last Name is required"
//       }
//   })
//}
next();

}

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
router.post('/',  validateSignup, validateSignupunique, async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
  const user = await User.signup({
     firstName: firstName,
     lastName: lastName,
     email: email,
     username: username,
     password: password,
  })

  const token= await setTokenCookie(res,user);
  user.dataValues.token = token
  res.json(
    user
  );

});





module.exports = router;
