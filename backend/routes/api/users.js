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
//     const { firstName, lastName, email, password, username } = req.body;
//     const user = await User.signup({ firstName, lastName, email, username, password });

//     let token = await setTokenCookie(res, user);
//      user.dataValues.token = token;
//     return res.json(
//       user

//   );
//   }
// );


router.post('/', validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;

  const sameEmail = await User.findOne({
      where: { email }
  })

  if (sameEmail) {
      res.statusCode = 403
      res.json({
          message: "User already exists",
          statusCode: 403,
          errors: {
              email: "User with that email already exists"
          }
      })
  } else {
      const user = await User.signup({ firstName, lastName, email, username, password });
      const token = await setTokenCookie(res, user)
      
      user.dataValues.token = token
      return res.json(user)
  }

});





module.exports = router;
