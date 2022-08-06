const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {Op} = require("sequelize");



router.get('/current', requireAuth, async(req, res)=>{
  const {user} = req;
  const currentuserbookings = await Booking.findAll({
    where:{
      userId: user.id
    },
    include :[{model:Spot,
      attributes:{exclude :['description', 'createdAt','updatedAt']},

    }
    ]
  });

  console.log('currentuserbooking', currentuserbookings);
  const images = await Image.findAll({
    attributes:['url']
  })
  currentuserbookings[0].Spot.dataValues.previewImage = images[0].dataValues.url
  res.status(200);
  res.json({Bookings: currentuserbookings});
})

//edit a booking
router.put('/:bookingId', requireAuth, async(req,res)=>{
  const{user} =req;
  const {startDate, endDate} = req.body;
  const {bookingId} = req.params;
  const booking = await Booking.findByPk(bookingId);
  if(!booking){
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }
  let today = new Date().toISOString().slice(0, 10);
//console.log('today=', today, 'startDate=', startDate)
  if (today > endDate || endDate <startDate || startDate < today ){
    return res.json({
    "message": "Past bookings can't be modified",
    "statusCode": 403
   })
  }
  let spotId = booking.spotId;
  const bookingconflict = await Booking.findAll({
    where: {
      [Op.and]: [
        { spotId: spotId },
        // {
        //   [Op.or]: [{
        //     startDate: {
        //       [Op.between]: [startDate, endDate]
        //     }
        //   }, {
        //     endDate: {
        //       [Op.between]: [startDate, endDate]
        //     }
        //   }]
        // }
        {startDate: startDate}
      ]
    }
  })
  if (bookingconflict.length > 0) {
    res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    })
  }


  booking.startDate = startDate;
  booking.endDate= endDate;
  await booking.save();
  res.json(booking);

})


//delete a booking
router.delete('/:bookingId', requireAuth, async(req,res)=>{
  const {bookingId} =req.params;
  const bookingitem = await Booking.findByPk(bookingId);
  if(!bookingitem){
    res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }
  let today = new Date();
  let editedtoday = today.toISOString().slice(0,10);
  let editedstartdate = bookingitem.startDate.toISOString().slice(0,10);


  if (editedstartdate <= editedtoday){
    res.json({
      "message": "Bookings that have been started can't be deleted",
      "statusCode": 403
    })
  } else {
    await bookingitem.destroy();
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  }
})







module.exports = router;
