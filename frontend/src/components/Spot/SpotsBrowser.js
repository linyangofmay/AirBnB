import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import {fetchSpots} from '../../store/spots';
import './SpotsBrowserCss.css'


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

  return (

     <div className='maindiv'>

        {spotsArr.map((spot) => (
          <div className='spotdiv'>
            <NavLink to={`/spots/${spot.id}`} key={spot.id}>

              <div>
                <img src={`${spot?.imageurl}`} className="imageclass" />
                {/* <div>{spot.name}</div> */}
              </div>

              <div className='infoclass'>
                <div>{spot.city} {spot.state}</div>
                <div>{'⭐️'}{spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}</div>
              </div>

              <div className='pricediv'>{spot.price}/night</div>
            </NavLink>

          </div>
      ))}


      </div>

    );

}

export default SpotsBrowser;
