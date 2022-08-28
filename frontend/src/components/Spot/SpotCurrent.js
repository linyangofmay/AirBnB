import { NavLink, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  getspotcurrent , removespot, updatespot} from "../../store/spots";
import React from 'react';
import './SpotCurrentCss.css'

const SpotCurrent =()=>{
  const dispatch =useDispatch();
  const spotsObj = useSelector(state => state.spot)

  const spotsArr = Object.values(spotsObj)
  //console.log('spotsArr----------------', spotsArr);

  useEffect(()=>{
    dispatch(getspotcurrent())
  }, [dispatch]);
  // if (spotsArr.length === 0){
  //   return null;
  // }
  return (
    <div>
      <h2 className='msh2'> My Spots</h2>

      <ul>
      <NavLink to={`/spots/current/new`}><button className='createspotbtn'>Create A New Spot</button> </NavLink>
        {spotsArr.map((spot) => (
        <div key={spot.id}>
          <img src={spot.imageurl} className='scimg'/>
          <div>{spot.name}</div>
          <div>{spot.city} {spot.state}</div>
          <div>{spot.description}</div>
          <div>{spot.price}</div>
          <div>{'⭐️'}{spot.avgRating}</div>
          <p></p>

          <NavLink to={`/spots/${spot.id}/edit`}><button className='scbtn'>EDIT</button></NavLink>
          <p></p>
          <button className='scbtn' onClick={()=> dispatch(removespot(spot.id))}>DELETE</button>




        </div>

      ))}

      </ul>
      </div>

  )
}






export default SpotCurrent;
