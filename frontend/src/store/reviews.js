import { csrfFetch } from './csrf';
//type
const LOAD_SPOTS_REVIEWS = 'reviews/LOAD_SPOTS_REVIEWS';
const LOAD_CURRENT_REVIEWS= 'reviews/LOAD_CURRENT_REVIEWS';

//action
const loadspotsreviews = (reviews) =>({
  type: LOAD_SPOTS_REVIEWS,
  reviews
})

const loadcurrentreviews= (reviews) =>({
  type: LOAD_CURRENT_REVIEWS,
  reviews
})

//thunk
export const getSpotsReviews = (spotId) => async(dispatch) =>{
  const res = await csrfFetch(`/spi/spots/${spotId}/reviews`)
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

    dispatch(loadcurrentreviews(reviews.Reviews))
  }
}

//reducer
 const initialState = {};

 const reviewReducer =(state = initialState, action) =>{

 switch(action.type){

    case LOAD_SPOTS_REVIEWS:
      const newState ={};
      action.reviews.forEach(review => {
        newState[review.id] =review
      })
      return newState;
















    default:
    return state;
 }

 };


export default reviewReducer;
