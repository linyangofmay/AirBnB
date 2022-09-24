import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getOneSpot } from '../../store/spots';
import { getCurrReview, deleteReviews } from '../../store/reviews';
import {useHistory} from 'react-router-dom';
import "./ReviewCurrentCss.css";


const ReviewCurrent = () =>{

 const reviewObj = useSelector((state) => state.review)
 const reviewArr = Object.values(reviewObj);
 const user = useSelector(state => state.session.user)
//console.log('reviewArr',reviewArr);
 const reviewfilter = reviewArr.filter(review =>review?.userId === user.id)
 //console.log('reviewObj--------------', reviewObj)
 //console.log('reviewArr---------------', reviewArr)
 console.log('reviewfilter----', reviewfilter);
 const history = useHistory();
 const dispatch = useDispatch();
 useEffect(()=>{
  dispatch(getCurrReview());
 }, [dispatch]);

 if (!reviewfilter) return null;
  return (
    <div className='review_outermost'>
      <h2 className='myreview_head'>My Reviews</h2>
      <div className = 'reviews_div'>
      </div>

        {reviewfilter.map((review) => (
          <div key={review.id} className= 'onereview_container'>
            <div>spotId: {review.spotId}</div>
            <br></br>
            <div>{review.stars}<i className="fas fa-solid fa-star"></i> {review.review}</div>
            <br></br>
            <div>updated at {review.updatedAt.slice(0,10)}</div>

            <div className='deletebtn_container'>
            <button className='deletereview_btn' onClick={()=> {dispatch(deleteReviews(review.id))
            history.push('/reviews/current')}
            }>DELETE</button>
            </div>

          </div>

        ))}




    </div>
  )









}

export default ReviewCurrent;
