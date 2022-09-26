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
  //const spotone = spots.oneSpot;
  const reviewObj = useSelector(state => state.review);
  //console.log('reviewObj-------------', reviewObj)
  const reviewArr = Object.values(reviewObj);

  // console.log('spots--------------', spots)
  // console.log('spotone ------------', spotone)

  const user = useSelector(state => state.session.user);

  // console.log('user--------------' ,user)


  //console.log('reviewArr--------------', reviewArr[1]);
  //console.log('reviewArr[1]----------', reviewArr[1].userId);
  //console.log('user.id-------', user.id)
  const existingreview = reviewArr.filter(review => review.userId === user.id)
  console.log('existingreview----------', existingreview);

  const onSubmit = async (e) => {

    e.preventDefault()

   setErrors([]);
   if(!content){
    return setErrors(['review content is required'])
   }


  //  if (existingreview.length){
  //   error.errors.existing ='Sorry, you have already made a review for this spot';
  //  }

    const reviewinfo = { spotId, review: content, stars, userId: user.id };
    //console.log('reviewinfo---------------', reviewinfo);
    //const reviewdata = await dispatch(createReviews(reviewinfo));
    //console.log('reviewdata--------------------', reviewdata);


    const reviewdata = await dispatch(createReviews(reviewinfo)).catch(async(res)=>{
      const data = await res.json()
      console.log('review error data----', data);
      if (data && data.errors) setErrors(data.errors)
      }


    );

    if (reviewdata){
      history.push(`/spots/${spotId}`);
    }

   }
  //  if (existingreview.length) {
  //   return (<div className='review_error'>Sorry, you have already made a review for this spot.</div>)
  // }

  return (
    <div className='reviewcreateoutermost'>
    <div className='createreview_container'>
      <form onSubmit={onSubmit} className='createreview_form'>
        <div className='reviewform_title'>
        Create A review
        </div>

          <div>
          { Object.values(errors).map((error,idx) => (
            <div key={idx} className='review_error'>{error}</div>
          ))}
          </div>


      <br></br>

        <div className='reviewform_rows'>


            <input
              type="number"
              name="stars"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              placeholder='0'
              min='1'
              max='5'
              className='review_star_num'
            />
            <span>{" "}</span>
            <lable>
            <i className="fas fa-solid fa-star"></i>
            </lable>

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
              className='reviewcontent_div'


              required

            />
            </lable>


          <button
            type="submit"
            //disabled ={errors.length>0 || (!user) || (existingreview.length>=1)}
            disabled={errors.length > 0 }
            className='createreview_btn'>
            Create a Review
          </button>



       </div>

      </form>
     </div>
     </div>
  );



}

export default ReviewCreate;
