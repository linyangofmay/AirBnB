const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking, Image } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const spot = require('../../db/models/spot');


router.delete('/:imageId', requireAuth, async(req, res)=>{
  const{id} = req.params;
  const imageitem = await Image.findByPk(id);
  if(!imageitem){
   res.json({
    "message": "Image couldn't be found",
    "statusCode": 404
   });
  }
  await imageitem.destroy();
  res.json({
    "message": "Successfully deleted",
      "statusCode": 200
  });

})
