import { NavLink, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  getspotcurrent , removespot} from "../../store/spots";

import React from 'react';

const SpotCurrent =()=>{
  const dispatch =useDispatch();
  const spotsObj = useSelector(state => state.spot)

  const spotsArr = Object.values(spotsObj)
  console.log('spotsArr----------------', spotsArr);

  useEffect(()=>{
    dispatch(getspotcurrent())
  }, [dispatch]);
  if (spotsArr.length === 0){
    return null;
  }
  return (
    <main>

      <ul>
        {spotsArr.map((spot) => (
        <div key={spot.id}>
          <img src={spot.imageurl}/>
          <div>{spot.name}</div>
          <div>{spot.city} {spot.state}</div>
          <div>{spot.description}</div>
          <div>{spot.price}</div>
          <div>{'⭐️'}{spot.avgRating}</div>
          <NavLink to={`/spots/${spot.id}/edit`}>Edit</NavLink>
          <div></div>
          <button onClick={()=> dispatch(removespot(spot.id))}>DELETE</button>
          <div></div>

          <NavLink to={`/spots/${spot.id}/new`}>Create</NavLink>
        </div>

      ))}

      </ul>
      </main>
  )
}






export default SpotCurrent;
