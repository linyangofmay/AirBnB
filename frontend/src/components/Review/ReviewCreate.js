import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from "react-router-dom";
import { createReviews } from "../../store/reviews";
import { useParams } from "react-router-dom";
import './ReviewCreateCss.css'

function ReviewCreate() {

  const history = useHistory();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);


  const { spotId } = useParams();
  const spots = useSelector(state => state.spot);
  const spotone = spots.oneSpot;

  // console.log('spots--------------', spots)
  // console.log('spotone ------------', spotone)

  const user = useSelector(state => state.session.user);

  // console.log('user--------------' ,user)

  const reviewObj = useSelector(state => state.review);
  console.log('reviewObj-------------', reviewObj)

  const reviewArr = Object.values(reviewObj);
  console.log('reviewArr--------------', reviewArr[1]);
  //console.log('reviewArr[1]----------', reviewArr[1].userId);
  console.log('user.id-------', user.id)
  const existingreview = reviewArr.filter(review => review.userId === user.id)
  //console.log('existingreview----------', existingreview);

  useEffect(() => {
    const errors = [];
    if (content.length <= 0) {
      errors.push('review field is required')
    }
    if (stars <= 0 || stars > 5) {
      errors.push('stars must be between 1 and 5')
    }


    setErrors(errors)
  }, [content, stars])

  const onSubmit = async (e) => {
    e.preventDefault()
    const reviewinfo = { spotId, review: content, stars, userId: user.id };
    console.log('reviewinfo---------------', reviewinfo);
    const reviewdata = await dispatch(createReviews(reviewinfo));
    //console.log('reviewdata--------------------', reviewdata);

    if (reviewdata) {
      history.push(`/spots/${spotId}/`);
      // }
      // const reviewinfo = {content, stars, spotId, userid};
      // dispatch(createReviews(reviewinfo));
      //   setSubmitted(true);
      //   if(!user) throw errors ('Please log in as a user');


    };
  }
  if (existingreview.length) {
    return (
      <div className='review_error'>Sorry, you have already made a review for this spot</div>
    )

  }
  return (
    <div className='createreview_container'>
      <form onSubmit={onSubmit} className='createreview_form'>
        <div className='reviewform_title'>
        Create A review
        </div>

          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}


      <br></br>

        <div className='reviewform_rows'>


            <lable>
            <textarea
              type="text"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="review content"
              rows='5'
              cols='25'
              wrap='hard'
              className='review_content_div'
            />
            </lable>


            <div className='review_star_num'>
            <input
              type="Integer"
              name="stars"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              placeholder='star numbers'
            />
            </div>




          <button
            type="submit"
            //disabled ={errors.length>0 || (!user) || (existingreview)}
            disabled={errors.length > 0 || (!user) || (existingreview.length >= 1)}
            className='createreview_btn'>
            Create a Review
          </button>



       </div>

      </form>
     </div>
  );




}

export default ReviewCreate;
