const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize } = require('../../db/models');
const router = express.Router();

const { check , sanitizeQuery} = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//create an image for a review

router.post('/:reviewId/images', requireAuth, async(req,res)=>{


  const review= await Review.findByPk(
    req.params.reviewId
  );
  if(review){
    //check for image account <10 add new image  >=10 return error
    const newimage = await Image.create({
     reviewId: req.params.reviewId,
     url: req.body.url


    });
    res.json(await Image.findByPk(newimage.id,{
      attributes:[
        'id',
        ['reviewId', 'imageableId'],
        'url'
      ]
    }));
  } else {
    res.json(
      {
        "message": "Review couldn't be found",
        "statusCode": 404
      }
    )
  };

});


//get reviews of current user

router.get('/current', requireAuth,async(req, res)=>{
  const currentuserreviews = await Review.findAll({
    where:{
      userId: req.user.id
    },
    include:[
      {
        model: User,
        attributes:[
          'id',
          'firstName',
          'lastName'
        ]
      },
      {
        model: Spot,
        attributes:[
          'id',
          'ownerId',
          'address',
          'city',
          'state',
          'country',
          'lat',
          'lng',
          'name',
          'price'
        ]
      },
      {
        model: Image,
        attributes:[
          'id',
        ['reviewId', 'imageableId'],
        'url'
        ]
      }
    ]
  });
  res.status(200);
  res.json(currentuserreviews);
})













module.exports = router;
