const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const spot = require('../../db/models/spot');


router.delete('/:imageId', requireAuth, async(req, res)=>{

  const {user} = req;

  const imageitem = await Image.findByPk(req.params.imageId);

  if(!imageitem){
   return res.json({
    "message": "Image couldn't be found",
    "statusCode": 404
   });
  }


  if(imageitem.userId === user.id){
    await imageitem.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
} else {
    res.statusCode = 403
    res.json({
        "message": "Image must belong to the current user",
        "statusCode": 403
    })
}

})
module.exports = router;
