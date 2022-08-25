

// import { escapeRegExp } from 'lodash';
import { csrfFetch } from './csrf';

const LOAD = 'spots/LOAD'; //get all spots
const LOAD_SPOTCURRENT = 'spots/LOAD_SPOTCURRENT';
const LOAD_SPOT_ID = 'spots/LOADSPOTID';
const CREATEONE = 'spots/CREATEONE';
const UPDATE = 'spots/UPDATE';
const DELETESPOT = 'spots/DELETESPOT';

//actions
const load = list => ({

  type: LOAD,
  list
});


const loadspotcurrent = spots => ({
  type: LOAD_SPOTCURRENT,
  spots
})


const loadsportbyid = spot => ({
  type: LOAD_SPOT_ID,
  spot
})


const addone = spot => ({
  type: CREATEONE,
  spot
})

const update = spot => ({
  type: UPDATE,
  spot
})

const deleteone = spotId => ({
  type: DELETESPOT,
  spotId
})


//thunk

export const fetchSpots = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots`);
  const data = await res.json();
  // console.log('the response--------', res )
  console.log('data =------------------', data)
  console.log('data.Spots--------------', data.Spots)
  if (res.ok) {

    dispatch(load(data.Spots));
  }
};


//get spot by current
export const getspotcurrent = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/current`);
  const spots = await res.json();
  if (res.ok) {
    dispatch(loadspotcurrent(spots.Spots))
  }
}

//get spot details by spot ID
export const getOneSpot = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  const data = await res.json();
  console.log('data--------------------', data)
  if (res.ok) {

    dispatch(loadsportbyid(data));
    // return data.Spots
  }
}

//addOne
export const createOneSpot = data => async dispatch => {
  try {
    const res = await csrfFetch(`/api/spots`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      let error;
      if (res.status === 422) {
        error = await res.json();
        throw new error(error.errors, res.statusText);
      }
      else {
        let errorJSON;
        error = await res.text();
        try {
          errorJSON = JSON.parse(error);
        }
        catch {
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }
    const newspot = await res.json()
    dispatch(addone(newspot));
    return newspot

  }
  catch (error) {
    throw error;
  }
};

//update

export const updatespot = (spotId,spot) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spot),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(update(data));
    return data;

  }
};

//deleteone
export const removespot = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'delete',
  });
  if (res.ok) {
    dispatch(deleteone(spotId));
  }
}

//reducer
const initialState = {}

const spotReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOAD:
      const newState = {};
      action.list.forEach(spot => {
        newState[spot.id] = spot;
      });

      return newState;//{
    //     ...allspots,
    //     ...state,

    // }

    case LOAD_SPOTCURRENT:
      const ownerSpot = {};
      action.spots.forEach(spot => {
        ownerSpot[spot.id] = spot
      })
      return ownerSpot;


    case LOAD_SPOT_ID:
      const oneSpot = { ...action.spot }
      return {
        ...state,
        oneSpot
      }

    case CREATEONE:
      // let newone = {};
      // newone = { ...state };
      // newone[action.spot.id] = action.spot
      // return newone
      return {
        ...state,
        [action.spot.id]:{
        ...state[action.spot.id], ...action.spot

      }}




    case UPDATE:
      let updateState = { ...state };
      updateState[action.spot.id] = action.spot
      return updateState







    case DELETESPOT:
      let deleteState = { ...state }
      delete deleteState[action.spotId];
      return deleteState;

    default:
      return state;
  }
}

export default spotReducer;
