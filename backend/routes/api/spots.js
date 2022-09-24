const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");


const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('State is required'),
  check('country')
    .exists({checkFalsy:true})
    .notEmpty()
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isDecimal({min:-90, max:90})
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isDecimal({min:-180, max:180})
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ max: 20 })
    .withMessage('Name must be less than 20 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .isLength({ max: 6 })
    .isInt({min:1})
    .withMessage('Price is not valid'),
  handleValidationErrors
];

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review content is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({min: 1, max: 5})
    .withMessage('Stars number is between 1 and 5'),
    handleValidationErrors
  ];

const validateReviewexists = async(req, res, next)=>{
  const reviewspots= await Review.findOne({
    where :{
      [Op.and]:[
        {userId:user.id}, {spotId:spotId}
      ]

    }
  })
  if (reviewspots){
    res.status(403)
    res.json({
      message:"Review already exists",
      statusCode: 403,
      errors:{
        reiview: "User has already made a reivew for this spot"
      }
    })
  }
  next();
}

  // const validateQuery = [
  //   check('page')
  //     .isInt({min:0, max:10})
  //     .optional()
  //     .withMessage("Page must be greater than or equal to 0"),
  //   check('size')
  //     .isInt({min:0, max:20})
  //     .optional()
  //     .withMessage("Size must be greater than or equal to 0"),
  //   check('maxLat')
  //     .optional()
  //     .isDecimal()
  //     .withMessage("Maximum latitude is invalid"),
  //   check('minLat')
  //     .optional()
  //     .isDecimal()
  //     .withMessage("Minimum latitude is invalid"),
  //   check('minLng')
  //     .optional()
  //     .isDecimal()
  //     .withMessage("Minimum longitude is invalid"),
  //   check('maxLng')
  //     .optional()
  //     .isDecimal()
  //     .withMessage("Maximum longitude is invalid"),
  //   check('minPrice')
  //     .optional()
  //     .isDecimal({min:0})
  //     .withMessage("Minimum price must be greater than or equal to 0"),
  //   check('maxPrice')
  //     .optional()
  //     .isDecimal({min:0})
  //     .withMessage('Maximum price must be greater than or equal to 0'),
  //   handleValidationErrors
  // ];



router.get('/',  async (req, res) => {
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
    //console.log('item.id-------------', item.id);

    //const imageurl = await Image.findOne({ where: { spotId: item.id }, attributes: ['url'] })
  //  console.log('imageurl.dataValues.url---------', imageurl.dataValues.url)
  // if (!imageurl){
  //   object = {//we added 'e' into this objct ;
  //     ...item.dataValues,
  //     avgRating: averating[0].avgRating,
  //     previewImage: null
  //   }
  //} else{
     object = {
      ...item.dataValues,
      avgRating: averating[0].avgRating,
     //previewImage: imageurl.url
    }
  //};

    result.push(object);
  }


  res.json({ Spots: result, page: page, size: size });



});







//create a spot
router.post('/', requireAuth,  async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price, imageurl } = req.body;
  const error = {
    message: "Validation error",
    statusCode: 400,
    errors: {}
  }
    if(!name) error.errors.name = 'Name is required';
   if (address.length<=3) error.errors.address ='Address is required';
   if(description.length<=3) error.errors.description='Description is required';
   if (city.length < 2) error.errors.city='city is required';
   if (state.length < 2) error.errors.city='city is required';
   if (country.length < 2) error.errors.city='city is required';
   if (parseFloat(lat) <-90 || parseFloat(lat)> 90) error.errors.lat = 'lat is not legit';
   if (parseFloat(lng) <-180|| parseFloat(lng)> 180) error.errors.lng = 'lng is not legit';
   if (parseInt(price)<= 0 ) error.errors.price='price must be more than 0';
  if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageurl)) && !(imageurl.includes('unsplash')))
    error.errors.image = 'image field is required';

    if (!name || address.length<=3 || description.length<=3 || city.length < 2 || state.length < 2 || country.length < 2 || parseFloat(lat) <-90 || parseFloat(lat)> 90 || parseFloat(lng )<-180|| parseFloat(lat)> 180 ||parseInt(price) <= 0 || (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageurl))&& !(imageurl.includes('unsplash')))){
      res.statusCode =400;
      res.json(error);
     }

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
      imageurl
    });
    // const newimage= Image.create({
    //   spotId: newSpot.id,
    //   url: imageurl,
    // })
    res.json(newSpot);

    // } else {
    //   res.json({
    //     "message": "Validation Error",
    //     "statusCode": 400,
    //     "errors": {
    //       "address": "Street address is required",
    //       "city": "City is required",
    //       "state": "State is required",
    //       "country": "Country is required",
    //       "lat": "Latitude is not valid",
    //       "lng": "Longitude is not valid",
    //       "name": "Name must be less than 50 characters",
    //       "description": "Description is required",
    //       "price": "Price per day is required",
    //       "imageurl": "previewImage is required"
    //     }
    //   })
    }

  });

//get spot of a current user
router.get('/current', requireAuth, async (req, res) => {
  const {user} = req;
  let result = [];

  const currentuserspots = await Spot.findAll({
    where: {
      ownerId: user.id ,
    },
  });

  for (i = 0; i < currentuserspots.length; i++) {
    let item = currentuserspots[i];

    const reviewavgrating = await Review.findAll({
      where: {
          spotId: item.dataValues.id
      },
      attributes: [
          [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
      ],
      raw : true,
  })

  // const imageurl = await Image.findOne({ where: { spotId:item.dataValues.id }, attributes: ['url'] });




  // if (!imageurl){
  //   object = {
  //     ...item.dataValues,
  //     avgRating: reviewavgrating[0].avgRating,
  //     previewImage: null
  //   }
  //   result.push(object);

  // } else{
     object = {
      ...item.dataValues,
      avgRating: reviewavgrating[0].avgRating,
      //previewImage: imageurl.url
    }
    result.push(object);
  };

  //}
  res.json({Spots: result });

});


//add image to a spot
router.post('/:spotId/images', requireAuth, async (req, res) => {


  const spot = await Spot.findByPk(
    req.params.spotId
  );
  if (spot) {
    const newimage = await Image.create({

      spotId: req.params.spotId,
      url: req.body.url


    });
    //console.log('Image-----', Image);
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
  console.log('spot--------------', spot);
  if (!spot) {
    // res.status(404);
    // return res.json({message: "Couldn't find a Spot with the specified id"})
     res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  };
  // const spotitem = await Spot.findByPk(req.params.spotId, {
  //   include: [{
  //     model: Image,
  //     attributes: [
  //       'id',
  //       ['spotId', 'imageableId'],
  //       'url'
  //     ]

  //   },
  //   {
  //     model: User, as: 'Owner',
  //     attributes: [
  //       'id',
  //       'firstName',
  //       'lastName'

  //     ]
  //   }]

  // });


  const reviews = await Review.findAll({where: {spotId: spotId } });
  const reviewnum = reviews.length;

  const reviewavgrating = await Review.findAll({
    where: {
        spotId: spotId
    },
    attributes: [
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
    ]
})
 const avgrating = reviewavgrating[0].dataValues.avgRating;
 const images = await spot.getImages({atrributes:['id', 'url']})
 const owners = await User.findOne({where:spot.ownerId, attributes:['id', 'firstName', 'lastName']})
 let spotitem = {...spot.dataValues};
 console.log('spotitem----', spotitem);
 //console.log('images--------', images[0].dataValues);
spotitem.numReviews = reviewnum;
 spotitem.avgRating = avgrating;
 spotitem.images = images;
 spotitem.owners= owners;
 console.log('spotitem----------', spotitem);


 res.json(spotitem);



});

//Edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price, imageurl} = req.body;
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
 const {user} =req;
 const error ={
   message: 'Validation error',
   statusCode: 400,
   errors:{}
 }
 if(!name) error.errors.name = 'Name is required';
 if (address.length<=3) error.errors.address ='Address is required';
 if(description.length<=3) error.errors.description='Description is required';
 if (city.length < 2) error.errors.city='city is required';
 if (state.length < 2) error.errors.state='state is required';
 if (country.length < 2) error.errors.country='country is required';
 if (parseFloat(lat) <-90 || parseFloat(lat)> 90) error.errors.lat = 'lat is not legit';
 if (parseFloat(lng) <-180|| parseFloat(lng)> 180) error.errors.lng = 'lng is not legit';
 if (price <= 0 ) error.errors.price='price must be more than 0';
 if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageurl))&& !(imageurl.includes('unsplash')))
 error.errors.image = 'image field is required';

 if (!name || address.length<=3 || description.length<=3 || city.length < 2 || state.length < 2 || country.length < 2 || lat <-90 || lat> 90 || lng <-180|| lat> 180 ||price <= 0 || (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageurl))&& !(imageurl.includes('unsplash')))){
  res.statusCode =400;
  res.json(error);
 }
 if (spot.ownerId === user.id){
  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;
  spot.previewImage = imageurl;
  await spot.save();
  res.json(spot);
 } else {
  res.json({
    "message": " Spot must belong to the current user"
  })
 }


});


//create a review for a spot  ( how to check the exisitng review from a same user)
router.post('/:spotId/reviews',  requireAuth, async (req, res) => {
  const { spotId } = req.params;
  //console.log('spotId-----------', spotId)
  const {user} =req
  //console.log('user.id---------', user.id);
  const spot = await Spot.findByPk(spotId);
  //console.log('spot-----------', spot);
  const error ={
    message:'Validation error',
    statusCode: 400,
    errors:{}
  }
  if (!spot) {

    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })

  }

  const reviewspots= await Review.findOne({
    where :{
      [Op.and]:[
        {userId:user.id}, {spotId:spotId}
      ]

    }
  })




  const { review, stars } = req.body;
  if (!review) error.errors.review = 'Review content is required';
  if(!stars || stars> 5 || stars <1) error.errors.stars = 'Stars must be an integer from 1 to 5';

  if (!review || ! stars || stars>5 || stars<1  ){
    res. statusCode=400;
    res.json(error);
  }
  if (!reviewspots) {
    const newreview = await Review.create({
      review: review,
      spotId: spot.id,
      userId: user.id,
      stars: stars,
    });
    res.json(newreview);
  } else {
    return res.json({
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
    // const err = new Error('User already has a review for this spot')
    // err.status =403
    // return next(err)
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
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    });
  }

  //console.log('the owner id ---',spotBooked.ownerId);
  //console.log('the user id ---', user.id)
  // response if IT IS owner
  if (spot.ownerId === user.id) {
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
    return res.json({Booking: ownerBookings})
  } else {

    const userBooking = await Booking.findAll({
      where: {
        spotId: spotId
      },
      attributes: ['spotId', 'startDate', 'endDate']
    });
    return res.json({Booking: userBooking})
  }
});


//delete a spot
router.delete('/:spotId', requireAuth, async(req, res)=>{
  const{spotId} = req.params;
  const spotitem = await Spot.findByPk(spotId);
  if(!spotitem){
   res.json({
    "message": "Spot couldn't be found",
    "statusCode": 404
   });
  }
  await spotitem.destroy();
  res.json({
    "message": "Successfully deleted",
      "statusCode": 200
  });

})








module.exports = router;
