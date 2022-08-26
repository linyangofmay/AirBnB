const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Image, Review, sequelize } = require('../../db/models');
const router = express.Router();

const { check , sanitizeQuery} = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { get } = require('lodash');


//create an image for a review

router.post('/:reviewId/images', requireAuth, async(req,res)=>{

  const {user} = req;
  const review= await Review.findByPk(
    req.params.reviewId
  );
  if (!review){
    res.json({ "message": "Review couldn't be found",
    "statusCode": 404})
  }
  if(review.userId === user.id){
  const images = await Image.findAll({
    where :{
      reviewId: req.params.reviewId
    }
  })
  if(images.length<10){
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
        "message": "Maximum number of images for this resource was reached",
      "statusCode": 403
      }
    )
  };

} else {
  res.json({
    message: "Review must belong to the current user"
})
}
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
  res.json({Reviews: currentuserreviews});
})


//edit a review
router.put('/:reviewId', requireAuth, async(req, res)=>{
  const {review, stars} = req.body;
  const{reviewId} = req.params;
  const reviewitem = await Review.findByPk(reviewId);
   if (!reviewitem){
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
   }
   reviewitem.review = review;
   reviewitem.starts= stars;
   await reviewitem.save();
   res.json(reviewitem);

});


// router.delete('/:reviewId', requireAuth, async(req, res)=>{
//   const{reviewId} = req.params
//   const reviewitem = await Review.findByPk(reviewId);
//   if(!reviewitem){
//    res.json({
//     "message": "Review couldn't be found",
//     "statusCode": 404
//    });
//   }
//   await reviewitem.destroy();
//   res.json({
//     "message": "Successfully deleted",
//       "statusCode": 200
//   });

// })


router.delete('/:reviewId', requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { user } = req;
  const itemDelete = await Review.findByPk(reviewId);

  if (!itemDelete) {
      res.status(404)
      res.json({
          "message": "Review couldn't be found",
          "statusCode": 404
      })
  }

  if (itemDelete.userId !== user.id) {
      res.json({
          message: "Review must belong to the current user"
      })
  }

  if (itemDelete.userId === user.id) {
          itemDelete.destroy()
          res.json({
              "message": "Successfully deleted",
              "statusCode": 200
          })

  }
})








module.exports = router;
