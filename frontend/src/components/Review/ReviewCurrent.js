import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getCurrReview, deleteReviews } from '../../store/reviews';
import {useHistory} from 'react-router-dom';


const ReviewCurrent = () =>{

 const reviewObj = useSelector((state) => state.review)
 const reviewArr = Object.values(reviewObj);
 const user = useSelector(state => state.session.user)
//console.log('reviewArr',reviewArr);
 const reviewfilter = reviewArr.filter(review =>review?.userId === user.id)
 //console.log('reviewObj--------------', reviewObj)
 //console.log('reviewArr---------------', reviewArr)
 const history = useHistory();
 const dispatch = useDispatch();
 useEffect(()=>{
  dispatch(getCurrReview());
 }, [dispatch]);

//  if (!reviewArr) return null;
  return (
    <div>
      <h2>All The Reviews for the Current User</h2>
      <ul>
        {reviewfilter.map((review) => (
          <div key={review.id}>
            <div>spotId: {review.spotId}</div>

            <div>{review.review}</div>

            <div>{review.stars}{'⭐️'}</div>


            <button onClick={()=> {dispatch(deleteReviews(review.id))
            history.push('/reviews/current')}
            }>DELETE</button>
          </div>
        ))}
      </ul>


    </div>
  )









}

export default ReviewCurrent;
