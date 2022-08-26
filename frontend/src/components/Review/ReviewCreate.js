import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, Redirect} from "react-router-dom";
import {createReviews} from "../../store/reviews";
import {useParams} from "react-router-dom";

function ReviewCreate(){

  const history = useHistory();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);


  const {spotId} = useParams();
  const spots = useSelector(state =>state.spot);
  const spotone = spots.oneSpot;

  // console.log('spots--------------', spots)
  // console.log('spotone ------------', spotone)

  const user = useSelector(state =>state.session.user);

  // console.log('user--------------' ,user)

  const reviewObj = useSelector(state => state.review);
  console.log('reviewObj-------------', reviewObj)

  const reviewArr = Object.values(reviewObj);
  console.log('reviewArr--------------', reviewArr[1]);
  //console.log('reviewArr[1]----------', reviewArr[1].userId);
  console.log('user.id-------', user.id)
   const existingreview = reviewArr.filter(review=>review.userId === user.id)
//console.log('existingreview----------', existingreview);

 useEffect(()=>{
  const errors=[];
  if(content.length <=0){
    errors.push('review field is required')
  }
  if(stars <= 0 || stars >5){
    errors.push('stars must be between 1 and 5')
  }


  setErrors(errors)
 }, [content, stars] )

  const onSubmit = async(e) =>{
    e.preventDefault()
    const reviewinfo ={spotId, review:content, stars, userId: user.id};
    console.log('reviewinfo---------------', reviewinfo);
    const reviewdata = await dispatch(createReviews(reviewinfo));
    //console.log('reviewdata--------------------', reviewdata);

    if (reviewdata){
      history.push(`/spots/${spotId}/`);
    // }
   // const reviewinfo = {content, stars, spotId, userid};
  // dispatch(createReviews(reviewinfo));
  //   setSubmitted(true);
  //   if(!user) throw errors ('Please log in as a user');


   };
}
 if (existingreview.length ){
  return "Sorry, you have already made a review for this spot."
 }
  return (

   <form
   onSubmit={onSubmit}>
   <h2>Create A review</h2>
   <ul>
        {errors.map((error)=>(
          <li key={error}>{error}</li>
        ))}
  </ul>

  <label>
        Review
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />
  </label>
  <div></div>

  <label>
        Stars
        <input
          type="Integer"
          name="stars"
          value={stars}
          onChange={(e)=>setStars(e.target.value)}
        />
  </label>

  <button
        type="submit"
        //disabled ={errors.length>0 || (!user) || (existingreview)}
         disabled ={errors.length>0 || (!user) || (existingreview.length>=1)}
      >
        Create a Review
  </button>




   </form>

  )
 //}



}

export default ReviewCreate;
