const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const spot = require('../../db/models/spot');

const { Op } = require("sequelize");


router.get('/', async (req, res) => {
  let { size, page } = req.query;
  const pagination = {};
  let result = [];
  if (isNaN(page) || page < 0) { page = 1 };
  if (isNaN(size) || size <= 0) { size = 20 };
  page = parseInt(page);
  size = parseInt(size);
  pagination.limit = size;
  pagination.offset = size * (page - 1);

  const allspots = await Spot.findAll({ ...pagination });
  for (i = 0; i < allspots.length; i++) {
    let item = allspots[i];

    const averating = await Review.findAll({
      where: { spotId: item.id },
      attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
      raw: true,

    });


    const imageurl = await Image.findOne({ where: { spotId: item.id }, attributes: ['url'] })

    let object = {
      ...item.dataValues,
      avgRating: averating[0].avgRating,
      previewImage: imageurl.url
    };
    result.push(object);
  }


  res.json({ Spots: result, page: page, size: size });



});








router.post('/', requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  if (req.body) {
    const newSpot = await Spot.create({
      ownerId: req.user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    res.json(newSpot);

  } else {
    res.json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
      }
    })
  }

})

//get spot of a current user 
router.get('/current', requireAuth, async (req, res) => {

  const currentuserspots = await Spot.findAll({
    where: {
      ownerId: req.user.id
    },
    attributes: {
      include: [
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
        [sequelize.literal('Images.url'), 'previewImage']
      ]
    },
    include: [
      {
        model: Review,
        attribute: []
      },
      {
        model: Image,
        attribute: []
      }
    ],
    group: ['Spot.id']//images.id

  });
  res.status(200);
  res.json(currentuserspots);
})

router.post('/:spotId/images', requireAuth, async (req, res) => {


  const spot = await Spot.findByPk(
    req.params.spotId
  );
  if (spot) {
    const newimage = await Image.create({

      spotId: req.params.spotId,
      url: req.body.url


    });
    res.json(await Image.findByPk(newimage.id, {
      attributes: [
        'id',
        ['spotId', 'imageableId'],
        'url'
      ]
    }));
  } else {
    res.json(
      {
        "message": "Spot couldn't be found",
        "statusCode": 404
      }
    )
  };

});

//Get details of a spot by id
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    // res.status(404);
    // return res.json({message: "Couldn't find a Spot with the specified id"})
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  };
  const spotitem = await Spot.findByPk(req.params.spotId, {
    include: [{
      model: Image,
      attributes: [
        'id',
        ['spotId', 'imageableId'],
        'url'
      ]

    },
    {
      model: User, as: 'Owner',
      attributes: [
        'id',
        'firstName',
        'lastName'

      ]
    }]

  });
  res.json(spotitem);


});

//Edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;
  await spot.save();
  res.json(spot);
});


//create a review for a spot  ( how to check the exisitng review from a same user)
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {

    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const reviewspots= await Review.findAll({
    where :{
      spotId: req.params.spotId,

    }
  })

  const { review, stars } = req.body;
  let userid = spot.ownerId;
  if (reviewspots.length===0) {
    const newreview = await Review.create({
      review: review,
      spotId: spot.id,
      userId: spot.ownerId,
      stars: stars,
    });
    res.json(newreview);
  } else {
    return res.json({
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
  }

})

//get all reviews by a spot id
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;
  const idnumber = await Spot.findByPk(spotId);
  if (!idnumber) {
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  } else {
    const allreviews = await Review.findAll({
      where: {
        spotId: req.params.spotId
      },
      include: [
        {
          model: User,
          attributes: [
            'id',
            'firstName',
            'lastName'
          ]
        },
        {
          model: Image,
          attributes: [
            'id',
            ['reviewId', 'imageableId'],
            'url'
          ]
        }

      ]
    });
    res.status(200);
    res.json(allreviews);
  }
});


//create a booking from a spot
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [{ model: Booking }]
  });

  const { user } = req;
  const { startDate, endDate } = req.body;
  if (!spot) {
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const bookingconflict = await Booking.findAll({
    where: {
      [Op.and]: [
        { spotId: req.params.spotId },
        {
          [Op.or]: [{
            startDate: {
              [Op.between]: [startDate, endDate]
            }
          }, {
            endDate: {
              [Op.between]: [startDate, endDate]
            }
          }]
        }

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
  } else {

    const newbooking = await Booking.create({
      spotId: req.params.spotId,
      userId: user.id,
      startDate,
      endDate,
    });
    res.json(newbooking);
  }
})

//Get all bookings for a spot by Id
// router.get('/:spotId/bookings', requireAuth, async(req, res)=>{

//   const {spotId} = req.params;
//   const spotid = await Spot.findByPk(spotId, {
//     include :[{model: User}]
//   });

//   if(!spotid){
//     return res.json({"message": "Spot couldn't be found",
//         "statusCode": 404})
//   }
//     const allbookings = await Booking.findAll({
//       where :{
//         spotId: req.params.spotId
//       },
//       include :[
//         {
//           model: User,
//           attributes:[
//             'id',
//             'firstName',
//             'lastName'
//           ]
//         }
//       ]
//     });
//     const allbookingsnotowner = await Booking.findAll({
//       where:{spotId: req.params.spotId}
//     });

//     if(spotid.user.id !== spotid.ownerId){
//       res.status(200);
//       res.json(allbookingsnotowner);
//     } else {
//     res.status(200);
//     res.json(allbookings);}
// })
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;
  const spotBooked = await Spot.findByPk(spotId);

  if (!spotBooked) {
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    });
  }

  //console.log('the owner id ---',spotBooked.ownerId);
  //console.log('the user id ---', user.id)
  // response if IT IS owner
  if (spotBooked.ownerId === user.id) {
    const ownerBookings = await Booking.findAll({
      where: {
        spotId: spotId
      },
      include: [
        {
          model: User,
          attributes: [
            'id',
            'firstName',
            'lastName'
          ]
        }
      ]
    });
    return res.json(ownerBookings)
  } else {
    // response if NOT owner
    const userBooking = await Booking.findAll({
      where: {
        spotId: spotId
      },
      attributes: ['spotId', 'startDate', 'endDate']
    });
    return res.json(userBooking)
  }
});

//return spots pagination








module.exports = router;
