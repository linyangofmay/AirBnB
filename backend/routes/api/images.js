const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const spot = require('../../db/models/spot');


router.delete('/:imageId', requireAuth, async(req, res)=>{
  const{imageId} = req.params.imageId;
  const imageitem = await Image.findByPk(imageId);
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
module.exports = router;
