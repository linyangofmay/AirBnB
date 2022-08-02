const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async(req, res)=>{
  const allspots = await Spot.findAll({

  });

  return res.json(allspots);
})

router.get('/current', requireAuth, async(req,res)=>{
 
  const currentuserspots = await Spot.findAll({
    where:{
      ownerId: req.user.id
    },

  });
  res.status(200);
  res.json(currentuserspots);
})


// router.get('/', async(req, res)=>{

//   const currentuserspots = await Spot.findAll({
//      where:
//   })
// })

module.exports = router;
