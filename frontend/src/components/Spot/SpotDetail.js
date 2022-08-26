import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import React from 'react';
import {NavLink} from 'react-router-dom';
import ReviewSpot from '../Review/ReviewSpot';
import {getSpotsReviews} from '../../store/reviews';

const SpotDetail = () =>{
  const {spotId} = useParams();
  const spotdata = useSelector((state) => state.spot);
   const spoty = spotdata.oneSpot;
  console.log('spotdata------------', spotdata);
   console.log('spoty-----------', spoty);
  // const spotArr = Object.values(spotObj)

  const reviewObj = useSelector((state) => state.review)
  const reviewArr = Object.values(reviewObj);
   console.log('reviewArr---------', reviewArr)






 // const specificspot = spot[spotId]
  const dispatch = useDispatch();

  useEffect (() =>{
    dispatch(getOneSpot(spotId));
    dispatch(getSpotsReviews(spotId))

  }, [dispatch, spotId]);

  return (
    <div>
      {/* <div key={spot.id}>
      alt={spot.previewImage}
            src={spot.previewImage}
        </div> */}

       <h2>{spoty?.name}</h2>
       <div>{'⭐️'}{spoty?.avgRating ? Number.parseFloat(spoty.avgRating).toFixed(2):0} {spoty?.numReviews}reviews     {spoty?.city},{spoty?.state},{spoty?.country} </div>

       <img src={spoty?.imageurl}/>


       <div>{spoty?.address}</div>

       <div>{spoty?.description}</div>
       <div>{spoty?.price}  /night</div>


        <div>Reviews</div>
        {reviewArr.map((review) => (

          <div>{review.stars} {'⭐️'} {review.review}</div>



      ))}



       <div>
      {/* <button><NavLink to={`/spots/${spotId}/edit`}>Edit Spot</NavLink></button> */}
      <button><NavLink to={`/spots/${spotId}/reviews`}>Leave a Review</NavLink></button>
    </div>
    </div>


  );

}

export default SpotDetail;
