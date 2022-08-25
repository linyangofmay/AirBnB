import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import React from 'react';
import {NavLink} from 'react-router-dom';
import ReviewSpot from '../Review/ReviewSpot';


const SpotDetail = () =>{
  const {spotId} = useParams();
  const spotdata = useSelector((state) => state.spot);
   const spoty = spotdata.oneSpot;
  console.log('spotdata------------', spotdata);
  console.log('spoty-----------', spoty);
  // const spotArr = Object.values(spotObj)
  // const user = useSelector((state) => state.session.user)
  // const review = useSelector((state) => state.reviews)
  // console.log('review-----------------', review)






 // const specificspot = spot[spotId]
  const dispatch = useDispatch();

  useEffect (() =>{
    dispatch(getOneSpot(spotId));

  }, [dispatch, spotId]);

  return (
    <div>
      {/* <div key={spot.id}>
      alt={spot.previewImage}
            src={spot.previewImage}
        </div> */}

       <h2>{spoty?.name}</h2>
       <div>{'⭐️'}{spoty?.avgRating} {spoty?.numReviews}reviews     {spoty?.city},{spoty?.state},{spoty?.country} </div>

       <img src={spoty?.Images[0].url}/>


       <div>{spoty?.address}</div>

       <div>{spoty?.description}</div>
       <div>{spoty?.price}  /night</div>
       




       <div>
      <button><NavLink to={`/spots/${spotId}/edit`}>Edit Spot</NavLink></button>
    </div>
    </div>


  );

}

export default SpotDetail;
