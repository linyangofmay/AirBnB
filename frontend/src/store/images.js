import { csrfFetch } from './csrf';

//type:
const LOAD = 'images/LOAD_SPOTS_IMAGES';

//action
const loadspotsimages= (images) =>({
  type: LOAD,
  images
})

//thunk
export const getSpotsImages =(spotId)=>async(dispatch)=>{
  const res= await csrfFetch(`/api/spots/${spotId}/images`)
  console.log('res-----', res);
  if (res.ok){
    const data = await res.json();
    dispatch(loadspotsimages(data.images));
    return res;
  }
}

//reducer
const initialState={};
const imageReducer = (state= initialState, action)=>{
  let newState ={};
  switch(action.type){
    case LOAD:
      action.images.forEach(image =>{
        newState[image.id]= image;
      });
      return newState;

    default:
      return state;

  }
}
export default imageReducer;
