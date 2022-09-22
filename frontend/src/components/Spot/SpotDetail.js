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

const SpotDetail = () => {
  const { spotId } = useParams();
  const spoty = useSelector((state) => state.spot[spotId]);

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
  console.log('reviewArr---------', reviewArr)
  console.log('sessionUser-----', sessionUser)

  // const imageObj = useSelector((state) => {
  //   console.log('state image -------', state.image)
  //   return state.image});
  // const imageArr = Object.values(imageObj);
  // console.log('imageObj------', imageObj);
  // console.log('Image Arr---------', imageArr);



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
    <div className='outermost_div'>
      <div className='container_div'>
        <div className='header_div'>

          <div className='headname'><h2 >{spoty.name}</h2></div>

          <div className='subheader_div'>
            <div><i className="fas fa-solid fa-star"></i>{spoty.avgRating ? Number.parseFloat(spoty.avgRating).toFixed(2) : 0}</div>
            <div>&nbsp; &nbsp; &nbsp; &nbsp;</div>
            <div>{reviewArr.length} reviews</div>
            <div>&nbsp; &nbsp; &nbsp; &nbsp;</div>
            <div>{spoty.address}, {spoty.city},{spoty.state},{spoty.country}</div>
          </div>

        </div>

        <div className='images_div' >

          {/* {spoty?.images?.map((image, index) => {

            return (
              // <div id={`image${index}`} key={index} className='oneimage_div'>
              //   <img src={image.url} id={`image${index}`} className='spotdetailimage' alt='image' />
              // </div>


            )
          })} */}
          <div className='oneimage_div'>
            <div><img src={spoty.imageurl} alt='image' className='spotdetailimage' /></div>
          </div>
        </div>

        <div className='host_div'>
          <div>Spot hosted by {spoty?.owners?.firstName}  </div>
          <div >
            {(sessionUser && Object.values(sessionUser).length > 0) && <button className='addreview_btn'><NavLink className='addreview_btn' to={`/spots/${spotId}/reviews`}>Leave a Review</NavLink></button>}
          </div>
        </div>


        <div className='description_div'>
          <div>{spoty.description}</div>
        </div>

        <div className='review_div'>
          <div><i className="fas fa-solid fa-star">&nbsp; </i>{spoty.avgRating ? Number.parseFloat(spoty.avgRating).toFixed(2) : 0}</div>
          <div>&nbsp; &nbsp; &nbsp; &nbsp;</div>
          <div>{reviewArr.length} reviews</div>
        </div>
        <div className='reviewsub_div'>
          <div>
            {reviewArr.map((review) => (

              <div>{review.stars} <i className="fas fa-solid fa-star"></i> &nbsp;{review.review}

              </div>


            ))}

          </div>
        </div>


        {/* <div className='sdbtndiv'>
          {(sessionUser && Object.values(sessionUser).length > 0) && <button><NavLink to={`/spots/${spotId}/reviews`}>Leave a Review</NavLink></button>}
         </div> */}


      </div>
    </div >



  );

}

export default SpotDetail;
