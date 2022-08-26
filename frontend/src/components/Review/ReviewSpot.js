import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSpotsReviews } from '../../store/reviews';


const ReviewSpot = () => {
  const { spotId } = useParams();
  const reviewObj = useSelector(state => state.reviews)
  console.log('reviewObj------------', reviewObj);

  const reviews = Object.values(reviewObj);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpotsReviews(spotId));
  }, [dispatch]);

  if (!reviews) return null;
  return (
    <div>
      <h2>The Reviews for all the Spots</h2>
      <ul>
        {reviews.map((review) => (
          <div key={review.id}>

            <div>{review.review}</div>

            <div>{'⭐️'}{review.avgRating ? Number.parseFloat(review.avgRating).toFixed(2):0}</div>


          </div>

        ))}

      </ul>
    </div>
  )


};
export default ReviewSpot;
