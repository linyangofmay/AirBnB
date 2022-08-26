import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import {fetchSpots} from '../../store/spots';


const SpotsBrowser = () =>{
  const dispatch = useDispatch()

  // const spots = useSelector(state=> {
  //   return state.spots.list.map(spotsId => state.spots[spotsId]);
  // });
  const spotsObj = useSelector(state => state.spot)

  const spotsArr = Object.values(spotsObj)
  console.log('sportsArr---------', spotsArr)

  const [isLoaded, setIsLoaded]= useState(false);


  // useEffect(()=>{
  //   const dispatchHelper = () =>{
  //     dispatch(fetchSpots());
  //   };
  //   dispatchHelper().then(setIsLoaded(true));
  //  }, [dispatch]);

   useEffect(()=>{

    dispatch(fetchSpots()).then(setIsLoaded(true));
   }, [dispatch]);

  return isLoaded && (
    <main >

      <ul>
        {spotsArr.map((spot) => (

          <NavLink to={`/spots/${spot.id}`} key={spot.id}>
          <div><img src={`${spot?.imageurl}`}></img></div>
          <div>{spot.name}</div>
          <div>{spot.city} {spot.state}</div>
          <div>{spot.price}/night</div>
          <div>{'⭐️'}{spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2):0}</div>
          </NavLink>


      ))}

      </ul>
      </main>
    );

}

export default SpotsBrowser;
