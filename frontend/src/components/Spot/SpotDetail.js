import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import React from 'react';
import { NavLink } from 'react-router-dom';
// import ReviewSpot from '../Review/ReviewSpot';
import { getSpotsReviews } from '../../store/reviews';
import { getSpotsImages } from '../../store/images';
import './SpotDetailCss.css'
import { createReviews } from "../../store/reviews";

const SpotDetail = () => {
  const { spotId } = useParams();
  const spoty = useSelector((state) => state.spot[spotId]);
  console.log('spoty------', spoty);
  console.log('spotyimage----', spoty?.image)
  // const spoty = spotdata.oneSpot;
  console.log('spoty------------', spoty);
  //console.log('spotyimage-----', spoty.images);
  // const spotImagesArr= spoty?.images

  //  const AllImages = [];
  //  for(let item of spotImagesArr){
  //    AllImages.push(item);
  //  }


  // console.log('spotImagesArr----', spotImagesArr)
  // console.log('AllImages');
  // const spotArr = Object.values(spotObj)

  const sessionUser = useSelector(state => state.session.user);
  const reviewObj = useSelector((state) => state.review)
  const reviewArr = Object.values(reviewObj);
  const existingreview = reviewArr.filter(review => review.userId === sessionUser.id)
  const userReview = useSelector(state =>state.session.user?.id);
  const spotOwner = useSelector(state =>state.spot[spotId]?.ownerId);

  console.log('reviewArr---------', reviewArr)
  console.log('sessionUser-----', sessionUser)

  // const imageObj = useSelector((state) => {
  //   console.log('state image -------', state.image)
  //   return state.image});
  // const imageArr = Object.values(imageObj);
  // console.log('imageObj------', imageObj);
  // console.log('Image Arr---------', imageArr);
 console.log('userReview------------', userReview);
 console.log('spotOwner--------------', spotOwner);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getSpotsReviews(spotId))
    // dispatch( getSpotsImages(spotId))

  }, [dispatch, spotId]);




  if (!spoty) {
    return null;
  }
  //  const AllImages = [];
  // for(let item of spotImagesArr){
  //   AllImages.push(item);
  // }
  return (
    <div className='spotdetailoutermost_div'>
      <div className='sdcontainer_div'>
        <div className='sdheader_div'>

          <div className='sdheadname'><h2>{spoty.name}</h2></div>

          <div className='sdsubheader_div'>
            <div><i className="fas fa-solid fa-star"></i>{spoty.avgRating ? Number.parseFloat(spoty.avgRating).toFixed(2) : 0}</div>
            <div>&nbsp; &nbsp; </div><span>??</span><div>&nbsp; &nbsp; </div>
            <div>{reviewArr.length} reviews</div>
            <div>&nbsp; &nbsp; &nbsp; &nbsp;</div>
            <div>{spoty.address}, {spoty.city},{spoty.state},{spoty.country}</div>
          </div>

        </div>

        <div className='sdimages_div' >

          {/* {spoty?.images?.map((image, index) => {

            return (
              <div id={`image${index}`} key={index} className='oneimage_div'>
                <img src={image.url} id={`image${index}`} className='spotdetailimage' alt='image' />
              </div>


            )
          })} */}

            <div     className='sdimgleft_div'>
              <img  className='image0' src={spoty?.imageurl} alt='image'  />
            </div>
            <div className='sdimgright_div'>


              <img className='image1'  src={spoty?.imageurl} alt='image'   />


              <img  className='image2' src={spoty?.imageurl} alt='image'  />

            </div>

            <div className='sdimgright_div'>

                <img className='image3'  src={spoty?.imageurl} alt='image' />


                <img className='image4' src={spoty?.imageurl} alt='image'  />


            </div>

        </div>



        <div className='sdhost_div'>
          <div>Spot hosted by {spoty?.owners?.firstName}  </div>
          <div >
            {(sessionUser && Object.values(sessionUser).length > 0 && spotOwner !== userReview && !existingreview.length ) && <button className='addreview_btn'><NavLink className='addreview_btnlink' to={`/spots/${spotId}/reviews`}>Leave a Review</NavLink></button>}
          </div>
        </div>


        <div className='description_div'>
          <div>{spoty?.description}</div>
        </div>


        <div className='sdreview_div'>
          <div><i className="fas fa-solid fa-star">&nbsp; </i>{spoty.avgRating ? Number.parseFloat(spoty.avgRating).toFixed(2) : 0}</div>

          <div>&nbsp; &nbsp; </div><span>??</span><div>&nbsp; &nbsp; </div>
          <div>{reviewArr.length} reviews</div>
        </div>

        <div className='sdreviewsub_div'>

            {reviewArr.map((review) => (

              <div className='onereview' key={review.id}>

                <div className='reviewuser'>
                  <div className='reviewer'>
                    <i className="fas fa-solid fa-user"></i>
                  </div>
                  <div className='reviewername'>
                    <p className='subreviewername'>{review.User?.firstName}</p>
                    <p className='reviewtime'>{review.createdAt.slice(0, 10)}</p>
                  </div>
                </div>

                <div className='reviewcontent'>
                {review.stars} <i className="fas fa-solid fa-star"></i> &nbsp;{review.review}
                </div>

              </div>


            ))}


        </div>




      </div>

    </div >



  );

}

export default SpotDetail;
