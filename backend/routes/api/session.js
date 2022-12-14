const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



// router.post(
//   '/',
//   async (req, res, next) => {
//     const { credential, password } = req.body;

//     const user = await User.login({ credential, password });

//     if (!user) {
//       const err = new Error('Login failed');
//       err.status = 401;
//       err.title = 'Login failed';
//       err.errors = ['The provided credentials were invalid.'];
//       return next(err);
//     }

//     let token = await setTokenCookie(res, user);
//     user.dataValues.token = token;
//     return res.json(
//       user
//     )
//   }
// );
router.post(
  '/',
  async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
          const err = new Error('Login failed');
          err.status = 401;
          err.title = 'Login failed';
          err.errors = [{
              "message": "Invalid credentials",
              "statusCode": 401
            }];
          return next(err);
      }

      const token = await setTokenCookie(res, user)
      console.log(user)
      user.dataValues.token = token
      return res.json(
          user
      )
  }
);

router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);


router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json(
         user.toSafeObject()
      );
    } else return res.json({});
  }
);

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = [{
        "message": "Invalid credentials",
        "statusCode": 401
      }];
      return next(err);
    }

    let token = await setTokenCookie(res, user);
     user.dataValues.token = token;
    return res.json({
      user

  });
  }
);

// router.get(
//   '/',
//   restoreUser,
//   (req, res) => {
//     const { user } = req;
//     if (user) {
//       return res.json({
//         user: user.toSafeObject()
//       });
//     } else return res.json({});
//   }
// );





module.exports = router;
