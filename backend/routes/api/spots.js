const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async(req, res)=>{
  const allspots = await Spot.findAll({
    attributes: {
      include: [
          [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
          [sequelize.literal('Images.url'), 'previewImage']
      ]
  },
  include: [
      {
          model: Review,
          attributes: []
      },
      {
          model: Image,
          attributes: []
      }
  ],
  group: ['Spot.id']
});
  return res.json(allspots)
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

router.get('/current', requireAuth, async(req,res)=>{

  const currentuserspots = await Spot.findAll({
    where:{
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
  group: ['Spot.id']

  });
  res.status(200);
  res.json(currentuserspots);
})

router.post('/:spotId/images', requireAuth, async(req,res)=>{


  const spot= await Spot.findByPk(
    req.params.spotId
  );
  if(spot){
    const newimage = await Image.create({

     spotId : req.params.spotId,
     url: req.body.url


    });
    res.json(await Image.findByPk(newimage.id,{
      attributes:[
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
router.get('/:spotId', async(req, res)=>{
  const {spotId} = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot){
    // res.status(404);
    // return res.json({message: "Couldn't find a Spot with the specified id"})
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  };
  const spotitem = await Spot.findByPk(req.params.spotId, {
    include:[{model: Image,
      attributes:[
        'id',
        ['spotId', 'imageableId'],
        'url'
      ]

    },
    {model: User, as:'Owner',
     attributes:[
      'id',
      'firstName',
      'lastName'

     ]
  }]

  });
  res.json(spotitem);


});

//Edit a spot
router.put('/:spotId',requireAuth,async(req, res)=>{
  const {address, city, state, country, lat, lng, name, description, price} =req.body;
  const {spotId} = req.params;
  const spot = await Spot.findByPk(spotId);
  if(!spot){
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
  spot.name= name;
  spot.description = description;
  spot.price= price;
  await spot.save();
  res.json(spot);
});


//create a review for a spot  ( how to check the exisitng review from a same user)
router.post('/:spotId/reviews', requireAuth, async(req, res)=>{
  const {spotId} = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot){

    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }


  const {review, stars} = req.body;
  let userid = spot.ownerId;
  if (Review.userId !== userid){
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

//create an image for a review











module.exports = router;
