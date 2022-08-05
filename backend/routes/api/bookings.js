const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {Op} = require("sequelize");



router.get('/current', requireAuth, async(req, res)=>{
  const currentuserbookings = await Booking.findAll({
    where:{
      userId: req.user.id
    },
    include :[{model:Spot,
      attributes:{exclude :['description', 'createdAt','updatedAt']}


    }
    ]
  });
  console.log('currentuserbooking', currentuserbookings);
  res.status(200);
  res.json(currentuserbookings);
})

//edit a booking
router.put('/:bookingId', requireAuth, async(req,res)=>{
  const {startDate, endDate} = req.body;
  const {bookingId} = req.params;
  const booking = await Booking.findByPk(bookingId);
  if(!booking){
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }
  let today = new Date();
  console.log('today-bookingdate', today-booking.starDate)
  if (today >= booking.startDate){
    throw new Error ({ "message": "Past bookings can't be modified",
    "statusCode": 403
  })
  }
  booking.startDate = startDate;
  booking.endDate= endDate;
  await booking.save();
  res.json(booking);

})

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
