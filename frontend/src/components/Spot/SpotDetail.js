import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ReviewSpot from '../Review/ReviewSpot';
import { getSpotsReviews } from '../../store/reviews';
import './SpotDetailCss.css'

const SpotDetail = () => {
  const { spotId } = useParams();
  const spotdata = useSelector((state) => state.spot);
  const spoty = spotdata.oneSpot;
  console.log('spotdata------------', spotdata);
  console.log('spoty-----------', spoty);
  // const spotArr = Object.values(spotObj)
  const sessionUser = useSelector(state => state.session.user);
  const reviewObj = useSelector((state) => state.review)
  const reviewArr = Object.values(reviewObj);
  console.log('reviewArr---------', reviewArr)






  // const specificspot = spot[spotId]
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getSpotsReviews(spotId))

  }, [dispatch, spotId]);

  return (
    <div className='spotdetailmain'>

      <div>
        <h2>{spoty?.name}</h2>
      </div>

      <div>
        {'⭐️'}{spoty?.avgRating ? Number.parseFloat(spoty.avgRating).toFixed(2) : 0} {spoty?.numReviews} reviews
        <p></p>
        {spoty?.address}, {spoty?.city},{spoty?.state},{spoty?.country}
      </div>

      <div >
        <img src={spoty?.imageurl} className='spotdetailimage'/>
      </div>

      <div>
        {spoty?.description}
        <p></p>
        ${spoty?.price}  /night
        <p></p>
      </div>

      <div className='sdreviewdiv'>Reviews</div>
      {reviewArr.map((review) => (

        <div>{review.stars} {'⭐️'} userId:{review.userId}   {review.review}

        </div>


      ))}

      <div className='sdbtndiv'>
       {((sessionUser && Object.values(sessionUser).length>0)) && <button><NavLink to={`/spots/${spotId}/reviews`}>Leave a Review</NavLink></button>}
      </div>
    </div>


  );

}

export default SpotDetail;
