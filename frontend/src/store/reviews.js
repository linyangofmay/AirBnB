import { csrfFetch } from './csrf';
//type
const LOAD_SPOTS_REVIEWS = 'reviews/LOAD_SPOTS_REVIEWS';
const LOAD_CURRENT_REVIEWS = 'reviews/LOAD_CURRENT_REVIEWS';
const CREATEREVIEWS = 'reviews/CREATEREVIEWS';
const DELETEREVIEWS = 'reviews/DELETEVIEWS';
//action
const loadspotsreviews = (reviews) =>({
  type: LOAD_SPOTS_REVIEWS,
  reviews
})

const loadcurrentreviews= (reviews) =>({
  type: LOAD_CURRENT_REVIEWS,
  reviews
})

const createareviews = (reviews) =>({
  type: CREATEREVIEWS,
  reviews
})

const deletereviews =reviewId =>({
  type: DELETEREVIEWS,
  reviewId
})



//thunk
export const getSpotsReviews = (spotId) => async(dispatch) =>{
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
console.log('res----------', res)
  const reviews = await res.json()
   console.log('reviews------------', reviews)
  if(res.ok){
    dispatch(loadspotsreviews(reviews))
  }
}

export const getCurrReview = () => async (dispatch) =>{
  const res = await csrfFetch( `/api/reviews/current`)
  if(res.ok){
    const reviews = await res.json()
    console.log('reviews------------', reviews)
    dispatch(loadcurrentreviews(reviews.Reviews))
  }
}

export const createReviews = data => async(dispatch)=>{
  console.log('debugggggg---------------/:spotId/reviews',data.spotId);
 const res = await csrfFetch(`/api/spots/${data.spotId}/reviews`, {
  method:'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify(data),
 });
  if (res.ok){
    const review = await res.json()
    console.log('review-----------', review);
    dispatch(createareviews(review))
    return review
  }

};

export const deleteReviews = (reviewId) =>async dispatch =>{
  const res= await csrfFetch(`/api/reviews/${reviewId}`, {
    method:'DELETE',
  });
  //console.log('res------------', res)
  //console.log('reviewId-----------', reviewId)
  if(res.ok){
    const data = await res.json();
    console.log('data--------------', data);
    dispatch(deletereviews(reviewId));
  }
};


//reducer
 const initialState = {};

 const reviewReducer =(state = initialState, action) =>{

 switch(action.type){

    case LOAD_SPOTS_REVIEWS:
      const newState ={};
      console.log('action.reviews-------',action.reviews)
      action.reviews.forEach(review => {
        newState[review.id] =review
      })
      return newState;

    case LOAD_CURRENT_REVIEWS:
       const reviewdata = {}
       action.reviews.forEach(review =>{
        reviewdata[review.id] = review
       })
       console.log('reviewdata-------------', reviewdata)
       return reviewdata

     case CREATEREVIEWS:
      console.log('review.actions-------------', action.reviews)
      //  return{
      //   ...state,
      //   [action.reviews.id]:{
      //     ...state[action.reviews.id], ...action.reviews

      //   }}

      const newStater = {...state}
      newStater[action.reviews.id] =action.reviews
      return newStater


     case DELETEREVIEWS:
      let deleteState = {...state}
      delete deleteState[action.reviewId];
      return deleteState;



    default:
    return state;
 }

 };


export default reviewReducer;
